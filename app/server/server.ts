import bodyParser from "body-parser";
import { matchesUA } from "browserslist-useragent";
import express from "express";
import helmet from "helmet";
import fetch from "node-fetch";
import Raven from "raven";
import { renderToString } from "react-dom/server";
import { parse } from "url";
import { ServerUser } from "../client/components/user";
import { Globals } from "../globals";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import {
  hasProductPageProperties,
  hasProductPageRedirect,
  ProductType,
  ProductTypes
} from "../shared/productTypes";
import { conf, Environments } from "./config";
import { renderStylesToString } from "./emotion-server";
import html from "./html";
import {
  getCookiesOrEmptyString,
  withIdentity
} from "./identity/identityMiddleware";
import { log } from "./log";

const port = 9233;

const server = express();

declare var WEBPACK_BUILD: string;
if (conf.SERVER_DSN) {
  Raven.config(conf.SERVER_DSN, {
    release: WEBPACK_BUILD || "local",
    environment: conf.DOMAIN
  }).install();
  // server.use(Raven.requestHandler()); // IMPORTANT: If we do this we get cookies, headers etc (i.e. PI)
}

if (conf.DOMAIN === "thegulocal.com") {
  // tslint:disable-next-line:no-object-mutation
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const clientDSN =
  conf.ENVIRONMENT === Environments.PRODUCTION && conf.CLIENT_DSN
    ? conf.CLIENT_DSN
    : null;
if (conf.ENVIRONMENT === Environments.PRODUCTION && !conf.CLIENT_DSN) {
  log.error("NO SENTRY IN CLIENT PROD!");
}

const globals: Globals = {
  domain: conf.DOMAIN,
  dsn: clientDSN,
  supportedBrowser: true
};

server.use(helmet());

server.use("/static", express.static(__dirname + "/static"));

server.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // this header is VERY IMPORTANT and prevents caching (on both CDN and in browsers)
    res.header(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate, max-age=0"
    );
    res.header("Access-Control-Allow-Origin", "*." + conf.DOMAIN);
    next();
  }
);

server.get(
  "/_healthcheck",
  withIdentity(200), // healthcheck needs identity redirect service to be accessible (returns 200 if redirect required)
  (req: express.Request, res: express.Response) => {
    res.send("OK - signed in");
  }
);

declare var GIT_COMMIT_HASH: string;
server.get("/_prout", (req: express.Request, res: express.Response) => {
  res.send(`<pre>${GIT_COMMIT_HASH}</pre>`);
});

server.use(bodyParser.raw({ type: "*/*" })); // parses all bodys to a raw 'Buffer'
server.use("/api/", withIdentity(401));

type JsonHandler = (res: express.Response, jsonString: string) => void;

const apiHandler = (jsonHandler: JsonHandler) => (
  basePath: string,
  ...headersToForward: string[]
) => (
  path: string,
  forwardQueryArgs?: boolean,
  ...pathParamNamesToReplace: string[]
) => (req: express.Request, res: express.Response) => {
  const parameterisedPath = pathParamNamesToReplace
    .reduce(
      (evolvingPath: string, pathParamName: string) =>
        evolvingPath.replace(
          ":" + pathParamName,
          req.params[pathParamName] || ""
        ),
      path
    )
    .replace(/\/$/, ""); // strips any trailing slashes

  const queryString =
    forwardQueryArgs && req.query && Object.keys(req.query).length > 0
      ? `?${parse(req.url).query}`
      : "";

  fetch(`${basePath}/${parameterisedPath}${queryString}`, {
    method: req.method,
    body: Buffer.isBuffer(req.body) ? req.body : undefined,
    headers: {
      "Content-Type": "application/json",
      Cookie: getCookiesOrEmptyString(req)
    }
  })
    .then(intermediateResponse => {
      res.status(intermediateResponse.status);
      headersToForward.forEach((headerName: string) =>
        res.header(
          headerName,
          intermediateResponse.headers.get(headerName) || undefined
        )
      );
      return intermediateResponse.text();
    })
    .then(_ => jsonHandler(res, _))
    .catch(e => {
      log.info(e);
      res.status(500).send("Something broke!");
    });
};

const proxyApiHandler = apiHandler((res, jsonString) => res.send(jsonString));

const membersDataApiHandler = proxyApiHandler(
  "https://members-data-api." + conf.DOMAIN,
  MDA_TEST_USER_HEADER
);
const sfCasesApiHandler = proxyApiHandler(conf.SF_CASES_URL);

server.get("/api/me", membersDataApiHandler("user-attributes/me"));

server.get(
  "/api/me/mma/:subscriptionName?",
  membersDataApiHandler(
    "user-attributes/me/mma/:subscriptionName",
    true,
    "subscriptionName"
  )
);

server.post(
  "/api/cancel/:subscriptionName?",
  membersDataApiHandler(
    "/user-attributes/me/cancel/:subscriptionName",
    false,
    "subscriptionName"
  )
);

server.post(
  "/api/payment/card/:subscriptionName?",
  membersDataApiHandler(
    "/user-attributes/me/update-card/:subscriptionName",
    false,
    "subscriptionName"
  )
);
server.post(
  "/api/payment/dd/:subscriptionName?",
  membersDataApiHandler(
    "/user-attributes/me/update-direct-debit/:subscriptionName",
    false,
    "subscriptionName"
  )
);

server.post(
  "/api/validate/payment/dd",
  proxyApiHandler("https://payment." + conf.API_DOMAIN)(
    "direct-debit/check-account",
    true
  )
);

Object.values(ProductTypes).forEach((productType: ProductType) => {
  server.use(
    "/banner/" + productType.urlPart,
    (req: express.Request, res: express.Response) => {
      res.redirect("/payment/" + productType.urlPart + "?INTCMP=BANNER");
    }
  );

  if (
    hasProductPageProperties(productType) &&
    productType.productPage.updateAmountMdaEndpoint
  ) {
    server.post(
      "/api/update/amount/" + productType.urlPart + "/:subscriptionName",
      membersDataApiHandler(
        "user-attributes/me/" +
          productType.productPage.updateAmountMdaEndpoint +
          "/:subscriptionName",
        false,
        "subscriptionName"
      )
    );
  }
  if (productType.productPage && hasProductPageRedirect(productType)) {
    server.get(
      "/" + productType.urlPart,
      (req: express.Request, res: express.Response) => {
        res.redirect("/" + productType.productPage);
      }
    );
  }
});

server.post("/api/case", sfCasesApiHandler("case"));

server.patch(
  "/api/case/:caseId",
  sfCasesApiHandler("case/:caseId", false, "caseId")
);

const profileRedirectHandler: JsonHandler = (
  res: express.Response,
  meJsonString: string
) => {
  const userId = JSON.parse(meJsonString).userId;
  res.redirect(`https://profile.${conf.DOMAIN}/user/id/${userId}`);
};

server.get(
  "/profile/user",
  withIdentity(),
  apiHandler(profileRedirectHandler)("https://members-data-api." + conf.DOMAIN)(
    "user-attributes/me"
  )
);

// ALL OTHER ENDPOINTS CAN BE HANDLED BY CLIENT SIDE REACT ROUTING
server.use(withIdentity(), (req: express.Request, res: express.Response) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderStylesToString(renderToString(ServerUser(req.url)));
  const title = "My Account | The Guardian";
  const src = "/static/user.js";
  const supportedBrowser = matchesUA(req.headers["user-agent"], {
    env:
      conf.ENVIRONMENT === Environments.PRODUCTION
        ? "production"
        : "development",
    allowHigherVersions: true
  });

  // Object.assign(globals, { supportedBrowser });

  if (!supportedBrowser) {
    log.warn(`Unsupported Browser. UA: ${req.headers["user-agent"]}`);

    Raven.captureMessage("Unsupported Browser", {
      extra: { "User-Agent": req.headers["user-agent"] }
    });
  }

  res.send(
    html({
      body,
      title,
      src,
      globals
    })
  );
});

if (conf.SERVER_DSN) {
  server.use(Raven.errorHandler());
}
server.listen(port);
log.info(`Serving at http://localhost:${port}`);

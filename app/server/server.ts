import bodyParser from "body-parser";
import { matchesUA } from "browserslist-useragent";
import express from "express";
import helmet from "helmet";
import fetch from "node-fetch";
import Raven from "raven";
import { renderToString } from "react-dom/server";
import { ServerUser } from "../client/components/user";
import { Globals } from "../globals";
import { conf, Environments } from "./config";
import { renderStylesToString } from "./emotion-server";
import html from "./html";
import { IdentityUser } from "./identity/identity";
import { withIdentity } from "./identity/identityMiddleware";
import { log } from "./log";

const port = 9233;

const server = express();

declare var WEBPACK_BUILD: string; //FIXME not working for some reason
if (conf.SERVER_DSN) {
  Raven.config(conf.SERVER_DSN, {
    release: WEBPACK_BUILD || "local",
    environment: conf.DOMAIN
  }).install();
  // server.use(Raven.requestHandler()); // IMPORTANT: If we do this we get cookies, headers etc (i.e. PI)
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

server.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Cache-Control", "private");
    res.header("Access-Control-Allow-Origin", "*." + conf.DOMAIN);
    next();
  }
);

server.use(helmet());

server.get("/_healthcheck", (req: express.Request, res: express.Response) => {
  res.send("OK");
});

// server.use(bodyParser.json());
server.use(bodyParser.raw({ type: "*/*" })); // parses all bodys to a raw 'Buffer'
server.use("/api/membership", withIdentity);
server.use("/", withIdentity);

server.use("/static", express.static(__dirname + "/static"));

type JsonHandler = (res: express.Response, jsonString: string) => void;

const apiHandler = (jsonHandler: JsonHandler) => (basePath: string) => (
  path: string,
  pathParamNamesToReplace: string[] = []
) => (req: express.Request, res: express.Response) => {
  if (res.locals.identity == null) {
    // Check if the identity middleware is loaded for this route.
    // Refactor this.
    log.error("Identity not present in locals.");
    res.status(500).send("Something broke!");
    return;
  }

  const identity: IdentityUser = res.locals.identity;

  const paramaterisedPath = pathParamNamesToReplace.reduce(
    (evolvingPath: string, pathParamName: string) =>
      evolvingPath.replace(":" + pathParamName, req.params[pathParamName]),
    path
  );

  fetch(`${basePath}/${paramaterisedPath}`, {
    method: req.method,
    body: Buffer.isBuffer(req.body) ? req.body : undefined,
    headers: {
      "Content-Type": "application/json",
      Cookie: `GU_U=${identity.GU_U}; SC_GU_U=${identity.SC_GU_U}`
    }
  })
    .then(_ => {
      res.status(_.status);
      return _.text();
    })
    .then(_ => jsonHandler(res, _))
    .catch(e => {
      log.info(e);
      res.status(500).send("Something broke!");
    });
};

const proxyApiHandler = apiHandler((res, jsonString) => res.send(jsonString));

const membersDataApiHandler = proxyApiHandler(
  "https://members-data-api." + conf.DOMAIN
);
const sfCasesApiHandler = proxyApiHandler(conf.SF_CASES_URL);

server.get(
  "/api/me",
  membersDataApiHandler("user-attributes/me"),
  withIdentity
);

server.get(
  "/api/me/membership",
  membersDataApiHandler("user-attributes/me/mma-membership"),
  withIdentity
);

server.post(
  "/api/cancel/membership",
  membersDataApiHandler("user-attributes/me/cancel-membership"),
  withIdentity
);

server.post("/api/case", sfCasesApiHandler("case"), withIdentity);

server.patch(
  "/api/case/:caseId",
  sfCasesApiHandler("case/:caseId", ["caseId"]),
  withIdentity
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
  apiHandler(profileRedirectHandler)("https://members-data-api." + conf.DOMAIN)(
    "user-attributes/me"
  ),
  withIdentity
);

// ALL OTHER ENDPOINTS CAN BE HANDLED BY CLIENT SIDE REACT ROUTING
server.use((req: express.Request, res: express.Response) => {
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
        : "development"
  });

  Object.assign(globals, { supportedBrowser });

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
}, withIdentity);

if (conf.SERVER_DSN) {
  server.use(Raven.errorHandler());
}
server.listen(port);
log.info(`Serving at http://localhost:${port}`);

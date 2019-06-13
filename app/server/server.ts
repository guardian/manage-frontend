import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import Raven from "raven";
import {
  hasProductPageRedirect,
  ProductType,
  ProductTypes
} from "../shared/productTypes";
import { conf } from "./config";
import { log } from "./log";
import { membersDataApiHandler } from "./middleware/apiMiddleware";
import * as routes from "./routes";

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

server.use(bodyParser.raw({ type: "*/*" })); // parses all bodys to a raw 'Buffer'

server.use(routes.core);
server.use("/api/", routes.api);
server.use("/profile/", routes.profile);

Object.values(ProductTypes).forEach((productType: ProductType) => {
  server.use(
    "/banner/" + productType.urlPart,
    (req: express.Request, res: express.Response) => {
      res.redirect("/payment/" + productType.urlPart + "?INTCMP=BANNER");
    }
  );

  if (productType.updateAmountMdaEndpoint) {
    server.post(
      "/api/update/amount/" + productType.urlPart + "/:subscriptionName",
      membersDataApiHandler(
        "user-attributes/me/" +
          productType.updateAmountMdaEndpoint +
          "/:subscriptionName",
        false,
        "subscriptionName"
      )
    );
  }
  if (hasProductPageRedirect(productType)) {
    server.get(
      "/" + productType.urlPart,
      (req: express.Request, res: express.Response) => {
        res.redirect("/" + productType.productPage);
      }
    );
  }
});

// ALL OTHER ENDPOINTS CAN BE HANDLED BY CLIENT SIDE REACT ROUTING
server.use(routes.frontend);

if (conf.SERVER_DSN) {
  server.use(Raven.errorHandler());
}
server.listen(port);
log.info(`Serving at http://localhost:${port}`);

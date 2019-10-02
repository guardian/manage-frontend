import bodyParser from "body-parser";
import { default as express, NextFunction, Response } from "express";
import helmet from "helmet";
import Raven from "raven";
import { conf } from "./config";
import { log } from "./log";
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

server.use((_, res: Response, next: NextFunction) => {
  // this header is VERY IMPORTANT and prevents caching (on both CDN and in browsers)
  res.header(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate, max-age=0"
  );
  res.header("Access-Control-Allow-Origin", "*." + conf.DOMAIN);
  next();
});

server.use(bodyParser.raw({ type: "*/*" })); // parses all bodys to a raw 'Buffer'

server.use(routes.core);
server.use("/profile/", routes.profile);
server.use("/api/", routes.api);
server.use(routes.productsProvider("/api/"));

const isCode = conf.DOMAIN === "code.dev-theguardian.com";
const frameAncestors = isCode
  ? `https://*.${
      conf.DOMAIN
    } http://localhost:9000 http://localhost:3000 http://*.thegulocal.com`
  : `https://*.${conf.DOMAIN}`;

server.use(
  "/consent/",
  (req, res, next) => {
    // This route can be loaded in an iframe from the domains listed below only
    // res.setHeader(
    //   "Content-Security-Policy",
    //   `frame-ancestors ${frameAncestors}`
    // );
    res.removeHeader("Content-Security-Policy");
    res.removeHeader("X-Frame-Options");
    next();
  },
  routes.consent
);

// ALL OTHER ENDPOINTS CAN BE HANDLED BY CLIENT SIDE REACT ROUTING
server.use(routes.frontend);

if (conf.SERVER_DSN) {
  server.use(Raven.errorHandler());
}
server.listen(port);
log.info(`Serving at http://localhost:${port}`);

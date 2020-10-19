import * as Sentry from "@sentry/node";
import bodyParser from "body-parser";
import { default as express, NextFunction, Response } from "express";
import helmet from "helmet";
import { conf } from "./config";
import { log } from "./log";
import * as routes from "./routes";

const port = 9233;

const server = express();

declare var WEBPACK_BUILD: string;
if (conf.SERVER_DSN) {
  Sentry.init({
    dsn: conf.SERVER_DSN,
    release: WEBPACK_BUILD || "local",
    environment: conf.DOMAIN
  });
  server.use(
    Sentry.Handlers.requestHandler({
      ip: false,
      user: false,
      request: ["method", "query_string", "url"] // this list is explicit, to avoid sending cookies
    })
  );
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
server.use("/publicapi/", routes.publicApi);
server.use("/idapi", routes.idapi);
server.use(routes.productsProvider("/api/"));

// ALL OTHER ENDPOINTS CAN BE HANDLED BY CLIENT SIDE REACT ROUTING
server.use(routes.frontend);

if (conf.SERVER_DSN) {
  server.use(Sentry.Handlers.errorHandler());
}
server.listen(port);
log.info(`Serving at http://localhost:${port}`);

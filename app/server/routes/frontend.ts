import { matchesUA } from "browserslist-useragent";
import { Request, Response, Router } from "express";
import Raven from "raven";
import { renderToString } from "react-dom/server";
import { ServerUser } from "../../client/components/user";
import { Globals } from "../../shared/globals";
import { conf, Environments } from "../config";
import html from "../html";
import { log } from "../log";
import { withIdentity } from "../middleware/identityMiddleware";

const router = Router();

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

router.use(withIdentity(), (req: Request, res: Response) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderToString(ServerUser(req.url));
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

export default router;

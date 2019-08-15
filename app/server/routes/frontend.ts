import { Request, Response, Router } from "express";
import { renderToString } from "react-dom/server";
import { ServerUser } from "../../client/components/user";
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

router.use(withIdentity(), (req: Request, res: Response) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderToString(ServerUser(req.url));
  const title = "My Account | The Guardian";
  const src = "/static/user.js";

  res.send(
    html({
      body,
      title,
      src,
      globals: {
        domain: conf.DOMAIN,
        dsn: clientDSN,
        identityDetails: res.locals.identity
      }
    })
  );
});

export default router;

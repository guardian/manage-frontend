import * as Sentry from "@sentry/node";
import { Request, Response, Router } from "express";
import { renderToString } from "react-dom/server";
import { ServerUser } from "../../client/components/user";
import { isInAccountOverviewTest } from "../accountOverviewRelease";
import { conf, Environments } from "../config";
import html from "../html";
import { log } from "../log";
import { withIdentity } from "../middleware/identityMiddleware";
import { recaptchaConfigPromise } from "../stripeSetupIntentConfig";

const router = Router();

const clientDSN =
  conf.ENVIRONMENT === Environments.PRODUCTION && conf.CLIENT_DSN
    ? conf.CLIENT_DSN
    : null;
if (conf.ENVIRONMENT === Environments.PRODUCTION && !conf.CLIENT_DSN) {
  log.error("NO SENTRY IN CLIENT PROD!");
}

const getRecaptchaPublicKey = async () => {
  try {
    const recaptchaConfig = await recaptchaConfigPromise;
    const recaptchaPublicKey = recaptchaConfig?.publicKey;

    if (!recaptchaPublicKey) {
      throw new Error(`recaptcha public key is '${recaptchaPublicKey}'`);
    }

    return recaptchaPublicKey;
  } catch (err) {
    log.error(
      "could not provide recaptcha public key to client, client-side errors will ensue",
      err
    );
    Sentry.captureException(err);
  }
};

router.use(withIdentity(), async (req: Request, res: Response) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderToString(
    ServerUser(req.url, isInAccountOverviewTest(res))
  );
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
        identityDetails: res.locals.identity,
        recaptchaPublicKey: await getRecaptchaPublicKey()
      }
    })
  );
});

export default router;

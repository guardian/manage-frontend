import * as Sentry from "@sentry/node";
import { conf, Environments } from "../config";
import { log } from "../log";
import { recaptchaConfigPromise } from "../recaptchaConfig";

export const clientDSN =
  conf.ENVIRONMENT === Environments.PRODUCTION && conf.CLIENT_DSN
    ? conf.CLIENT_DSN
    : null;
if (conf.ENVIRONMENT === Environments.PRODUCTION && !conf.CLIENT_DSN) {
  log.error("NO SENTRY IN CLIENT PROD!");
}

export const getRecaptchaPublicKey = async () => {
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

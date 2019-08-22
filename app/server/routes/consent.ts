import { Response, Router } from "express";
import { renderToString } from "react-dom/server";
import { App } from "../../client/components/consent/App";
import { conf, Environments } from "../config";
import html from "../consent/html";
import { log } from "../log";

const clientDSN =
  conf.ENVIRONMENT === Environments.PRODUCTION && conf.CLIENT_DSN
    ? conf.CLIENT_DSN
    : null;

if (conf.ENVIRONMENT === Environments.PRODUCTION && !conf.CLIENT_DSN) {
  log.error("NO SENTRY IN CLIENT PROD!");
}

const router = Router();

router.get("/", (_, res: Response) => {
  try {
    const polyfillIO =
      "https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry&flags=gated&callback=guardianPolyfilled&unknown=polyfill";
    const consentJS = "/static/consent.js";
    const scripts = [polyfillIO, consentJS];
    const body = renderToString(App());
    const title = "Consent Management Platform | The Guardian";
    const globals = {
      domain: conf.DOMAIN,
      dsn: clientDSN,
      polyfilled: false
    };

    const resp = html({
      body,
      title,
      scripts,
      globals
    });

    res.status(200).send(resp);
  } catch (e) {
    res.status(500).send(`<pre>${e.stack}</pre>`);
  }
});

export default router;

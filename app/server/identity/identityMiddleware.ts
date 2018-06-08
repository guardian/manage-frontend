import express from "express";
import url from "url";
import { conf } from "../config";
import { log } from "../log";

const GU_U = "GU_U";
const SC_GU_U = "SC_GU_U";

export interface IdentityUser {
  readonly GU_U: string;
  readonly SC_GU_U: string;
}

export const withIdentity: express.RequestHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const returnUrl = url.format({
    protocol: "https",
    host: req.get("host"),
    pathname: req.originalUrl
  });
  if (req.cookies == null) {
    log.info("No cookies object.");
    res.status(500).send("Something broke!");
    return;
  }
  const cookies = req.cookies;

  if (cookies[GU_U] == null || cookies[SC_GU_U] == null) {
    log.info("Not logged in.");

    // somehow the redirect url is automatically encoded
    res.redirect(
      `https://profile.${conf.DOMAIN}/signin?returnUrl=${returnUrl}`
    );
    return;
  }
  try {
    const now = new Date().getTime();
    const cookieString = atob(cookies[SC_GU_U].split(".")[0]);
    const cookieData = JSON.parse(cookieString);
    const expiry = cookieData[1];
    const remaining = expiry - now;
    if (remaining < 60) {
      log.info("Insufficient time left in session.");
      res.redirect(
        `https://profile.${conf.DOMAIN}/signin?returnUrl=${returnUrl}`
      );
      return;
    }
  } catch (e) {
    log.error(`Unparseable SC_GU_U cookie ${e}`);
    res.redirect(
      `https://profile.${conf.DOMAIN}/signin?returnUrl=${returnUrl}`
    );
    return;
  }
  // tslint:disable-next-line:no-object-mutation
  res.locals.identity = {
    GU_U: cookies[GU_U],
    SC_GU_U: cookies[SC_GU_U]
  };
  next();
};

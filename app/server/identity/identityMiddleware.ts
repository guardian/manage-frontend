import bunyan from "bunyan";
import express from "express";
import Config from "../config";
import url from "url";

const log = bunyan.createLogger({ name: "af" });

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
  if (req.cookies == null) {
    log.info("No cookies object.");
    res.status(500).send("Something broke!");
    return;
  }
  const cookies = req.cookies;

  if (cookies[GU_U] == null || cookies[SC_GU_U] == null) {
    log.info("Not logged in.");
    const returnUrl = url.format({
      protocol: "https",
      host: req.get("host"),
      pathname: req.originalUrl
    });
    // somehow the redirect url is automatically encoded
    res.redirect(
      `https://profile.${Config.DOMAIN}/signin?returnUrl=${returnUrl}`
    );
    return;
  }

  const tokens: IdentityUser = {
    GU_U: cookies[GU_U],
    SC_GU_U: cookies[SC_GU_U]
  };

  // tslint:disable-next-line:no-object-mutation
  res.locals.identity = tokens;
  next();
};

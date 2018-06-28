import express from "express";
import url from "url";
import { getUser, IdentityError } from "../../identity";
import { conf } from "../config";
import { log } from "../log";

const GU_U = "GU_U";
const SC_GU_U = "SC_GU_U";

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
  const cookies = req.header("cookie");
  if (cookies == null) {
    log.info("No cookies header.");
    res.status(500).send("Something broke!");
    return;
  }

  const user = getUser(cookies);

  if (
    user === IdentityError.NotLoggedIn ||
    user === IdentityError.CouldNotParse
  ) {
    log.info("Not logged in.");

    // somehow the redirect url is automatically encoded
    res.redirect(
      `https://profile.${conf.DOMAIN}/signin?returnUrl=${returnUrl}`
    );
    return;
  }
  if (user === IdentityError.Expired) {
    log.info("User session expired.");

    // somehow the redirect url is automatically encoded
    res.redirect(
      `https://profile.${conf.DOMAIN}/reauthenticate?returnUrl=${returnUrl}`
    );
    return;
  }

  // tslint:disable-next-line:no-object-mutation
  res.locals.identity = user;
  next();
};

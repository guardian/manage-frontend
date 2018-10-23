import express from "express";
import url from "url";
import { conf } from "../config";
import { log } from "../log";
import { getUser, IdentityError } from "./identity";

export const withIdentity: express.RequestHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const cookies = req.header("cookie");
  const user = getUser(cookies);

  type SignInType = "signin" | "reauthenticate";

  const getAuthRedirectUrl = (signinType: SignInType) => {
    const returnUrl = url.format({
      protocol: "https",
      host: req.get("host"),
      pathname: req.path,
      query: Object.assign({ profileReferrer: signinType }, req.query)
    });

    return url.format({
      protocol: "https",
      host: "profile." + conf.DOMAIN,
      pathname: signinType,
      query: {
        ...(req.query.INTCMP && { INTCMP: req.query.INTCMP }), // if undefined then this param is omitted
        returnUrl // this is automatically URL encoded
      }
    });
  };

  if (
    user === IdentityError.NotLoggedIn ||
    user === IdentityError.CouldNotParse
  ) {
    log.info("Not logged in.");
    res.redirect(getAuthRedirectUrl("signin"));
    return;
  }
  if (user === IdentityError.Expired) {
    log.info("User session expired.");
    res.redirect(getAuthRedirectUrl("reauthenticate"));
    return;
  }

  // tslint:disable-next-line:no-object-mutation
  res.locals.identity = user;
  next();
};

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
  const returnUrl = url.format({
    protocol: "https",
    host: req.get("host"),
    pathname: req.originalUrl
  });
  const cookies = req.header("cookie");

  const user = getUser(cookies);

  const intcmp = req.query.INTCMP;
  const intcmpUrlInfix = intcmp ? `INTCMP=${intcmp}&` : "";

  if (
    user === IdentityError.NotLoggedIn ||
    user === IdentityError.CouldNotParse
  ) {
    log.info("Not logged in.");

    // somehow the redirect url is automatically encoded
    res.redirect(
      `https://profile.${
        conf.DOMAIN
      }/signin?${intcmpUrlInfix}returnUrl=${returnUrl}`
    );
    return;
  }
  if (user === IdentityError.Expired) {
    log.info("User session expired.");

    // somehow the redirect url is automatically encoded
    res.redirect(
      `https://profile.${
        conf.DOMAIN
      }/reauthenticate?${intcmpUrlInfix}returnUrl=${returnUrl}`
    );
    return;
  }

  // tslint:disable-next-line:no-object-mutation
  res.locals.identity = user;
  next();
};

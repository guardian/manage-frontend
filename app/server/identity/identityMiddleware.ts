import bunyan from "bunyan";
import express from "express";

const log = bunyan.createLogger({ name: "af" });

const GU_U = "GU_U";
const SC_GU_U = "SC_GU_U";

export interface IdentityTokens {
  readonly GU_U: string;
  readonly SC_GU_U: string;
}

export type IdentityRequest = express.Request & {
  readonly identity: IdentityTokens;
};

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
    res.redirect("https://profile.thegulocal.com/signin");
    return;
  }

  const tokens: IdentityTokens = {
    GU_U: cookies[GU_U],
    SC_GU_U: cookies[SC_GU_U]
  };

  // tslint:disable-next-line:no-object-mutation
  req.identity = tokens;
  next();
};

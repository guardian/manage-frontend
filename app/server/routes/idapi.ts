import cookieParser from "cookie-parser";
import { Request, Response, Router } from "express";
import https from "https";
import { IdapiConfig, idapiConfigPromise } from "../idapiConfig";

const SECURITY_COOKIE_NAME = "SC_GU_U";
const SECURITY_HEADER_NAME = "X-GU-ID-FOWARDED-SC-GU-U";

const router = Router();

interface CookiesWithToken {
  [SECURITY_COOKIE_NAME]: string;
  [index: string]: string;
}

interface SCGUHeader {
  [SECURITY_HEADER_NAME]: string;
}

const securityCookieToHeader = (cookies: CookiesWithToken): SCGUHeader => ({
  [SECURITY_HEADER_NAME]: cookies[SECURITY_COOKIE_NAME]
});

// @TODO: FIXME: DO NOT PROD DEPLOY: Needs CSRF Check
const isValid = (req: Request): boolean => {
  const token: boolean = !!req.cookies[SECURITY_COOKIE_NAME];
  return token;
};

const isValidConfig = (config: any): config is IdapiConfig =>
  config.host && config.accessToken;

const handleError = (error: any, res: Response) => {
  // @TODO: hook into sentry and remove console output
  process.stdout.write(error.toString() + "\n");
  res.status(500).send({ status: 500, message: "Internal service error" });
};

router.use(cookieParser());

router.get("/user", async (req: Request, res: Response) => {
  if (!isValid(req)) {
    res.end(401);
    return;
  }

  const config = await idapiConfigPromise;

  if (!isValidConfig(config)) {
    handleError("Error loading idapi configuration", res);
    return;
  }

  const path = "/user/me";
  const hostname = config.host;

  const headers = {
    "X-GU-ID-Client-Access-Token": `Bearer ${config.accessToken}`,
    ...securityCookieToHeader(req.cookies)
  };

  const options = {
    headers,
    method: "GET",
    hostname,
    path
  };

  const idapiRequest = https.request(options, getRes => getRes.pipe(res));

  idapiRequest.on("error", handleError);
  idapiRequest.end();
});

export default router;

import cookieParser from "cookie-parser";
import { NextFunction, Request, Response, Router } from "express";
import { RequestOptions } from "http";
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

const isValidConfig = (config: any): config is IdapiConfig =>
  config.host && config.accessToken;

// @TODO: FIXME: DO NOT PROD DEPLOY: Needs CSRF Check
const isValid = (req: Request): boolean => {
  const token: boolean = !!req.cookies[SECURITY_COOKIE_NAME];
  return token;
};

const handleError = (error: any, res: Response) => {
  // @TODO: hook into sentry and remove console output
  process.stdout.write(error.toString() + "\n");
  res.status(500).send({ status: 500, message: "Internal service error" });
};

const makeIdapiRequest = (
  options: RequestOptions,
  res: Response,
  body?: Buffer
) => {
  const idapiRequest = https.request(options, idapiResponse => {
    res.setHeader("Content-Type", "application/json"); // @TODO: Hardcoded MIME. Read response headers
    idapiResponse.pipe(res);
  });
  idapiRequest.on("error", handleError);
  if (body) {
    idapiRequest.write(body);
  }
  idapiRequest.end();
};

const getConfig = async (): Promise<IdapiConfig> => {
  const config = await idapiConfigPromise;
  if (!isValidConfig(config)) {
    throw new Error("Error loading a valid config");
  }
  return config;
};

const getOptions = (
  method: string,
  cookies: CookiesWithToken,
  config: IdapiConfig
) => {
  const path = "/user/me";
  const hostname = config.host;

  const headers = {
    "X-GU-ID-Client-Access-Token": `Bearer ${config.accessToken}`,
    ...securityCookieToHeader(cookies),
    "Content-Type": "application/json"
  };

  const options = {
    headers,
    method,
    hostname,
    path
  };

  return options;
};

router.use(cookieParser());

router.use((req: Request, res: Response, next: NextFunction) => {
  if (!isValid(req)) {
    res.end(401);
    return;
  } else {
    next();
  }
});

router.get("/user", async (req: Request, res: Response) => {
  let config;
  try {
    config = await getConfig();
  } catch (e) {
    handleError(e, res);
    return;
  }
  const options = getOptions("GET", req.cookies, config);
  makeIdapiRequest(options, res);
});

router.put("/user", async (req: Request, res: Response) => {
  let config;
  try {
    config = await getConfig();
  } catch (e) {
    handleError(e, res);
    return;
  }
  const options = getOptions("POST", req.cookies, config);
  const { body } = req;
  makeIdapiRequest(options, res, body);
});

export default router;

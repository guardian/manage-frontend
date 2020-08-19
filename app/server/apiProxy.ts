import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { parse } from "url";
import { LOGGING_CODE_SUFFIX_HEADER } from "../shared/globals";
import { X_GU_ID_FORWARDED_SCOPE } from "../shared/identity";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import { conf } from "./config";
import { log, putMetric } from "./log";
import {
  augmentRedirectURL,
  getCookiesOrEmptyString
} from "./middleware/identityMiddleware";

type BodyHandler = (res: Response, body: string) => void;

export const straightThroughBodyHandler: BodyHandler = (res, body) =>
  res.send(body);

function safeJsonParse(jsonStr: Buffer | string | undefined): any {
  try {
    if (jsonStr) {
      return JSON.parse(jsonStr.toString());
    }
    return jsonStr;
  } catch (e) {
    return jsonStr;
  }
}
export interface Headers {
  [headerName: string]: string;
}
export type AdditionalHeaderGenerator = (
  method: string,
  host: string,
  path: string,
  body: string
) => Promise<Headers>;

export const proxyApiHandler = (
  host: string,
  headers: Headers = {},
  additionalHeaderGenerator: AdditionalHeaderGenerator = () =>
    Promise.resolve({})
) => (bodyHandler: BodyHandler) => (
  path: string,
  mainLoggingCode: string,
  forwardQueryArgs?: boolean, // TODO could we eliminate this and always forward query params
  ...urlParamNamesToReplace: string[]
) => async (req: Request, res: Response) => {
  const parameterisedPath = urlParamNamesToReplace
    .reduce(
      (evolvingPath: string, urlParamName: string) =>
        evolvingPath.replace(
          ":" + urlParamName,
          req.params[urlParamName] || ""
        ),
      path
    )
    .replace(/\/$/, ""); // strips any trailing slashes

  const queryString =
    forwardQueryArgs && req.query && Object.keys(req.query).length > 0
      ? `?${parse(req.url).query}`
      : "";

  const isTestUser = req.header(MDA_TEST_USER_HEADER) === "true";
  const requestBody = Buffer.isBuffer(req.body) ? req.body : undefined;
  const httpMethod = req.method;
  const finalPath = `/${parameterisedPath}${queryString}`;
  const outgoingURL = `https://${host}${finalPath}`;
  const loggingCode = `${mainLoggingCode}${req.header(
    LOGGING_CODE_SUFFIX_HEADER
  ) || ""}`;

  // tslint:disable-next-line:no-object-mutation
  res.locals.loggingDetail = {
    loggingCode,
    httpMethod,
    isTestUser,
    identityID: res.locals.identity && res.locals.identity.userId,
    incomingURL: req.originalUrl,
    requestBody: safeJsonParse(requestBody),
    outgoingURL
  };

  fetch(outgoingURL, {
    method: httpMethod,
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
      Cookie: getCookiesOrEmptyString(req),
      [X_GU_ID_FORWARDED_SCOPE]: req.header(X_GU_ID_FORWARDED_SCOPE) || "",
      ...headers,
      ...(await additionalHeaderGenerator(
        httpMethod,
        host,
        finalPath,
        requestBody?.toString() || ""
      ))
    }
  })
    .then(intermediateResponse => {
      // tslint:disable-next-line:no-object-mutation
      res.locals.loggingDetail.status = intermediateResponse.status;
      // tslint:disable-next-line:no-object-mutation
      res.locals.loggingDetail.isOK = intermediateResponse.ok;

      res.status(intermediateResponse.status);

      res.header(
        MDA_TEST_USER_HEADER,
        intermediateResponse.headers.get(MDA_TEST_USER_HEADER) || undefined
      );

      const idapiRedirect = intermediateResponse.headers.get(
        "X-GU-IDAPI-Redirect"
      );
      if (intermediateResponse.status === 401 && idapiRedirect) {
        res.header(
          "Location",
          augmentRedirectURL(req, idapiRedirect, conf.DOMAIN, true)
        );
      }

      return intermediateResponse.text();
    })
    .then(body => {
      const suitableLog = res.locals.loggingDetail.isOK ? log.info : log.warn;
      suitableLog("proxying", {
        ...res.locals.loggingDetail,
        responseBody: safeJsonParse(body)
      });
      putMetric(res.locals.loggingDetail);
      bodyHandler(res, body);
    })
    .catch(error => {
      log.error("ERROR proxying", {
        ...res.locals.loggingDetail,
        exception: error ? error.toString() : "undefined"
      });
      Sentry.captureException(error);
      putMetric(res.locals.loggingDetail);
      res.status(500).send("Something broke!");
    });
};

export const customMembersDataApiHandler = proxyApiHandler(
  "members-data-api." + conf.DOMAIN
);
export const membersDataApiHandler = customMembersDataApiHandler(
  straightThroughBodyHandler
);

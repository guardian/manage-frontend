import { Request, Response } from "express";
import fetch from "node-fetch";
import Raven from "raven";
import { parse } from "url";
import { LOGGING_CODE_SUFFIX_HEADER } from "../shared/globals";
import { X_GU_ID_FORWARDED_SCOPE } from "../shared/identity";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import { isInAccountOverviewTest } from "./accountOverviewRelease";
import { conf } from "./config";
import { log } from "./log";
import {
  augmentRedirectURL,
  getCookiesOrEmptyString
} from "./middleware/identityMiddleware";

export type BodyHandler = (res: Response, body: string) => void;

export const straightThroughBodyHandler: BodyHandler = (res, body) =>
  res.send(body);

export function safeJsonParse(jsonStr: Buffer | string | undefined): any {
  try {
    if (jsonStr) {
      return JSON.parse(jsonStr.toString());
    }
    return jsonStr;
  } catch (e) {
    return jsonStr;
  }
}

export const proxyApiHandler = (
  basePath: string,
  extraHeaders: { [headerName: string]: string } = {},
  ...headersToForward: string[]
) => (bodyHandler: BodyHandler) => (
  path: string,
  mainLoggingCode: string,
  forwardQueryArgs?: boolean, // TODO could we eliminate this and always forward query params
  ...urlParamNamesToReplace: string[]
) => (req: Request, res: Response) => {
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
  const outgoingURL = `${basePath}/${parameterisedPath}${queryString}`;
  const loggingCode = `${mainLoggingCode}${req.header(
    LOGGING_CODE_SUFFIX_HEADER
  ) || ""}`;

  // tslint:disable-next-line:no-object-mutation
  res.locals.loggingDetail = {
    loggingCode,
    isInAccountOverviewTest: isInAccountOverviewTest(res),
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
      ...extraHeaders
      // headersToForward are added in the 'then' block below
    }
  })
    .then(intermediateResponse => {
      // tslint:disable-next-line:no-object-mutation
      res.locals.loggingDetail.status = intermediateResponse.status;
      // tslint:disable-next-line:no-object-mutation
      res.locals.loggingDetail.isOK = intermediateResponse.ok;

      res.status(intermediateResponse.status);

      headersToForward.forEach((headerName: string) =>
        res.header(
          headerName,
          intermediateResponse.headers.get(headerName) || undefined
        )
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
      const suitableLog = res.locals.loggingDetail.isOK
        ? log.info
        : log.warning;
      suitableLog("proxying", {
        ...res.locals.loggingDetail,
        responseBody: safeJsonParse(body)
      });
      bodyHandler(res, body);
    })
    .catch(error => {
      log.error("ERROR proxying", {
        ...res.locals.loggingDetail,
        exception: error || "undefined"
      });
      Raven.captureException(error);
      res.status(500).send("Something broke!");
    });
};

export const customMembersDataApiHandler = proxyApiHandler(
  "https://members-data-api." + conf.DOMAIN,
  {},
  MDA_TEST_USER_HEADER
);
export const membersDataApiHandler = customMembersDataApiHandler(
  straightThroughBodyHandler
);

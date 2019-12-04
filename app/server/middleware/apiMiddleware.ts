import { Request, Response } from "express";
import fetch from "node-fetch";
import { parse } from "url";
import { X_GU_ID_FORWARDED_SCOPE } from "../../shared/identity";
import { MDA_TEST_USER_HEADER } from "../../shared/productResponse";
import { conf } from "../config";
import { log } from "../log";
import {
  augmentRedirectURL,
  getCookiesOrEmptyString
} from "./identityMiddleware";

export type BodyHandler = (res: Response, body: string) => void;

const straightThroughBodyHandler: BodyHandler = (res, jsonString) =>
  res.send(jsonString);

export const proxyApiHandler = (
  basePath: string,
  ...headersToForward: string[]
) => (bodyHandler: BodyHandler = straightThroughBodyHandler) => (
  path: string,
  forwardQueryArgs?: boolean,
  ...pathParamNamesToReplace: string[]
) => (req: Request, res: Response) => {
  const parameterisedPath = pathParamNamesToReplace
    .reduce(
      (evolvingPath: string, pathParamName: string) =>
        evolvingPath.replace(
          ":" + pathParamName,
          req.params[pathParamName] || ""
        ),
      path
    )
    .replace(/\/$/, ""); // strips any trailing slashes

  const queryString =
    forwardQueryArgs && req.query && Object.keys(req.query).length > 0
      ? `?${parse(req.url).query}`
      : "";

  fetch(`${basePath}/${parameterisedPath}${queryString}`, {
    method: req.method,
    body: Buffer.isBuffer(req.body) ? req.body : undefined,
    headers: {
      "Content-Type": "application/json",
      Cookie: getCookiesOrEmptyString(req),
      [X_GU_ID_FORWARDED_SCOPE]: req.header(X_GU_ID_FORWARDED_SCOPE) || ""
    }
  })
    .then(intermediateResponse => {
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
    .then(body => bodyHandler(res, body))
    .catch(e => {
      log.info(e);
      res.status(500).send("Something broke!");
    });
};

export const sfCasesApiHandler = proxyApiHandler(conf.SF_CASES_URL)();
export const customMembersDataApiHandler = proxyApiHandler(
  "https://members-data-api." + conf.DOMAIN,
  MDA_TEST_USER_HEADER
);
export const membersDataApiHandler = customMembersDataApiHandler();

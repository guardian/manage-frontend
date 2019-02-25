import express from "express";
import fetch from "node-fetch";
import url from "url";
import { conf } from "../config";
import { handleIdapiRelatedError, idapiConfigPromise } from "../idapiConfig";

interface RedirectResponseBody {
  status: string;
  redirect?: {
    url: string;
  };
}

export interface MockableExpressRequest {
  baseUrl: string;
  path: string;
  get: (name: string) => string | undefined;
  header: (name: string) => string | undefined;
  query: any;
}

interface QueryParameters {
  [name: string]: string;
}

// Filter query parameters to include only those whose name satisfies the predicate p.
const filterQueryParametersByName = (
  params: QueryParameters,
  p: (name: string) => boolean
): QueryParameters => {
  return Object.entries(params)
    .filter(([name, _]) => p(name))
    .reduce((params2, [name, value]) => ({ ...params2, [name]: value }), {});
};

export const augmentRedirectURL = (
  req: MockableExpressRequest,
  simpleRedirectURL: string,
  currentDomain: string,
  useRefererHeaderForReturnURL: boolean
) => {
  const parsedSimpleURL = url.parse(
    // the replace below essentially allows DEV to use CODE IDAPI but still redirect to profile.thegulocal.com
    simpleRedirectURL.replace("code.dev-theguardian.com", currentDomain),
    true
  );

  // These query parameters are included in payment failure links
  // so that they can be forwarded to profile to facilitate sign-in.
  // However, they are not required by manage, so remove them from the return url.
  const queryParameterNamesToRemove = ["encryptedEmail", "autoSignInToken"];

  const returnUrlQueryParameters = filterQueryParametersByName(
    req.query,
    name => !queryParameterNamesToRemove.includes(name)
  );

  const returnUrl = useRefererHeaderForReturnURL
    ? req.header("referer")
    : url.format({
        protocol: "https",
        host: req.get("host"),
        pathname: req.baseUrl + req.path,
        query: {
          ...returnUrlQueryParameters,
          profileReferrer: parsedSimpleURL.path
            ? parsedSimpleURL.path.substring(1)
            : undefined
        }
      });

  // To avoid potential clashes with query parameters that have a special meaning on profile (e.g. error),
  // only forward specific query parameters to profile.
  const profileQueryParameterNames = [
    "INTCMP",
    // Some links in payment failure emails include the user's (encrypted) email as a query parameter
    // and/or an auto sign-in token. If present, include these in the identity redirect url,
    // since they can be utilised to facilitate sign-in by identity frontend.
    "encryptedEmail",
    "autoSignInToken",
    // By passing these to profile, can measure the sign in rates across test segments.
    "abName",
    "abVariant"
  ];

  const profileQueryParameters = filterQueryParametersByName(req.query, name =>
    profileQueryParameterNames.includes(name)
  );

  return url.format({
    protocol: parsedSimpleURL.protocol,
    host: parsedSimpleURL.host,
    pathname: parsedSimpleURL.pathname,
    query: {
      ...parsedSimpleURL.query,
      ...profileQueryParameters,
      returnUrl // this is automatically URL encoded
    }
  });
};

const redirectOrCustomStatusCode = (
  res: express.Response,
  redirectURL: string,
  statusCode?: number
) =>
  statusCode
    ? res
        .status(statusCode)
        .header("Location", redirectURL)
        .send()
    : res.redirect(redirectURL);

export const getCookiesOrEmptyString = (req: express.Request) =>
  req.header("cookie") || "";

export const withIdentity: (statusCode?: number) => express.RequestHandler = (
  statusCode?: number
) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errorHandler = (message: string, detail?: any) => {
    handleIdapiRelatedError(message, detail);
    res.sendStatus(500); // TODO maybe server side render a pretty response
  };

  idapiConfigPromise
    .then(idapiConfig => {
      if (idapiConfig) {
        fetch(
          url.format({
            protocol: "https",
            host: idapiConfig.host,
            pathname: "auth/redirect"
          }),
          {
            headers: {
              "X-GU-ID-Client-Access-Token":
                "Bearer " + idapiConfig.accessToken,
              Cookie: getCookiesOrEmptyString(req)
            }
          }
        )
          .then(
            redirectResponse =>
              redirectResponse.json() as Promise<RedirectResponseBody>
          )
          .then(redirectResponseBody => {
            if (redirectResponseBody.redirect) {
              redirectOrCustomStatusCode(
                res,
                augmentRedirectURL(
                  req,
                  redirectResponseBody.redirect.url,
                  conf.DOMAIN,
                  !!statusCode
                ),
                statusCode
              );
            } else if (redirectResponseBody.status === "ok") {
              next();
            } else {
              errorHandler(
                "error back from IDAPI redirect service",
                redirectResponseBody
              );
            }
          })
          .catch(err =>
            errorHandler("IDAPI config promise threw an error", err)
          );
      } else {
        errorHandler("IDAPI config is undefined");
      }
    })
    .catch(err => errorHandler("error fetching IDAPI config", err));
};

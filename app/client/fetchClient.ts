import { trackEvent } from "./components/analytics";
import * as Sentry from "@sentry/browser";
import qs from "qs";

function handleError(error: Error | ErrorEvent | string): void {
  trackEvent({
    eventCategory: "asyncLoader-SWR",
    eventAction: "error",
    eventLabel: error ? error.toString() : undefined
  });

  Sentry.captureException(error);
}

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args)
    .then(res => {
      if (!res.ok) {
        const locationHeader = res.headers.get("Location");

        if (res.status === 401 && locationHeader && window !== undefined) {
          window.location.replace(locationHeader);
        }
      }

      return res.json();
    })
    .catch(e => {
      handleError(e);
    });

export const fetcherWithParams = (
  url: string,
  headers: RequestInit,
  params: URLSearchParams
) =>
  fetch(url + "?" + params, headers)
    .then(res => {
      if (!res.ok) {
        const locationHeader = res.headers.get("Location");

        if (res.status === 401 && locationHeader && window !== undefined) {
          window.location.replace(locationHeader);
        }
      }

      return res.json();
    })
    .catch(e => {
      handleError(e);
    });

// https://github.com/vercel/swr/issues/345
export default function serialize(
  url: string,
  params?: object | any[]
): string {
  if (typeof params === "object" || Array.isArray(params)) {
    const matches = url.match(/^(.+?)(\?(.*))?$/);
    const urlWithoutQueryString: string = (matches && matches[1]) || url;
    const queryStringDataFromUrl: object =
      matches && matches[3] ? qs.parse(matches[3]) : {};
    const queryString: string = qs.stringify(
      { ...queryStringDataFromUrl, ...params },
      { arrayFormat: "indices" }
    );
    if (queryString) {
      return `${urlWithoutQueryString}?${queryString}`;
    }
    return url;
  }
  return url;
}

interface CredentialHeaders {
  credentials: RequestCredentials;
  mode: RequestMode;
}

export const credentialHeaders: CredentialHeaders = {
  credentials: "include",
  mode: "same-origin"
};

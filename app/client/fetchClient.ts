import { trackEvent } from "./components/analytics";
import * as Sentry from "@sentry/browser";

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

interface CredentialHeaders {
  credentials: RequestCredentials;
  mode: RequestMode;
}

export const credentialHeaders: CredentialHeaders = {
  credentials: "include",
  mode: "same-origin"
};

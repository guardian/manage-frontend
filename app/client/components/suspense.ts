import { trackEvent } from "./analytics";
import * as Sentry from "@sentry/browser";

const processResponse = (
  resp: Response,
  _?: number, // index
  allResponses?: Response[]
) => {
  const locationHeader = resp.headers.get("Location");
  const allResponsesAreOK =
    (allResponses || [resp]).filter(res => !res.ok).length === 0;
  if (resp.status === 401 && locationHeader && window !== undefined) {
    window.location.replace(locationHeader);
    return Promise.resolve(null);
  } else if (allResponsesAreOK) {
    return resp.json();
  }
  throw new Error(`${resp.status} (${resp.statusText})`);
};

function handleError(error: Error | ErrorEvent | string): void {
  trackEvent({
    eventCategory: "asyncLoader",
    eventAction: "error",
    eventLabel: error ? error.toString() : undefined
  });

  Sentry.captureException(error);
}

function suspender<T>(promise: Promise<unknown>): () => T {
  let status = "pending";
  let result: T;
  const suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      handleError(e);
      result = e;
    }
  );

  return () => {
    if (status === "pending") {
      throw suspender;
    } else if (status === "error") {
      throw result;
    } else if (status === "success") {
      return result;
    }
  };
}

export function useSuspense<T>(promise: Promise<unknown>): () => T | void {
  const toSuspend = promise.then(resp =>
    Array.isArray(resp)
      ? Promise.all(resp.map(processResponse))
      : processResponse(resp)
  );

  return suspender<T>(toSuspend);
}

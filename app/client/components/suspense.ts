import { trackEvent } from "./analytics";
import * as Sentry from "@sentry/browser";

const processResponse = (
  resp: Response,
  _?: number, // index
  allResponses?: Response[],
  returnJson?: boolean
) => {
  const locationHeader = resp.headers.get("Location");
  const allResponsesAreOK =
    (allResponses || [resp]).filter(res => !res.ok).length === 0;
  if (resp.status === 401 && locationHeader && window !== undefined) {
    window.location.replace(locationHeader);
    return Promise.resolve(null);
  } else if (allResponsesAreOK) {
    if (returnJson) {
      return resp.json();
    } else {
      return resp.text();
    }
  }
  throw new Error(`${resp.status} (${resp.statusText})`);
};

function handleError(error: Error | ErrorEvent | string): void {
  trackEvent({
    eventCategory: "asyncLoader-customSuspense",
    eventAction: "error",
    eventLabel: error ? error.toString() : undefined
  });

  Sentry.captureException(error);
}

function suspender<T>(promise: Promise<unknown>): () => T {
  let status = "pending";
  let result: T | unknown;
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

export function useSuspense<T>(
  promise: Promise<unknown>,
  returnJson?: boolean
): () => T {
  const toSuspend = promise.then(resp =>
    Array.isArray(resp)
      ? Promise.all(resp.map(processResponse, returnJson))
      : processResponse(resp as Response, 0, undefined, returnJson)
  );
  return suspender<T>(toSuspend);
}

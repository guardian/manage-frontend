import React from "react";
import AsyncLoader from "../../asyncLoader";
import {
  CancellationReasonContext,
  CancellationTypeContext,
  CancellationUrlSuffixContext
} from "../../user";
import { RouteableProps } from "../../wizardRouterAdapter";

class CancelAsyncLoader extends AsyncLoader<string> {}

export const getCancelFunc = (
  cancelType: string,
  urlSuffix: string,
  reason: string
) => async () => {
  return (await fetch("/api/cancel/" + cancelType + urlSuffix, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" }
  })).text(); // only actually care about status being OK, so TODO make call to new subscription detail lambda
};

const getCancelErrorRenderer = (cancelType: string) => () => (
  <h2>
    Cannot cancel {cancelType} at this time. Please try again later OR call the
    call centre...{" "}
  </h2>
);

const cancelConfirmedRenderer = (errorData: string | undefined) =>
  errorData ? (
    <h2>Might already be cancelled???</h2>
  ) : (
    <h2>Cancellation Confirmed</h2>
  );

export const Confirmed = (props: RouteableProps) => (
  <CancellationTypeContext.Consumer>
    {cancelType => (
      <CancellationUrlSuffixContext.Consumer>
        {urlSuffix => (
          <CancellationReasonContext.Consumer>
            {reason => (
              <CancelAsyncLoader
                fetch={getCancelFunc(cancelType, urlSuffix, reason)}
                render={cancelConfirmedRenderer}
                errorRender={getCancelErrorRenderer(cancelType)}
              />
            )}
          </CancellationReasonContext.Consumer>
        )}
      </CancellationUrlSuffixContext.Consumer>
    )}
  </CancellationTypeContext.Consumer>
);

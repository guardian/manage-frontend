import React from "react";
import AsyncLoader from "../../asyncLoader";
import {
  CancellationReasonContext,
  CancellationTypeContext,
  CancellationUrlSuffixContext,
  HasSubscription,
  HasSubscriptionGetterContext,
  Subscription
} from "../../user";
import { RouteableProps } from "../../wizardRouterAdapter";
import { CancellationSummary } from "../cancellationSummary";

class CancelAsyncLoader extends AsyncLoader<Subscription> {}

export const getCancelFunc = (
  cancelType: string,
  urlSuffix: string,
  reason: string,
  hasSubscriptionPromiseGetter: () => Promise<HasSubscription | {}>
) => async () => {
  await fetch("/api/cancel/" + cancelType + urlSuffix, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" }
  }); // response is either empty or 404 - neither is useful so need to fetch subscription...
  const mightHaveSubscription:
    | HasSubscription
    | {} = await hasSubscriptionPromiseGetter();
  return Promise.resolve(
    (mightHaveSubscription as HasSubscription).subscription
  );
};

const getCancelErrorRenderer = (cancelType: string) => () => (
  <h2>
    Cannot cancel {cancelType} at this time. Please try again later OR call the
    call centre...{" "}
  </h2>
);

export const ExecuteCancellation = (props: RouteableProps) => (
  <CancellationTypeContext.Consumer>
    {cancelType => (
      <CancellationUrlSuffixContext.Consumer>
        {urlSuffix => (
          <CancellationReasonContext.Consumer>
            {reason => (
              <HasSubscriptionGetterContext.Consumer>
                {hasSubscriptionPromiseGetter => (
                  <CancelAsyncLoader
                    fetch={getCancelFunc(
                      cancelType,
                      urlSuffix,
                      reason,
                      hasSubscriptionPromiseGetter
                    )}
                    render={CancellationSummary}
                    errorRender={getCancelErrorRenderer(cancelType)}
                  />
                )}
              </HasSubscriptionGetterContext.Consumer>
            )}
          </CancellationReasonContext.Consumer>
        )}
      </CancellationUrlSuffixContext.Consumer>
    )}
  </CancellationTypeContext.Consumer>
);

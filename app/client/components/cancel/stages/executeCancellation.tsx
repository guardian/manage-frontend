import React from "react";
import AsyncLoader from "../../asyncLoader";
import {
  CancellationReasonContext,
  Subscription,
  WithSubscription
} from "../../user";
import { RouteableProps } from "../../wizardRouterAdapter";
import { CancellationSummary } from "../cancellationSummary";

class CancelAsyncLoader extends AsyncLoader<Subscription> {}

export const getCancelFunc = (
  urlSuffix: string,
  reason: string,
  withSubscriptionPromiseFetcher: () => Promise<WithSubscription | {}>
) => async () => {
  await fetch("/api/cancel/" + urlSuffix, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" }
  }); // response is either empty or 404 - neither is useful so need to fetch subscription...
  const mightHaveSubscription:
    | WithSubscription
    | {} = await withSubscriptionPromiseFetcher();
  return Promise.resolve(
    (mightHaveSubscription as WithSubscription).subscription
  );
};

const getCancelErrorRenderer = (cancelType: string) => () => (
  <h2>
    Cannot cancel {cancelType} at this time. Please try again later OR call the
    call centre...{" "}
  </h2>
);

export interface ExecuteCancellationRouteableProps extends RouteableProps {
  cancelApiUrlSuffix: string;
  cancelType: string;
  withSubscriptionPromiseFetcher: () => Promise<WithSubscription | {}>;
}

export const ExecuteCancellation = (
  props: ExecuteCancellationRouteableProps
) => (
  <CancellationReasonContext.Consumer>
    {reason => (
      <CancelAsyncLoader
        fetch={getCancelFunc(
          props.cancelApiUrlSuffix,
          reason,
          props.withSubscriptionPromiseFetcher
        )}
        render={CancellationSummary(props.cancelType)}
        errorRender={getCancelErrorRenderer(props.cancelType)}
      />
    )}
  </CancellationReasonContext.Consumer>
);

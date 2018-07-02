import React from "react";
import AsyncLoader from "../../asyncLoader";
import { getUpdateCasePromise } from "../../caseUpdate";
import {
  CancellationCaseIdContext,
  CancellationReasonContext,
  Subscription,
  WithSubscription
} from "../../user";
import { RouteableProps, WizardStep } from "../../wizardRouterAdapter";
import { CancellationSummary } from "../cancellationSummary";

class CancelAsyncLoader extends AsyncLoader<Subscription> {}

export const getCancelFunc = (
  cancelApiUrlSuffix: string,
  reason: string,
  caseId: string,
  withSubscriptionPromiseFetcher: () => Promise<WithSubscription | {}>
) => async () => {
  await fetch("/api/cancel/" + cancelApiUrlSuffix, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" }
  }); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...
  const mightHaveSubscription:
    | WithSubscription
    | {} = await withSubscriptionPromiseFetcher();

  const subscriptionPromise = Promise.resolve(
    (mightHaveSubscription as WithSubscription).subscription
  );

  await getUpdateCasePromise(caseId, {
    Journey__c: "SV - Cancellation - MB",
    Subject: "Online Cancellation Completed"
  });

  return subscriptionPromise;
};

export interface ExecuteCancellationRouteableProps extends RouteableProps {
  cancelApiUrlSuffix: string;
  cancelType: string;
  withSubscriptionPromiseFetcher: () => Promise<WithSubscription | {}>;
}

export const ExecuteCancellation = (
  props: ExecuteCancellationRouteableProps
) => (
  <WizardStep routeableProps={props}>
    <CancellationReasonContext.Consumer>
      {reason => (
        <CancellationCaseIdContext.Consumer>
          {caseId => (
            <CancelAsyncLoader
              fetch={getCancelFunc(
                props.cancelApiUrlSuffix,
                reason,
                caseId,
                props.withSubscriptionPromiseFetcher
              )}
              render={CancellationSummary(props.cancelType)}
              loadingMessage="Performing your cancellation..."
            />
          )}
        </CancellationCaseIdContext.Consumer>
      )}
    </CancellationReasonContext.Consumer>
  </WizardStep>
);

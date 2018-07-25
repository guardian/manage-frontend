import React from "react";
import AsyncLoader from "../../asyncLoader";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../../caseUpdate";
import {
  CancellationCaseIdContext,
  CancellationReasonContext,
  Subscription,
  WithSubscription
} from "../../user";
import { RouteableProps, WizardStep } from "../../wizardRouterAdapter";
import { CancellationSummary, isCancelled } from "../cancellationSummary";

class PerformCancelAsyncLoader extends AsyncLoader<WithSubscription | {}> {}

const getCancelFunc = (
  cancelApiUrlSuffix: string,
  reason: string,
  withSubscriptionResponseFetcher: () => Promise<Response>
) => async () => {
  await fetch("/api/cancel/" + cancelApiUrlSuffix, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" }
  }); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

  return await withSubscriptionResponseFetcher();
};

const getCaseUpdateWithCancelOutcomeFunc = (
  caseId: string,
  subscription: Subscription
) => async () =>
  await getUpdateCasePromise(
    caseId,
    isCancelled(subscription)
      ? {
          Journey__c: "SV - Cancellation - MB",
          Subject: "Online Cancellation Completed"
        }
      : {
          Subject: "Online Cancellation Error"
        }
  );

export interface ExecuteCancellationRouteableProps extends RouteableProps {
  cancelApiUrlSuffix: string;
  cancelType: string;
  withSubscriptionResponseFetcher: () => Promise<Response>;
}

const getCaseUpdatingCancellationSummary = (
  caseId: string,
  cancelType: string
) => (withSubscription: WithSubscription | {}) => {
  const subscription =
    (withSubscription as WithSubscription).subscription || {};
  return (
    <CaseUpdateAsyncLoader
      fetch={getCaseUpdateWithCancelOutcomeFunc(caseId, subscription)}
      render={() => CancellationSummary(cancelType)(subscription)}
      loadingMessage="Finalising your cancellation..."
    />
  );
};

export const ExecuteCancellation = (
  props: ExecuteCancellationRouteableProps
) => (
  <WizardStep routeableProps={props}>
    <CancellationReasonContext.Consumer>
      {reason => (
        <CancellationCaseIdContext.Consumer>
          {caseId => (
            <PerformCancelAsyncLoader
              fetch={getCancelFunc(
                props.cancelApiUrlSuffix,
                reason,
                props.withSubscriptionResponseFetcher
              )}
              render={getCaseUpdatingCancellationSummary(
                caseId,
                props.cancelType
              )}
              loadingMessage="Performing your cancellation..."
            />
          )}
        </CancellationCaseIdContext.Consumer>
      )}
    </CancellationReasonContext.Consumer>
  </WizardStep>
);

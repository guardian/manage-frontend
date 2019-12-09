import React from "react";
import {
  isProduct,
  MembersDataApiItemContext,
  Subscription,
  WithSubscription
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductTypeWithCancellationFlow
} from "../../../../shared/productTypes";
import AsyncLoader from "../../asyncLoader";
import { GenericErrorScreen } from "../../genericErrorScreen";
import {
  ReturnToYourProductButton,
  WizardStep
} from "../../wizardRouterAdapter";
import {
  CancellationCaseIdContext,
  CancellationReasonContext
} from "../cancellationContexts";
import { RouteableStepPropsWithCancellationFlow } from "../cancellationFlow";
import { OptionalCancellationReasonId } from "../cancellationReason";
import { getCancellationSummary, isCancelled } from "../cancellationSummary";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../caseUpdate";

class PerformCancelAsyncLoader extends AsyncLoader<WithSubscription | {}> {}

const getCancelFunc = (
  subscriptionName: string,
  reason: OptionalCancellationReasonId,
  withSubscriptionResponseFetcher: () => Promise<Response>
) => async () => {
  await fetch("/api/cancel/" + subscriptionName, {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
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

const getCancellationSummaryWithReturnButton = (
  productType: ProductTypeWithCancellationFlow,
  subscription: Subscription
) => (
  <div>
    {getCancellationSummary(productType)(subscription)}
    <div css={{ height: "20px" }} />
    <ReturnToYourProductButton productType={productType} />
  </div>
);

const getCaseUpdatingCancellationSummary = (
  caseId: string,
  productType: ProductTypeWithCancellationFlow
) => (withSubscription: WithSubscription | {}) => {
  const subscription =
    (withSubscription as WithSubscription).subscription || {};
  return (
    <CaseUpdateAsyncLoader
      fetch={getCaseUpdateWithCancelOutcomeFunc(caseId, subscription)}
      render={() =>
        getCancellationSummaryWithReturnButton(productType, subscription)
      }
      loadingMessage="Finalising your cancellation..."
    />
  );
};

export const ExecuteCancellation = (
  props: RouteableStepPropsWithCancellationFlow
) => (
  <WizardStep routeableStepProps={props} hideBackButton>
    <CancellationReasonContext.Consumer>
      {reason => (
        <CancellationCaseIdContext.Consumer>
          {caseId => (
            <MembersDataApiItemContext.Consumer>
              {productDetail =>
                isProduct(productDetail) ? (
                  <PerformCancelAsyncLoader
                    fetch={getCancelFunc(
                      productDetail.subscription.subscriptionId,
                      reason,
                      createProductDetailFetcher(
                        props.productType,
                        productDetail.subscription.subscriptionId
                      )
                    )}
                    render={getCaseUpdatingCancellationSummary(
                      caseId,
                      props.productType
                    )}
                    loadingMessage="Performing your cancellation..."
                  />
                ) : (
                  <GenericErrorScreen loggingMessage="invalid product detail to cancel" />
                )
              }
            </MembersDataApiItemContext.Consumer>
          )}
        </CancellationCaseIdContext.Consumer>
      )}
    </CancellationReasonContext.Consumer>
  </WizardStep>
);

import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React, { ReactNode } from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../../shared/productResponse";
import { ProductTypeWithCancellationFlow } from "../../../../shared/productTypes";
import {
  createProductDetailEndpoint,
  createProductDetailFetcher
} from "../../../productUtils";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { ProgressIndicator } from "../../progressIndicator";
import {
  ReturnToAccountOverviewButton,
  WizardStep
} from "../../wizardRouterAdapter";
import {
  CancellationCaseIdContext,
  CancellationReasonContext
} from "../cancellationContexts";
import { RouteableStepPropsWithCancellationFlow } from "../cancellationFlow";
import { CancellationFlowEscalationCheck } from "../cancellationFlowEscalationCheck";
import { OptionalCancellationReasonId } from "../cancellationReason";
import { CancellationSummary, isCancelled } from "../cancellationSummary";
import { getUpdateCasePromise } from "../caseUpdate";
import DataFetcher from "../../DataFetcher";
import { fetcher } from "../../../fetchClient";
import useSWR, { useSWRConfig } from "swr";
import { fetchWithDefaultParameters } from "../../../fetch";
import { useSuspense } from "../../suspense";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../../shared/identity";

const getCancelFunc = async (
  subscriptionName: string,
  reason: OptionalCancellationReasonId,
  withSubscriptionResponseFetcher: () => Promise<Response>
) => {
  await fetchWithDefaultParameters("/api/cancel/" + subscriptionName, {
    method: "POST",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" }
  }); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

  return await withSubscriptionResponseFetcher();
};

export const getCaseUpdateWithCancelOutcomeFunc = (
  caseId: string,
  productDetail: ProductDetail
) =>
  getUpdateCasePromise(
    productDetail.isTestUser,
    isCancelled(productDetail.subscription) ? "_CANCELLED" : "_ERROR",
    caseId,
    isCancelled(productDetail.subscription)
      ? {
          Journey__c: "SV - Cancellation - MB",
          Subject: "Online Cancellation Completed"
        }
      : {
          Subject: "Online Cancellation Error",
          Status: "New",
          Priority: "High"
        }
  );

const getCaseUpdateFuncForEscalation = (
  caseId: string,
  escalationCauses: string[],
  isTestUser: boolean
) =>
  getUpdateCasePromise(isTestUser, "_ESCALATED", caseId, {
    Journey__c: "SV - Cancellation - MB",
    Subject: `Online Cancellation MANUAL INTERVENTION REQUIRED - ${escalationCauses.join(
      " & "
    )}`,
    Status: "New",
    Priority: "High"
  });

interface GetCancellationSummaryWithReturnButtonProps {
  startFetch: () => unknown;
  body: ReactNode;
}

const GetCancellationSummaryWithReturnButton = (
  props: GetCancellationSummaryWithReturnButtonProps
) => {
  props.startFetch();

  const { mutate } = useSWRConfig();
  mutate("/api/case/");

  return (
    <div>
      {props.body}
      <div css={{ height: "20px" }} />
      <ReturnToAccountOverviewButton />
    </div>
  );
};

interface GetCaseUpdatingCancellationSummaryProps {
  startFetch: () => unknown;
  caseId: string | "";
  productType: ProductTypeWithCancellationFlow;
  productDetail: ProductDetail;
}

const headers = {
  [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
    window.location.href
  )
};

const GetCaseUpdatingCancellationSummary = (
  props: GetCaseUpdatingCancellationSummaryProps
) => {
  const { productType, caseId, productDetail, startFetch } = props;

  startFetch();
  // response is either empty or 404 from cancelSubscriptionEndpoint - neither is useful so fetch subscription after to determine cancellation result...

  const { endpoint } = createProductDetailEndpoint(productType);
  const productDetails = useSWR([endpoint, headers], fetcher, {
    suspense: true
  }).data as ProductDetail[];

  const productDetailRefetched = productDetails[0] || { subscription: {} };

  if (caseId) {
    const startFetch = useSuspense(
      getCaseUpdateWithCancelOutcomeFunc(caseId, productDetail)
    );

    return (
      <DataFetcher loadingMessage="Finalising your cancellation...">
        <CancellationSummary
          caseId={caseId}
          productDetail={productDetailRefetched}
          productType={productType}
          startFetch={startFetch}
        />
      </DataFetcher>
    );
  } else {
    return (
      <CancellationSummary
        caseId={caseId}
        productDetail={productDetail}
        productType={productType}
      />
    );
  }
};

// TODO consider returning case number from API and displaying
const escalatedConfirmationBody = (
  <p>
    Your cancellation request has been successfully submitted. Our customer
    service team will try their best to contact you as soon as possible to
    confirm the cancellation and refund any credit you are owed.
  </p>
);

const innerContent = (
  productDetail: MembersDataApiItem,
  props: RouteableStepPropsWithCancellationFlow,
  reason: OptionalCancellationReasonId,
  caseId: string
) => (
  <>
    <ProgressIndicator
      steps={[
        { title: "Reason" },
        { title: "Review" },
        { title: "Confirmation", isCurrentStep: true }
      ]}
      additionalCSS={css`
        margin: ${space[5]}px 0 ${space[12]}px;
      `}
    />
    {isProduct(productDetail) ? (
      <CancellationFlowEscalationCheck {...props}>
        {escalationCauses =>
          escalationCauses.length > 0 ? (
            <DataFetcher loadingMessage="Requesting your cancellation">
              <GetCancellationSummaryWithReturnButton
                startFetch={useSuspense(
                  getCaseUpdateFuncForEscalation(
                    caseId,
                    escalationCauses,
                    productDetail.isTestUser
                  )
                )}
                body={escalatedConfirmationBody}
              />
            </DataFetcher>
          ) : (
            <DataFetcher loadingMessage="Performing your cancellation...">
              <GetCaseUpdatingCancellationSummary
                startFetch={useSuspense(
                  getCancelFunc(
                    productDetail.subscription.subscriptionId,
                    reason,
                    createProductDetailFetcher(
                      props.productType,
                      productDetail.subscription.subscriptionId
                    )
                  )
                )}
                caseId={caseId}
                productType={props.productType}
                productDetail={productDetail}
              />
            </DataFetcher>
          )
        }
      </CancellationFlowEscalationCheck>
    ) : (
      <GenericErrorScreen loggingMessage="invalid product detail to cancel" />
    )}
  </>
);

export const ExecuteCancellation = (
  props: RouteableStepPropsWithCancellationFlow
) => (
  <WizardStep routeableStepProps={props}>
    <CancellationReasonContext.Consumer>
      {reason => (
        <CancellationCaseIdContext.Consumer>
          {caseId => (
            <MembersDataApiItemContext.Consumer>
              {productDetail =>
                innerContent(productDetail, props, reason, caseId)
              }
            </MembersDataApiItemContext.Consumer>
          )}
        </CancellationCaseIdContext.Consumer>
      )}
    </CancellationReasonContext.Consumer>
  </WizardStep>
);

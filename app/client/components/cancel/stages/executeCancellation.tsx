import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React, { ReactNode } from "react";
import {
  isProduct, MembersDataApiItem,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../../shared/productResponse";
import {ProductTypeWithCancellationFlow} from "../../../../shared/productTypes";
import {createProductDetailEndpoint} from "../../../productUtils";
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
import {getUpdateCaseEndpoint} from "../caseUpdate";
import DataFetcher from "../../DataFetcher";
import {useSuspenseQuery, Action} from "react-fetching-library";
import {allErrorStatuses, credentialHeaders, fetcher} from "../../../fetchClient";
import useSWR from "swr";

const cancelSubscriptionEndpoint = (subscriptionName: string, reason: OptionalCancellationReasonId): Action<unknown> => ({
  endpoint: "/api/cancel/" + subscriptionName,
    method: "POST",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" },
    ...credentialHeaders,
    config: {
      emitErrorForStatuses: allErrorStatuses
    }
  })

export const getCaseUpdateWithCancelOutcome = (caseId: string, productDetail: ProductDetail):Action<unknown> => getUpdateCaseEndpoint(
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
): Action<unknown> =>
  getUpdateCaseEndpoint(isTestUser, "_ESCALATED", caseId, {
    Journey__c: "SV - Cancellation - MB",
    Subject: `Online Cancellation MANUAL INTERVENTION REQUIRED - ${escalationCauses.join(
      " & "
    )}`,
    Status: "New",
    Priority: "High"
  });

interface GetCancellationSummaryWithReturnButtonProps {
  caseId: string;
  escalationCauses: string[];
  isTestUser: boolean;
  body: ReactNode;
}

const GetCancellationSummaryWithReturnButton = (props: GetCancellationSummaryWithReturnButtonProps) => {
  useSuspenseQuery(getCaseUpdateFuncForEscalation(
    props.caseId,
    props.escalationCauses,
    props.isTestUser
  ));

  return (
  <div>
    {props.body}
    <div css={{ height: "20px" }} />
    <ReturnToAccountOverviewButton />
  </div>
);
}

interface GetCaseUpdatingCancellationSummaryProps {
  caseId: string | "",
  productType: ProductTypeWithCancellationFlow;
  productDetail: ProductDetail;
  reason: OptionalCancellationReasonId;
}

const GetCaseUpdatingCancellationSummary = (props: GetCaseUpdatingCancellationSummaryProps) => {
  const { productDetail, reason, productType, caseId } = props;

  useSuspenseQuery(cancelSubscriptionEndpoint(productDetail.subscription.subscriptionId, reason));
  // response is either empty or 404 from cancelSubscriptionEndpoint - neither is useful so fetch subscription after to determine cancellation result...

  const { endpoint, config } = createProductDetailEndpoint(productType);

  const productDetails = useSWR([endpoint, config], fetcher).data as ProductDetail[];

  const productDetailRefetched = productDetails[0] || { subscription: {} };

  return caseId ? (
    <DataFetcher loadingMessage="Finalising your cancellation...">
      <CancellationSummary caseId={caseId} productDetail={productDetailRefetched} productType={productType} fetch={true} />
    </DataFetcher>
  ) : (
      <CancellationSummary caseId={caseId} productDetail={productDetail} productType={productType}  />
  );
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
              <GetCancellationSummaryWithReturnButton caseId={caseId} escalationCauses={escalationCauses} isTestUser={productDetail.isTestUser} body={escalatedConfirmationBody} />
            </DataFetcher>
          ) : (
            <DataFetcher loadingMessage="Performing your cancellation...">
              <GetCaseUpdatingCancellationSummary caseId={caseId} productDetail={productDetail} reason={reason} productType={props.productType} />
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

import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React, { ReactNode } from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductTypeWithCancellationFlow
} from "../../../../shared/productTypes";
import AsyncLoader from "../../asyncLoader";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { NAV_LINKS } from "../../nav/navConfig";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
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
import { getCancellationSummary, isCancelled } from "../cancellationSummary";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../caseUpdate";

class PerformCancelAsyncLoader extends AsyncLoader<ProductDetail[]> {}

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
  productDetail: ProductDetail
) => () =>
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
) => () =>
  getUpdateCasePromise(isTestUser, "_ESCALATED", caseId, {
    Journey__c: "SV - Cancellation - MB",
    Subject: `Online Cancellation MANUAL INTERVENTION REQUIRED - ${escalationCauses.join(
      " & "
    )}`,
    Status: "New",
    Priority: "High"
  });

const getCancellationSummaryWithReturnButton = (body: ReactNode) => () => (
  <div>
    {body}
    <div css={{ height: "20px" }} />
    <ReturnToAccountOverviewButton />
  </div>
);

const getCaseUpdatingCancellationSummary = (
  caseId: string | "",
  productType: ProductTypeWithCancellationFlow
) => (productDetails: ProductDetail[]) => {
  const productDetail = productDetails[0] || { subscription: {} };
  const render = getCancellationSummaryWithReturnButton(
    getCancellationSummary(productType)(productDetail)
  );
  return caseId ? (
    <CaseUpdateAsyncLoader
      fetch={getCaseUpdateWithCancelOutcomeFunc(caseId, productDetail)}
      render={render}
      loadingMessage="Finalising your cancellation..."
    />
  ) : (
    render()
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
            <CaseUpdateAsyncLoader
              fetch={getCaseUpdateFuncForEscalation(
                caseId,
                escalationCauses,
                productDetail.isTestUser
              )}
              render={getCancellationSummaryWithReturnButton(
                escalatedConfirmationBody
              )}
              loadingMessage="Requesting your cancellation..."
            />
          ) : (
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
              {productDetail => (
                <>
                  <PageHeaderContainer
                    title={`Cancel ${props.productType.friendlyName}`}
                    breadcrumbs={[
                      {
                        title: NAV_LINKS.accountOverview.title,
                        link: NAV_LINKS.accountOverview.link
                      },
                      {
                        title: "Cancel membership",
                        currentPage: true
                      }
                    ]}
                  />
                  <PageNavAndContentContainer
                    selectedNavItem={NAV_LINKS.accountOverview}
                  >
                    {innerContent(productDetail, props, reason, caseId)}
                  </PageNavAndContentContainer>
                </>
              )}
            </MembersDataApiItemContext.Consumer>
          )}
        </CancellationCaseIdContext.Consumer>
      )}
    </CancellationReasonContext.Consumer>
  </WizardStep>
);

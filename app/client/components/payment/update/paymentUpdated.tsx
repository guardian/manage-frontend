import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React from "react";
import {
  augmentInterval,
  formatDate,
  getMainPlan,
  isPaidSubscriptionPlan,
  isProduct,
  MembersDataApiItemContext,
  ProductDetail,
  Subscription,
  WithSubscription
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductType
} from "../../../../shared/productTypes";
import AsyncLoader from "../../asyncLoader";
import { Button, LinkButton } from "../../buttons";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { SpreadTheWordFooter } from "../../footer/in_page/spreadTheWordFooter";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ProgressIndicator } from "../../progressIndicator";
import {
  ReturnToAccountOverviewButton,
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
  NewPaymentMethodDetail
} from "./newPaymentMethodDetail";
import { paymentQuestionsTopicString } from "./updatePaymentFlow";

class WithSubscriptionAsyncLoader extends AsyncLoader<WithSubscription[]> {}

interface ConfirmedNewPaymentDetailsRendererProps {
  subscription: Subscription;
  newPaymentMethodDetail: NewPaymentMethodDetail;
  previousProductDetail: ProductDetail;
}

const ConfirmedNewPaymentDetailsRenderer = ({
  subscription,
  newPaymentMethodDetail,
  previousProductDetail
}: ConfirmedNewPaymentDetailsRendererProps) => {
  const mainPlan = getMainPlan(subscription);
  if (
    newPaymentMethodDetail.subHasExpectedPaymentType(subscription) &&
    isPaidSubscriptionPlan(mainPlan)
  ) {
    return (
      <>
        {newPaymentMethodDetail.render(subscription)}
        {previousProductDetail.alertText &&
        newPaymentMethodDetail.paymentFailureRecoveryMessage ? (
          <div>{newPaymentMethodDetail.paymentFailureRecoveryMessage}</div>
        ) : (
          <>
            {subscription.nextPaymentPrice && subscription.nextPaymentDate && (
              <div>
                <b>Next Payment:</b> {mainPlan.currency}
                {(subscription.nextPaymentPrice / 100.0).toFixed(2)} on{" "}
                {formatDate(subscription.nextPaymentDate)}
              </div>
            )}
            <div>
              <b>Payment Frequency:</b> {augmentInterval(mainPlan.interval)}
            </div>
          </>
        )}
        <div>{newPaymentMethodDetail.updatedSuccessExtras}</div>
      </>
    );
  }

  return <GenericErrorScreen loggingMessage="Unsupported new payment method" />; // unsupported operation currently
};

const WithSubscriptionRenderer = (
  productType: ProductType,
  newPaymentMethodDetail: NewPaymentMethodDetail,
  previousProductDetail: ProductDetail
) => (subs: WithSubscription[]) =>
  subs && subs.length === 1 ? (
    <>
      <h1>Your payment details were updated successfully</h1>
      <ConfirmedNewPaymentDetailsRenderer
        subscription={subs[0].subscription}
        newPaymentMethodDetail={newPaymentMethodDetail}
        previousProductDetail={previousProductDetail}
      />
      <h2>Thank you. You are helping to support independent journalism.</h2>
      <div>
        <LinkButton
          to={"/" + productType.urlPart}
          text={"Manage your " + productType.friendlyName}
          primary
          right
        />
      </div>
      <div css={{ marginTop: "20px" }}>
        <a href="https://www.theguardian.com">
          <Button text="Explore The Guardian" primary right />
        </a>
      </div>
    </>
  ) : (
    <>
      <GenericErrorScreen
        loggingMessage={`${subs.length} subs returned when one was expected`}
      />
      <ReturnToAccountOverviewButton />
    </>
  );

export const PaymentUpdated = (props: RouteableStepProps) => {
  const innerContent = (
    previousProductDetail: ProductDetail,
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => (
    <>
      <ProgressIndicator
        steps={[
          { title: "New details" },
          { title: "Review" },
          { title: "Confirmation", isCurrentStep: true }
        ]}
        additionalCSS={css`
          margin: ${space[5]}px 0 ${space[12]}px;
        `}
      />
      <WithSubscriptionAsyncLoader
        fetch={createProductDetailFetcher(
          props.productType,
          previousProductDetail.subscription.subscriptionId
        )}
        render={WithSubscriptionRenderer(
          props.productType,
          newPaymentMethodDetail,
          previousProductDetail
        )}
        loadingMessage="Looks good so far. Just checking everything is done..."
      />
    </>
  );
  return (
    <MembersDataApiItemContext.Consumer>
      {previousProductDetail => (
        <NewPaymentMethodContext.Consumer>
          {newPaymentMethodDetail =>
            isNewPaymentMethodDetail(newPaymentMethodDetail) &&
            isProduct(previousProductDetail) ? (
              <WizardStep
                routeableStepProps={props}
                extraFooterComponents={[
                  <QuestionsFooter
                    key="questions"
                    topic={paymentQuestionsTopicString}
                  />,
                  <SpreadTheWordFooter key="share" />
                ]}
              >
                <PageHeaderContainer title="Manage payment method" />
                <PageNavAndContentContainer
                  selectedNavItem={navLinks.accountOverview}
                >
                  {innerContent(previousProductDetail, newPaymentMethodDetail)}
                </PageNavAndContentContainer>
              </WizardStep>
            ) : (
              visuallyNavigateToParent(props)
            )
          }
        </NewPaymentMethodContext.Consumer>
      )}
    </MembersDataApiItemContext.Consumer>
  );
};

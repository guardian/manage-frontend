import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
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
import { ProductType } from "../../../../shared/productTypes";
import { createProductDetailFetcher } from "../../../productUtils";
import AsyncLoader from "../../asyncLoader";
import { Button, LinkButton } from "../../buttons";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { NAV_LINKS } from "../../nav/navConfig";
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
  previousProductDetail: ProductDetail,
  flowReferrer?: { title: string; link: string }
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
        {flowReferrer?.title === NAV_LINKS.billing.title ? (
          <LinkButton
            to={flowReferrer?.link}
            text="Return to your billing"
            colour={neutral[100]}
            textColour={neutral[0]}
            hollow
            left
          />
        ) : (
          <LinkButton
            to={"/" + productType.urlPart}
            text={"Manage your " + productType.friendlyName}
            primary
            right
          />
        )}
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
          previousProductDetail,
          props.location?.state?.flowReferrer
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
              <WizardStep routeableStepProps={props}>
                {innerContent(previousProductDetail, newPaymentMethodDetail)}
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

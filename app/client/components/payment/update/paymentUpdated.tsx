import React from "react";
import {
  formatDate,
  hasProduct,
  MembersDataApiResponseContext,
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
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../../wizardRouterAdapter";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
  NewPaymentMethodDetail
} from "./newPaymentMethodDetail";
import { labelPaymentStepProps } from "./updatePaymentFlow";

export const handleNoNewPaymentDetails = (props: RouteableStepProps) => {
  if (props.navigate) {
    props.navigate("..", { replace: true }); // step back up a level
    return null;
  }
  return (
    <GenericErrorScreen loggingMessage="No navigate function - very odd" />
  );
};

export class WithSubscriptionAsyncLoader extends AsyncLoader<
  WithSubscription[]
> {}

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
  if (newPaymentMethodDetail.subHasExpectedPaymentType(subscription)) {
    return (
      <>
        {newPaymentMethodDetail.render(subscription)}
        {previousProductDetail.alertText &&
        newPaymentMethodDetail.paymentFailureRecoveryMessage ? (
          <div>{newPaymentMethodDetail.paymentFailureRecoveryMessage}</div>
        ) : (
          <>
            {subscription.nextPaymentPrice && subscription.nextPaymentDate ? (
              <div>
                <b>Next Payment:</b> {subscription.plan.currency}
                {(subscription.nextPaymentPrice / 100.0).toFixed(2)} on{" "}
                {formatDate(subscription.nextPaymentDate)}
              </div>
            ) : (
              undefined
            )}
            <div>
              <b>Payment Frequency:</b> {subscription.plan.interval}ly
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
      <h2>
        Thank you. You are helping to support independent investigative
        journalism.
      </h2>
      <div>
        <LinkButton
          to={"/" + productType.urlPart}
          text={"Manage your " + productType.friendlyName}
          maxWidthIfWrapping="230px"
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
      <ReturnToYourProductButton productType={productType} />
    </>
  );

export const PaymentUpdated = (props: RouteableStepProps) => (
  <MembersDataApiResponseContext.Consumer>
    {previousProductDetail => (
      <NewPaymentMethodContext.Consumer>
        {newPaymentMethodDetail =>
          isNewPaymentMethodDetail(newPaymentMethodDetail) &&
          hasProduct(previousProductDetail) ? (
            <WizardStep
              routeableStepProps={labelPaymentStepProps(props)}
              extraFooterComponents={[
                <QuestionsFooter key="questions" />,
                <SpreadTheWordFooter key="share" />
              ]}
              hideBackButton
            >
              <WithSubscriptionAsyncLoader
                fetch={createProductDetailFetcher(
                  props.productType,
                  previousProductDetail.subscription.subscriberId
                )}
                render={WithSubscriptionRenderer(
                  props.productType,
                  newPaymentMethodDetail,
                  previousProductDetail
                )}
                loadingMessage="Looks good so far. Just checking everything is done..."
              />
            </WizardStep>
          ) : (
            handleNoNewPaymentDetails(props)
          )
        }
      </NewPaymentMethodContext.Consumer>
    )}
  </MembersDataApiResponseContext.Consumer>
);

import React from "react";
import {
  formatDate,
  hasProduct,
  MembersDataApiResponseContext,
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
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
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
  WithSubscription
> {}

interface ConfirmedNewPaymentDetailsRendererProps {
  subscription: Subscription;
  newPaymentMethodDetail: NewPaymentMethodDetail;
}

const ConfirmedNewPaymentDetailsRenderer = ({
  subscription,
  newPaymentMethodDetail
}: ConfirmedNewPaymentDetailsRendererProps) => {
  if (newPaymentMethodDetail.subHasExpectedPaymentType(subscription)) {
    return (
      <>
        {newPaymentMethodDetail.render(subscription)}
        <MembersDataApiResponseContext.Consumer>
          {membersDataApiResponse =>
            hasProduct(membersDataApiResponse) &&
            membersDataApiResponse.alertText &&
            newPaymentMethodDetail.paymentFailureRecoveryMessage ? (
              <div>{newPaymentMethodDetail.paymentFailureRecoveryMessage}</div>
            ) : (
              <>
                {subscription.nextPaymentPrice &&
                subscription.nextPaymentDate ? (
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
            )
          }
        </MembersDataApiResponseContext.Consumer>
        <div>{newPaymentMethodDetail.updatedSuccessExtras}</div>
      </>
    );
  }

  return <GenericErrorScreen loggingMessage="Unsupported new payment method" />; // unsupported operation currently
};

const WithSubscriptionRenderer = (
  productType: ProductType,
  newPaymentMethodDetail: NewPaymentMethodDetail
) => (withSub: WithSubscription) => (
  <>
    <h1>Your payment details were updated successfully</h1>
    <ConfirmedNewPaymentDetailsRenderer
      subscription={withSub.subscription}
      newPaymentMethodDetail={newPaymentMethodDetail}
    />
    <h2>
      Thank you. You are helping to support independent investigative
      journalism.
    </h2>
    <div>
      {productType.alternateReturnToAccountDestination ? (
        <a href={productType.alternateReturnToAccountDestination}>
          <Button
            text={"Manage your " + productType.friendlyName}
            maxWidthIfWrapping="230px"
            primary
            right
          />
        </a>
      ) : (
        <LinkButton
          to={"/" + productType.urlPart}
          text={"Manage your " + productType.friendlyName}
          maxWidthIfWrapping="230px"
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
);

export const PaymentUpdated = (props: RouteableStepProps) => (
  <NewPaymentMethodContext.Consumer>
    {newPaymentMethodDetail =>
      isNewPaymentMethodDetail(newPaymentMethodDetail) ? (
        <WizardStep
          routeableStepProps={labelPaymentStepProps(props)}
          extraFooterComponents={[
            <QuestionsFooter key="questions" />,
            <SpreadTheWordFooter key="share" />
          ]}
          hideBackButton
        >
          <WithSubscriptionAsyncLoader
            fetch={createProductDetailFetcher(props.productType)}
            render={WithSubscriptionRenderer(
              props.productType,
              newPaymentMethodDetail
            )}
            loadingMessage="Looks good so far. Just checking everything is done..."
          />
        </WizardStep>
      ) : (
        handleNoNewPaymentDetails(props)
      )
    }
  </NewPaymentMethodContext.Consumer>
);

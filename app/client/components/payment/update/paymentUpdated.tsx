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
import { CardDisplay } from "../cardDisplay";
import { StripeTokenResponseContext } from "./cardInputForm";
import { labelPaymentStepProps } from "./updatePaymentFlow";

export const handleNoToken = (props: RouteableStepProps) => {
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

const ConfirmedNewPaymentDetailsRenderer = (subscription: Subscription) => {
  if (subscription.card) {
    return (
      <>
        <CardDisplay {...subscription.card} />
        <MembersDataApiResponseContext.Consumer>
          {membersDataApiResponse =>
            hasProduct(membersDataApiResponse) &&
            membersDataApiResponse.alertText ? (
              <div>
                We will take the outstanding payment within 24 hours, using your
                new card details.
              </div>
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
      </>
    );
  }

  return <GenericErrorScreen loggingMessage="Unsupported new payment method" />; // unsupported operation currently
};

const WithSubscriptionRenderer = (productType: ProductType) => (
  withSub: WithSubscription
) => (
  <>
    <h1>Your payment details were updated successfully</h1>
    <ConfirmedNewPaymentDetailsRenderer {...withSub.subscription} />
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
  <StripeTokenResponseContext.Consumer>
    {tokenResponse =>
      tokenResponse.token && tokenResponse.token.card ? (
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
            render={WithSubscriptionRenderer(props.productType)}
            loadingMessage="Looks good so far. Just checking everything is done..."
          />
        </WizardStep>
      ) : (
        handleNoToken(props)
      )
    }
  </StripeTokenResponseContext.Consumer>
);

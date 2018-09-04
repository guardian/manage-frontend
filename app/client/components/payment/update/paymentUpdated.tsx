import React from "react";
import AsyncLoader from "../../asyncLoader";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { formatDate, Subscription, WithSubscription } from "../../user";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CardDisplay } from "../cardDisplay";
import { StripeTokenResponseContext } from "./cardInputForm";

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
        <div>
          <b>Next Payment:</b> {subscription.plan.currency}
          {(subscription.nextPaymentPrice / 100.0).toFixed(2)} on{" "}
          {formatDate(subscription.nextPaymentDate)}
        </div>
        <div>
          <b>Payment Frequency:</b> {subscription.plan.interval}ly
        </div>
      </>
    );
  }

  return <GenericErrorScreen loggingMessage="Unsupported new payment method" />; // unsupported operation currently
};

const WithSubscriptionRenderer = (withSub: WithSubscription) => (
  <>
    <h1>Your payment details were updated successfully</h1>
    <ConfirmedNewPaymentDetailsRenderer {...withSub.subscription} />
    <h2>
      Thank you. You are helping to support independent investigative journalism
    </h2>
  </>
);

export interface PaymentUpdatedProps extends RouteableStepProps {
  fetch: () => Promise<Response>;
}

export const PaymentUpdated = (props: PaymentUpdatedProps) => (
  <StripeTokenResponseContext.Consumer>
    {tokenResponse =>
      tokenResponse.token && tokenResponse.token.card ? (
        <WizardStep routeableStepProps={props}>
          <WithSubscriptionAsyncLoader
            fetch={props.fetch}
            render={WithSubscriptionRenderer}
            loadingMessage="Looks good so far. Just checking everything is done..."
          />
        </WizardStep>
      ) : (
        handleNoToken(props)
      )
    }
  </StripeTokenResponseContext.Consumer>
);

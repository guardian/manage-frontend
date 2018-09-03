import React from "react";
import AsyncLoader from "../../asyncLoader";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { Subscription, WithSubscription } from "../../user";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CardDisplay } from "../cardDisplay";
import { StripeTokenResponseContext } from "./cardInputForm";

export const handleNoToken = (props: RouteableStepProps) => {
  if (props.navigate) {
    props.navigate("..", { replace: true }); // step back up a level
    return null;
  }
  return <GenericErrorScreen />;
};

export class WithSubscriptionAsyncLoader extends AsyncLoader<
  WithSubscription
> {}

const ConfirmedNewPaymentDetailsRenderer = (subscription: Subscription) => {
  if (subscription.card) {
    return <CardDisplay {...subscription.card} />;
  }

  return <GenericErrorScreen />; // unsupported operation currently
};

const WithSubscriptionRenderer = (withSub: WithSubscription) => (
  <>
    <h2>Payment details successfully updated</h2>
    Going forward your payment details are...
    <ConfirmedNewPaymentDetailsRenderer {...withSub.subscription} />
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

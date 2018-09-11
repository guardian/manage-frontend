import React from "react";
import AsyncLoader from "../../asyncLoader";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { SpreadTheWordFooter } from "../../footer/in_page/spreadTheWordFooter";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { hasMembership } from "../../membership";
import {
  formatDate,
  MembersDataApiResponseContext,
  Subscription,
  WithSubscription
} from "../../user";
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
        <MembersDataApiResponseContext.Consumer>
          {membersDataApiResponse =>
            hasMembership(membersDataApiResponse) &&
            membersDataApiResponse.alertText ? (
              <div>
                To resolve the previous payment failure we will retry the charge
                within the next 24 hours.
              </div>
            ) : (
              <>
                <div>
                  <b>Next Payment:</b> {subscription.plan.currency}
                  {(subscription.nextPaymentPrice / 100.0).toFixed(2)} on{" "}
                  {formatDate(subscription.nextPaymentDate)}
                </div>
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
        <WizardStep
          routeableStepProps={props}
          extraFooterComponents={[
            <QuestionsFooter key="questions" />,
            <SpreadTheWordFooter key="share" />
          ]}
          hideReturnButton
        >
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

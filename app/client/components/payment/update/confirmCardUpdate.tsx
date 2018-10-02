import Raven from "raven-js";
import React from "react";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { hasMembership } from "../../membership";
import { MembersDataApiResponseContext } from "../../user";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CardDisplay } from "../cardDisplay";
import { StripeTokenResponseContext } from "./cardInputForm";
import {
  CardUpdateAsyncLoader,
  CardUpdateResponse
} from "./cardUpdateAsyncLoader";
import { CurrentPaymentDetails } from "./currentPaymentDetails";
import { handleNoToken } from "./paymentUpdated";
import { labelPaymentStepProps } from "./updatePaymentFlow";

interface ExecuteCardUpdateProps extends RouteableStepProps {
  stripePublicKeyForUpdate: string;
  token: stripe.Token;
}

interface ExecuteCardUpdateState {
  hasHitComplete: boolean;
}

class ExecuteCardUpdate extends React.Component<
  ExecuteCardUpdateProps,
  ExecuteCardUpdateState
> {
  public state = {
    hasHitComplete: false
  };

  public render(): React.ReactNode {
    return this.state.hasHitComplete ? (
      <CardUpdateAsyncLoader
        fetch={this.executeCardUpdate}
        render={this.renderCardUpdateResponse}
        errorRender={this.PaymentUpdateFailed}
        loadingMessage="Updating payment card details..."
        spinnerScale={0.7}
        inline
      />
    ) : (
      <Button
        text="Complete Payment Update"
        onClick={() => this.setState({ hasHitComplete: true })}
        primary
        right
      />
    );
  }

  private executeCardUpdate: () => Promise<Response> = async () =>
    await fetch("/api/payment/membership/card", {
      // TODO perhaps get 'membership' from product type / url
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        stripeToken: this.props.token.id,
        publicKey: this.props.stripePublicKeyForUpdate
      }),
      headers: { "Content-Type": "application/json" }
    });

  private renderCardUpdateResponse = (response: CardUpdateResponse) => {
    if (
      this.props.navigate &&
      this.props.token.card &&
      response.last4 === this.props.token.card.last4
    ) {
      trackEvent({
        eventCategory: "payment",
        eventAction: "card_update_success"
      });
      this.props.navigate("updated", { replace: true });
      return null;
    }

    return this.PaymentUpdateFailed();
  };

  private PaymentUpdateFailed = () => {
    trackEvent({
      eventCategory: "payment",
      eventAction: "card_update_failed"
    });

    Raven.captureException("payment card update failed");

    return (
      <div css={{ textAlign: "left", marginTop: "10px" }}>
        <h2>Sorry, the card update failed.</h2>
        <p>
          To try again please go back and re-enter your new card details.
          Alternatively, please call to speak to one of our customer service
          specialists.
        </p>
        <CallCentreNumbers prefixText="To contact us" />
      </div>
    );
  };
}

export const ConfirmCardUpdate = (props: RouteableStepProps) => (
  <StripeTokenResponseContext.Consumer>
    {tokenResponse => (
      <MembersDataApiResponseContext.Consumer>
        {mdaResponse =>
          props.navigate &&
          tokenResponse.token &&
          tokenResponse.token.card &&
          hasMembership(mdaResponse) &&
          mdaResponse.subscription.card ? (
            <WizardStep
              routeableStepProps={labelPaymentStepProps(props)}
              backButtonLevelsUp
              hollowReturnButton
              extraFooterComponents={<QuestionsFooter />}
            >
              <h3>Please confirm your change from...</h3>
              <CurrentPaymentDetails {...mdaResponse.subscription} />
              <h3>...to...</h3>
              <CardDisplay
                last4={tokenResponse.token.card.last4}
                type={tokenResponse.token.card.brand}
              />
              <div css={{ margin: "20px 0", textAlign: "right" }}>
                <ExecuteCardUpdate
                  {...props}
                  stripePublicKeyForUpdate={
                    mdaResponse.subscription.card.stripePublicKeyForUpdate
                  }
                  token={tokenResponse.token}
                />
              </div>
            </WizardStep>
          ) : (
            handleNoToken(props)
          )
        }
      </MembersDataApiResponseContext.Consumer>
    )}
  </StripeTokenResponseContext.Consumer>
);

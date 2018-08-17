import { NavigateFn } from "@reach/router";
import React from "react";
import {
  CardCVCElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  injectStripe,
  ReactStripeElements,
  StripeProvider
} from "react-stripe-elements";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { Spinner } from "../../spinner";
import { NavigateFnContext } from "./updatePaymentFlow";

export const StripeTokenResponseContext: React.Context<
  ReactStripeElements.PatchedTokenResponse
> = React.createContext({});

interface StripeCardInputFormProps
  extends ReactStripeElements.InjectedStripeProps {
  stripeTokenUpdater: (
    stripeTokenResponse: ReactStripeElements.PatchedTokenResponse
  ) => void;
}

interface StripeCardInputFormState {
  isGeneratingToken: boolean;
}

class StripeCardInputForm extends React.Component<
  StripeCardInputFormProps,
  StripeCardInputFormState
> {
  public state = {
    isGeneratingToken: false
  };

  public render(): React.ReactNode {
    return this.props.stripe ? (
      <div css={{ textAlign: "right" }}>
        <div className="checkout" css={{ margin: "20px" }}>
          <CardElement
            hidePostalCode
            style={{
              base: {
                fontSize: "18px",
                fontFamily: sans
              }
            }}
          />
          {/*TODO find some way to lock these based on this.state.isGeneratingToken*/}
        </div>
        {this.state.isGeneratingToken ? (
          <Spinner
            loadingMessage="Validating your card detail..."
            scale={0.7}
            inline
          />
        ) : (
          <NavigateFnContext.Consumer>
            {nav =>
              nav.navigate ? (
                <Button
                  color={palette.neutral["1"]}
                  textColor={palette.white}
                  disabled={
                    this.props.stripe ===
                    undefined /*TODO add validation check on CardElement*/
                  }
                  text="Review Payment Update"
                  onClick={this.startCardUpdate(nav.navigate)}
                />
              ) : (
                <GenericErrorScreen />
              )
            }
          </NavigateFnContext.Consumer>
        )}
      </div>
    ) : (
      <GenericErrorScreen />
    );
  }

  private setInProgress = (value: boolean) =>
    this.setState({ isGeneratingToken: value });

  private startCardUpdate = (navigate: NavigateFn) => async () => {
    this.setInProgress(true);
    if (this.props.stripe) {
      const tokenResponse = await this.props.stripe.createToken(); // TODO check whether we need any token options
      if (tokenResponse.token && tokenResponse.token.card) {
        this.props.stripeTokenUpdater(tokenResponse);
        navigate("confirm");
      } else {
        if (tokenResponse.error) {
          // TODO handle error
        }
        this.setInProgress(false);
      }
    }
  };
}

const InjectedStripeCardInputForm = injectStripe(StripeCardInputForm);

export interface CardInputFormProps {
  stripeApiKey: string;
  stripeTokenUpdater: (
    stripeTokenResponse: ReactStripeElements.PatchedTokenResponse
  ) => void;
}

// TODO https://github.com/stripe/react-stripe-elements#loading-stripejs-asynchronously
export const CardInputForm = (props: CardInputFormProps) => (
  <StripeProvider apiKey={props.stripeApiKey}>
    <Elements>
      <InjectedStripeCardInputForm
        stripeTokenUpdater={props.stripeTokenUpdater}
      />
    </Elements>
  </StripeProvider>
);

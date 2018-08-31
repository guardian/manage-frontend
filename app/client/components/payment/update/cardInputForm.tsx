import React from "react";
import {
  Elements,
  injectStripe,
  ReactStripeElements,
  StripeProvider
} from "react-stripe-elements";
import { StripeCardInputForm } from "./stripeCardInputForm";

export const StripeTokenResponseContext: React.Context<
  ReactStripeElements.PatchedTokenResponse
> = React.createContext({});

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

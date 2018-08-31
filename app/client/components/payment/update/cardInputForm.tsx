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

interface WindowWithStripe extends Window {
  Stripe: any;
}

declare let window: WindowWithStripe;

export class CardInputForm extends React.Component<CardInputFormProps, {}> {
  public state = { stripe: null };

  public componentDidMount(): void {
    // Create Stripe instance in componentDidMount
    // https://github.com/stripe/react-stripe-elements#server-side-rendering-ssr
    this.setState({ stripe: window.Stripe(this.props.stripeApiKey) });
  }

  public render(): JSX.Element {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <InjectedStripeCardInputForm {...this.props} />
        </Elements>
      </StripeProvider>
    );
  }
}

import React from "react";
import { Elements, injectStripe, StripeProvider } from "react-stripe-elements";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import { StripeCardInputForm } from "./stripeCardInputForm";

const InjectedStripeCardInputForm = injectStripe(StripeCardInputForm);

interface WindowWithStripe extends Window {
  Stripe: any;
}

declare let window: WindowWithStripe;

export interface CardInputFormProps {
  stripeApiKey: string;
  userEmail?: string;
  newPaymentMethodDetailUpdater: (
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => void;
}

export interface CardInputFormState {
  stripe?: stripe.Stripe;
}

export class CardInputForm extends React.Component<
  CardInputFormProps,
  CardInputFormState
> {
  public state: CardInputFormState = {};

  public componentDidMount(): void {
    if (window.Stripe) {
      // prevents multiple loading of Stripe.js
      this.updateStripeStateFromWindow();
    } else {
      const script = document.createElement("script");
      script.setAttribute("src", "https://js.stripe.com/v3/");
      script.addEventListener("load", this.updateStripeStateFromWindow);
      document.head.appendChild(script);
    }
  }

  public render(): JSX.Element {
    return (
      <StripeProvider stripe={this.state.stripe || null}>
        <Elements
          fonts={[
            {
              src:
                "url(https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2)",
              family: "Guardian Text Sans Web",
              style: "normal"
            }
          ]}
        >
          <InjectedStripeCardInputForm {...this.props} />
        </Elements>
      </StripeProvider>
    );
  }

  private updateStripeStateFromWindow = () =>
    this.setState({ stripe: window.Stripe(this.props.stripeApiKey) });
}

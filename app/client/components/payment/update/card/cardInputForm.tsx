import Raven from "raven-js";
import React from "react";
import { Elements, injectStripe, StripeProvider } from "react-stripe-elements";
import {
  STRIPE_PUBLIC_KEY_HEADER,
  StripeSetupIntent
} from "../../../../../shared/stripeSetupIntent";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import {
  StripeCardInputForm,
  StripeSetupIntentDetails
} from "./stripeCardInputForm";

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

export interface CardInputFormState extends StripeSetupIntentDetails {
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

    fetch("/api/payment/card", {
      method: "POST",
      credentials: "include",
      headers: {
        [STRIPE_PUBLIC_KEY_HEADER]: this.props.stripeApiKey
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      const locationHeaderValue = response.headers.get("Location");
      if (response.status === 401 && locationHeaderValue) {
        window.location.replace(locationHeaderValue);
        return;
      } else {
        throw new Error(
          `Failed to load SetupIntent : ${response.status} ${
            response.statusText
            } : ${response.text()}`
        );
      }
    })
    .then((setupIntent: StripeSetupIntent) =>
      this.setState({ stripeSetupIntent: setupIntent })
    )
    .catch(error => {
      Raven.captureException(error);
      this.setState({ stripeSetupIntentError: error });
    });
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
          <InjectedStripeCardInputForm {...this.props} {...this.state} />
        </Elements>
      </StripeProvider>
    );
  }

  private updateStripeStateFromWindow = () =>
    this.setState({ stripe: window.Stripe(this.props.stripeApiKey) });
}

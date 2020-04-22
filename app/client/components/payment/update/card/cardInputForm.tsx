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

declare let window: Window & {
  Stripe: any;
  grecaptcha: any;
  v2ReCaptchaOnLoadCallback: () => void;
};

const hrefStyle = {
  textDecoration: "underline",
  color: "inherit",
  ":visited": { color: "inherit" }
};

export interface CardInputFormProps {
  stripeApiKey: string;
  userEmail?: string;
  newPaymentMethodDetailUpdater: (
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => void;
}

export interface CardInputFormState extends StripeSetupIntentDetails {
  stripe?: stripe.Stripe;
  didCompleteRecaptcha?: true;
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

    if (window.grecaptcha) {
      this.renderReCaptcha();
    } else {
      const script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js?onload=v2ReCaptchaOnLoadCallback&render=explicit"
      );
      // tslint:disable-next-line:no-object-mutation
      window.v2ReCaptchaOnLoadCallback = this.renderReCaptcha;
      document.head.appendChild(script);
    }
  }

  public render(): JSX.Element {
    return this.state.didCompleteRecaptcha ? (
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
    ) : (
      <div css={{ marginBottom: "30px" }}>
        <p>
          Before entering new card details please confirm you're not a robot
          below to help us prevent card fraud. By ticking this box, you agree to
          let Google perform a security check to confirm you are a human. Please
          refer to their{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            css={hrefStyle}
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            css={hrefStyle}
          >
            Privacy
          </a>{" "}
          policies.
        </p>
        <div id="recaptcha" />
      </div>
    );
  }

  private renderReCaptcha = () =>
    window.grecaptcha.render("recaptcha", {
      sitekey: window.guardian?.recaptchaPublicKey,
      callback: (recaptchaToken: string) =>
        // 1sec delay is so the user see's the green tick for a short period before proceeding
        setTimeout(() => this.loadSetupIntent(recaptchaToken), 1000)
    });

  private loadSetupIntent = (recaptchaToken: string) => {
    this.setState({ didCompleteRecaptcha: true });

    fetch("/api/payment/card", {
      method: "POST",
      credentials: "include",
      headers: {
        [STRIPE_PUBLIC_KEY_HEADER]: this.props.stripeApiKey
      },
      body: recaptchaToken
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
  };

  private updateStripeStateFromWindow = () =>
    this.setState({ stripe: window.Stripe(this.props.stripeApiKey) });
}

import * as Sentry from "@sentry/browser";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import {
  STRIPE_PUBLIC_KEY_HEADER,
  StripeSetupIntent
} from "../../../../../shared/stripeSetupIntent";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import { StripeCardInputForm } from "./stripeCardInputForm";

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

export const CardInputForm = (props: CardInputFormProps) => {
  const [didCompleteRecaptcha, setDidCompleteRecaptcha] = useState<boolean>(
    false
  );
  const [stripeSetupIntent, setStripeSetupIntent] = useState<
    StripeSetupIntent
  >();
  const [stripeSetupIntentError, setstripeSetupIntentError] = useState<Error>();

  const [
    stripePromise,
    setStripePromise
  ] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    if (window.grecaptcha) {
      renderReCaptcha();
    } else {
      const script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js?onload=v2ReCaptchaOnLoadCallback&render=explicit"
      );
      // tslint:disable-next-line:no-object-mutation
      window.v2ReCaptchaOnLoadCallback = renderReCaptcha;
      document.head.appendChild(script);
    }
  }, []);

  const renderReCaptcha = () => {
    window.grecaptcha.render("recaptcha", {
      sitekey: window.guardian?.recaptchaPublicKey,
      callback: (recaptchaToken: string) =>
        // 1sec delay is so the user see's the green tick for a short period before proceeding
        setTimeout(() => loadSetupIntent(recaptchaToken), 1000)
    });
  };

  const loadStripe = () => {
    import("@stripe/stripe-js").then(StripeAsync => {
      setStripePromise(StripeAsync.loadStripe(props.stripeApiKey));
    });
  };

  const loadSetupIntent = (recaptchaToken: string) => {
    if (stripePromise === null) {
      loadStripe();
    }

    setDidCompleteRecaptcha(true);

    fetch("/api/payment/card", {
      method: "POST",
      credentials: "include",
      headers: {
        [STRIPE_PUBLIC_KEY_HEADER]: props.stripeApiKey
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
        setStripeSetupIntent(setupIntent)
      )
      .catch(error => {
        Sentry.captureException(error);
        setstripeSetupIntentError(error);
      });
  };

  return didCompleteRecaptcha ? (
    <Elements
      stripe={stripePromise}
      options={{
        fonts: [
          {
            src:
              "url(https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2)",
            family: "Guardian Text Sans Web",
            style: "normal"
          }
        ]
      }}
    >
      <StripeCardInputForm
        {...props}
        {...{
          didCompleteRecaptcha,
          stripeSetupIntent,
          stripeSetupIntentError
        }}
      />
    </Elements>
  ) : (
    <div css={{ marginBottom: "30px" }}>
      <p>
        Before entering new card details please confirm you're not a robot below
        to help us prevent card fraud. By ticking this box, you agree to let
        Google perform a security check to confirm you are a human. Please refer
        to their{" "}
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
};

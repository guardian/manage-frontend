import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import { space } from "@guardian/src-foundations";
import React, { useEffect, useState } from "react";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import { StripeCardInputForm } from "./stripeCardInputForm";
import { useStripeSDK } from "../../../../stripe";

declare let window: Window & {
  Stripe: Stripe;
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
  executePaymentUpdate: (
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => Promise<unknown>;
}

export const CardInputForm = (props: CardInputFormProps) => {
  const stripePromise = useStripeSDK(props.stripeApiKey);

  const [recaptchaToken, setRecaptchaToken] = useState<string | undefined>(
    undefined
  );

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
      callback: (recaptchaToken: string) => setRecaptchaToken(recaptchaToken),
      "expired-callback": () => setRecaptchaToken(undefined)
    });
  };

  return (
    <>
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
        <StripeCardInputForm {...props} recaptchaToken={recaptchaToken} />
      </Elements>
      <div css={{ marginBottom: "30px" }}>
        <span
          css={css`
            margin-bottom: ${space[3]}px;
            ${textSans.medium({ fontWeight: "bold" })};
          `}
        >
          Security check
        </span>
        <div id="recaptcha" />
        <p
          css={css`
            width: 300px;
            margin-top: ${space[3]}px;
            ${textSans.xsmall()}
          `}
        >
          By ticking this box, you agree to let Google perform a security check
          to confirm you are a human. Please refer to their{" "}
          <a
            href="https://policies.google.com/terms"
            rel="noreferrer"
            target="_blank"
            css={hrefStyle}
          >
            terms
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/privacy"
            rel="noreferrer"
            target="_blank"
            css={hrefStyle}
          >
            privacy
          </a>{" "}
          policies.
        </p>
      </div>
    </>
  );
};

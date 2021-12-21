import React, { useEffect } from "react";
import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import { space } from "@guardian/src-foundations";
import { Stripe } from "@stripe/stripe-js";

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

export interface RecaptchaProps {
  setStripeSetupIntent: (_: null) => void;
  setRecaptchaToken: (_: string) => void;
}

export default function Recaptcha({
  setStripeSetupIntent,
  setRecaptchaToken
}: RecaptchaProps) {
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
      "expired-callback": () => setStripeSetupIntent(null)
    });
  };

  return (
    <div css={{ marginBottom: `${space[9]}px` }}>
      <span
        css={css`
          ${textSans.medium({ fontWeight: "bold" })};
        `}
      >
        Security check
      </span>
      <div
        css={{
          marginTop: "4px"
        }}
        id="recaptcha"
      />

      <p
        css={css`
          width: 300px;
          margin-top: ${space[3]}px;
          ${textSans.xsmall()}
        `}
      >
        By ticking this box, you agree to let Google perform a security check to
        confirm you are a human. Please refer to their{" "}
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
  );
}

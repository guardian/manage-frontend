import * as Sentry from "@sentry/browser";
import {
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { StripeElementBase } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import {
  STRIPE_PUBLIC_KEY_HEADER,
  StripeSetupIntent
} from "../../../../../shared/stripeSetupIntent";
import { maxWidth } from "../../../../styles/breakpoints";
import { validationWarningCSS } from "../../../../styles/fonts";
import { Button } from "../../../buttons";
import { GenericErrorScreen } from "../../../genericErrorScreen";
import { Spinner } from "../../../spinner";
import { CardInputFormProps } from "./cardInputForm";
import { FlexCardElement } from "./flexCardElement";
import {
  NewCardPaymentMethodDetail,
  StripePaymentMethod
} from "./newCardPaymentMethodDetail";

export interface StripeSetupIntentDetails {
  stripeSetupIntent?: StripeSetupIntent;
  stripeSetupIntentError?: Error;
}

interface StripeCardInputFormProps
  extends CardInputFormProps,
    StripeSetupIntentDetails {
  recaptchaToken?: string;
}

interface StripeInputFormError {
  code?: string;
  message?: string;
  type?: string;
}

export const StripeCardInputForm = (props: StripeCardInputFormProps) => {
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [
    stripeSetupIntent,
    setStripeSetupIntent
  ] = useState<StripeSetupIntent | null>();
  const [stripeSetupIntentError, setStripeSetupIntentError] = useState<Error>();

  const [cardNumberElement, setCardNumberElement] = useState<
    undefined | StripeElementBase
  >();
  const [cardExpiryElement, setCardExpiryElement] = useState<
    undefined | StripeElementBase
  >();
  const [cardCVCElement, setCardCVCElement] = useState<
    undefined | StripeElementBase
  >();

  const [error, setError] = useState<StripeInputFormError>({});
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    setStripeSetupIntent(null);
  }, [props.recaptchaToken]);

  const cardFormIsLoaded = () => {
    return stripe && cardNumberElement && cardExpiryElement && cardCVCElement;
  };

  const renderError = () => {
    if (error && error.message) {
      return (
        <div
          css={{
            ...validationWarningCSS,
            marginTop: "5px",
            width: "100%",
            textAlign: "right"
          }}
        >
          {error.message
            .split(".")
            .filter(_ => _.trim().length)
            .map((sentence, index) => (
              <div key={index}>
                {sentence}
                {sentence.includes(".") ? "" : "."}
              </div>
            ))}
        </div>
      );
    } else {
      return null;
    }
  };

  const loadSetupIntent = (): Promise<StripeSetupIntent | null> =>
    fetch("/api/payment/card", {
      method: "POST",
      credentials: "include",
      headers: {
        [STRIPE_PUBLIC_KEY_HEADER]: props.stripeApiKey
      },
      body: props.recaptchaToken
    })
      .then(async response => {
        if (response.ok) {
          return await response.json();
        }

        const locationHeaderValue = response.headers.get("Location");
        if (response.status === 401 && locationHeaderValue) {
          window.location.replace(locationHeaderValue);
          return null;
        } else {
          throw new Error(
            `Failed to load SetupIntent : ${response.status} ${
              response.statusText
            } : ${await response.text()}`
          );
        }
      })
      .then((setupIntent: StripeSetupIntent) => setupIntent)
      .catch(error => {
        Sentry.captureException(error);
        setStripeSetupIntentError(error);
        return null;
      });

  async function startCardUpdate() {
    setIsValidating(true);

    const cardElement = elements?.getElement(CardNumberElement);

    if (!cardElement) {
      Sentry.captureException("StripeElements returning null");
      setError({
        message: "Something went wrong, please check the details and try again."
      });
      setIsValidating(false);
      return;
    }

    if (!props.recaptchaToken) {
      setIsValidating(false);
      setError({ message: "Recaptcha has not been completed" });
      return;
    }

    // new recaptcha token needed with each call to create a setup intent
    let setupIntent;

    if (!stripeSetupIntent) {
      setupIntent = await loadSetupIntent();
      setStripeSetupIntent(setupIntent);
    } else {
      setupIntent = stripeSetupIntent;
    }

    if (stripe && setupIntent) {
      const createPaymentMethodResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: props.userEmail,
          email: props.userEmail
        }
      });

      if (
        !(
          createPaymentMethodResult &&
          createPaymentMethodResult.paymentMethod &&
          createPaymentMethodResult.paymentMethod.id &&
          createPaymentMethodResult.paymentMethod.card &&
          createPaymentMethodResult.paymentMethod.card.brand &&
          createPaymentMethodResult.paymentMethod.card.last4
        )
      ) {
        Sentry.captureException(
          createPaymentMethodResult.error ||
            "something missing from the createPaymentMethod response"
        );
        setError(
          createPaymentMethodResult.error || {
            message:
              "Something went wrong, please check the details and try again."
          }
        );
        setIsValidating(false);
        return;
      }

      const intentResult = await stripe.confirmCardSetup(
        setupIntent.client_secret,
        { payment_method: createPaymentMethodResult.paymentMethod.id }
      );

      if (
        intentResult.setupIntent &&
        intentResult.setupIntent.status &&
        intentResult.setupIntent.status === "succeeded"
      ) {
        setIsValidating(false);

        const newPaymentMethodDetail = new NewCardPaymentMethodDetail(
          createPaymentMethodResult.paymentMethod as StripePaymentMethod,
          props.stripeApiKey
        );

        props.newPaymentMethodDetailUpdater(newPaymentMethodDetail);
        props.executePaymentUpdate(newPaymentMethodDetail);
      } else {
        Sentry.captureException(
          intentResult.error ||
            "something missing from the SetupIntent response"
        );
        setError(
          intentResult.error || {
            message:
              "Something went wrong, please check the details and try again."
          }
        );
        setIsValidating(false);
      }
    }
  }

  return stripeSetupIntentError ? (
    <GenericErrorScreen loggingMessage={"error loading SetupIntent"} />
  ) : (
    <>
      <div
        css={{
          marginTop: `${space[9]}px`,
          marginBottom: `${space[9]}px`,
          textAlign: "right"
        }}
      >
        <FlexCardElement
          setCardNumberElement={setCardNumberElement}
          setCardExpiryElement={setCardExpiryElement}
          setCardCVCElement={setCardCVCElement}
        />
        <div
          css={{
            marginBottom: "40px",
            width: "500px",
            maxWidth: "100%"
          }}
        >
          <div
            css={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            {isValidating ? (
              <>
                <Spinner
                  loadingMessage="Validating your card details..."
                  scale={0.7}
                  inline
                />
              </>
            ) : (
              <>
                <div
                  css={{
                    textAlign: "right",
                    [maxWidth.mobileLandscape]: {
                      width: "100%"
                    }
                  }}
                >
                  <Button
                    disabled={!cardFormIsLoaded}
                    text="Update payment method"
                    onClick={startCardUpdate}
                    colour={brand[400]}
                    textColour={neutral[100]}
                    fontWeight="bold"
                    primary
                    right
                  />
                </div>
                {renderError()}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

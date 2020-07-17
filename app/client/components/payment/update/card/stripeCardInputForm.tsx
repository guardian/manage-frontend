import { NavigateFn } from "@reach/router";
import * as Sentry from "@sentry/browser";
import {
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { StripeElementBase } from "@stripe/stripe-js";
import React, { useState, useContext } from "react";
import { StripeSetupIntent } from "../../../../../shared/stripeSetupIntent";
import { maxWidth } from "../../../../styles/breakpoints";
import { validationWarningCSS } from "../../../../styles/fonts";
import { Button } from "../../../buttons";
import { GenericErrorScreen } from "../../../genericErrorScreen";
import { Spinner } from "../../../spinner";
import { NavigateFnContext, FlowReferrerContext } from "../updatePaymentFlow";
import { CardInputFormProps } from "./cardInputForm";
import { FlexCardElement } from "./flexCardElement";
import {
  NewCardPaymentMethodDetail,
  StripePaymentMethod
} from "./newCardPaymentMethodDetail";
import { StripeLogo } from "./stripeLogo";

export interface StripeSetupIntentDetails {
  stripeSetupIntent?: StripeSetupIntent;
  stripeSetupIntentError?: Error;
}

interface StripeCardInputFormProps
  extends CardInputFormProps,
    StripeSetupIntentDetails {}

interface StripeInputFormError {
  code?: string;
  message?: string;
  type?: string;
}

export const StripeCardInputForm = (props: StripeCardInputFormProps) => {
  const [isValidating, setIsValidating] = useState<boolean>(false);
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

  const flowReferrerContext = useContext(FlowReferrerContext);

  const isLoaded = () => {
    return (
      stripe &&
      cardNumberElement &&
      cardExpiryElement &&
      cardCVCElement &&
      props.stripeSetupIntent
    );
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

  const startCardUpdate = (navigate: NavigateFn) => async () => {
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
    if (stripe && props.stripeSetupIntent) {
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
        props.stripeSetupIntent.client_secret,
        { payment_method: createPaymentMethodResult.paymentMethod.id }
      );
      if (
        intentResult.setupIntent &&
        intentResult.setupIntent.status &&
        intentResult.setupIntent.status === "succeeded"
      ) {
        props.newPaymentMethodDetailUpdater(
          new NewCardPaymentMethodDetail(
            createPaymentMethodResult.paymentMethod as StripePaymentMethod,
            props.stripeApiKey
          )
        );
        navigate("confirm", {
          state: flowReferrerContext
        });
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
  };
  return props.stripeSetupIntentError ? (
    <GenericErrorScreen loggingMessage={"error loading SetupIntent"} />
  ) : (
    <>
      <div
        css={{
          display: isLoaded() ? "none" : "block"
        }}
      >
        <Spinner loadingMessage="Preparing card details form..." />
      </div>
      <div
        css={{
          textAlign: "right",
          display: isLoaded() ? "block" : "none"
        }}
      >
        <FlexCardElement
          disabled={isValidating}
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
                <StripeLogo />
                <Spinner
                  loadingMessage="Validating your card details..."
                  scale={0.7}
                  inline
                />
              </>
            ) : (
              <NavigateFnContext.Consumer>
                {nav =>
                  nav.navigate ? (
                    <>
                      <a
                        href="https://stripe.com/"
                        target="_blank"
                        css={{ marginBottom: "5px" }}
                      >
                        <StripeLogo />
                      </a>
                      <div
                        css={{
                          textAlign: "right",
                          [maxWidth.mobileLandscape]: {
                            width: "100%"
                          }
                        }}
                      >
                        <Button
                          disabled={!(stripe && props.stripeSetupIntent)}
                          text="Review payment update"
                          onClick={startCardUpdate(nav.navigate)}
                          primary
                          right
                        />
                      </div>
                      {renderError()}
                    </>
                  ) : (
                    <GenericErrorScreen loggingMessage="No navigate function - very odd" />
                  )
                }
              </NavigateFnContext.Consumer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

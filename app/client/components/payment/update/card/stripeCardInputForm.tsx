import { NavigateFn } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React from "react";
import { ReactStripeElements } from "react-stripe-elements";
import { StripeSetupIntent } from "../../../../../shared/stripeSetupIntent";
import { maxWidth } from "../../../../styles/breakpoints";
import { validationWarningCSS } from "../../../../styles/fonts";
import { Button } from "../../../buttons";
import { GenericErrorScreen } from "../../../genericErrorScreen";
import { Spinner } from "../../../spinner";
import { NavigateFnContext } from "../updatePaymentFlow";
import { CardInputFormProps } from "./cardInputForm";
import { FlexCardElement } from "./flexCardElement";
import { NewCardPaymentMethodDetail } from "./newCardPaymentMethodDetail";
import { StripeLogo } from "./stripeLogo";

export interface StripeSetupIntentDetails {
  stripeSetupIntent?: StripeSetupIntent;
  stripeSetupIntentError?: Error;
}

type StripeCardInputFormProps = ReactStripeElements.InjectedStripeProps &
  CardInputFormProps &
  StripeSetupIntentDetails;

interface StripeCardInputFormState {
  isValidating: boolean;
  error: {
    code?: string;
    message?: string;
    type?: string;
  };
  readyElements: string[]; // TODO: Explore Promises approach
}

export class StripeCardInputForm extends React.Component<
  StripeCardInputFormProps,
  StripeCardInputFormState
> {
  public state: StripeCardInputFormState = {
    isValidating: false,
    error: {},
    readyElements: []
  };

  public render(): React.ReactNode {
    return this.props.stripeSetupIntentError ? (
      <GenericErrorScreen loggingMessage={"error loading SetupIntent"} />
    ) : (
      <>
        <div
          css={{
            display: this.isLoaded() ? "none" : "block"
          }}
        >
          <Spinner loadingMessage="Preparing card details form..." />
        </div>
        <div
          css={{
            textAlign: "right",
            display: this.isLoaded() ? "block" : "none"
          }}
        >
          <FlexCardElement
            disabled={this.state.isValidating}
            markElementReady={this.markElementReady}
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
              {this.state.isValidating ? (
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
                            disabled={
                              !(
                                this.props.stripe &&
                                this.props.stripeSetupIntent
                              )
                            }
                            text="Review payment update"
                            onClick={this.startCardUpdate(nav.navigate)}
                            primary
                            right
                          />
                        </div>
                        {this.renderError()}
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
  }

  private isLoaded = () =>
    this.props.stripe &&
    this.state.readyElements.length === 3 &&
    this.props.stripeSetupIntent;

  private markElementReady = (element: string) => () =>
    this.setState(prevState => ({
      readyElements: prevState.readyElements.concat(element)
    }));

  private renderError = () => {
    if (this.state.error && this.state.error.message) {
      return (
        <div
          css={{
            ...validationWarningCSS,
            marginTop: "5px",
            width: "100%",
            textAlign: "right"
          }}
        >
          {this.state.error.message
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

  private startCardUpdate = (navigate: NavigateFn) => async () => {
    this.setState({ isValidating: true });
    if (this.props.stripe && this.props.stripeSetupIntent) {
      const createPaymentMethodResult = await this.props.stripe.createPaymentMethod(
        "card",
        {
          billing_details: {
            name: this.props.userEmail,
            email: this.props.userEmail
          }
        }
      );

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
        this.setState({
          error: createPaymentMethodResult.error || {
            message:
              "Something went wrong, please check the details and try again."
          },
          isValidating: false
        });
        return;
      }

      const intentResult = await this.props.stripe.handleCardSetup(
        this.props.stripeSetupIntent.client_secret
      );
      if (
        intentResult.setupIntent &&
        intentResult.setupIntent.status &&
        intentResult.setupIntent.status === "succeeded"
      ) {
        this.props.newPaymentMethodDetailUpdater(
          new NewCardPaymentMethodDetail(
            createPaymentMethodResult.paymentMethod,
            this.props.stripeApiKey
          )
        );
        navigate("confirm");
      } else {
        Sentry.captureException(
          intentResult.error ||
            "something missing from the SetupIntent response"
        );
        this.setState({
          error: intentResult.error || {
            message:
              "Something went wrong, please check the details and try again."
          },
          isValidating: false
        });
      }
    }
  };
}

import { NavigateFn } from "@reach/router";
import React from "react";
import { ReactStripeElements } from "react-stripe-elements";
import { maxWidth } from "../../../styles/breakpoints";
import { validationWarningCSS } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { Spinner } from "../../spinner";
import { FlexCardElement } from "./flexCardElement";
import { StripeLogo } from "./stripeLogo";
import { NavigateFnContext } from "./updatePaymentFlow";

export interface StripeCardInputFormProps
  extends ReactStripeElements.InjectedStripeProps {
  stripeTokenUpdater: (
    stripeTokenResponse: ReactStripeElements.PatchedTokenResponse
  ) => void;
  userEmail?: string;
}

export interface StripeCardInputFormState {
  isGeneratingToken: boolean;
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
    isGeneratingToken: false,
    error: {},
    readyElements: []
  };

  public render(): React.ReactNode {
    return (
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
            disabled={this.state.isGeneratingToken}
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
              {this.state.isGeneratingToken ? (
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
                            disabled={this.props.stripe === undefined}
                            text="Review payment update"
                            onClick={this.startCardUpdate(nav.navigate)}
                            primary
                            right
                          />
                          {this.renderError()}
                        </div>
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
    this.props.stripe && this.state.readyElements.length === 3;

  private markElementReady = (element: string) => () =>
    this.setState(prevState => ({
      readyElements: prevState.readyElements.concat(element)
    }));

  private renderError = () => {
    if (this.state.error && this.state.error.message) {
      return (
        <p
          css={{
            ...validationWarningCSS,
            marginTop: "5px"
          }}
        >
          {this.state.error.message}
        </p>
      );
    } else {
      return null;
    }
  };

  private setInProgress = (value: boolean) =>
    this.setState({ isGeneratingToken: value });

  private startCardUpdate = (navigate: NavigateFn) => async () => {
    this.setInProgress(true);
    if (this.props.stripe) {
      const tokenResponse = await this.props.stripe.createToken(
        { name: this.props.userEmail } // may need to add more token options for product switch
      );
      if (tokenResponse.token && tokenResponse.token.card) {
        this.props.stripeTokenUpdater(tokenResponse);
        navigate("confirm");
      } else {
        if (tokenResponse.error) {
          this.setState({
            error: tokenResponse.error
          });
        }
        this.setInProgress(false);
      }
    }
  };
}

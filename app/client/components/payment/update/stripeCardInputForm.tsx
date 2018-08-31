import { NavigateFn } from "@reach/router";
import React from "react";
import { ReactStripeElements } from "react-stripe-elements";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { Spinner } from "../../spinner";
import { FlexCardElement } from "./flexCardElement";
import { NavigateFnContext } from "./updatePaymentFlow";

export interface StripeCardInputFormProps
  extends ReactStripeElements.InjectedStripeProps {
  stripeTokenUpdater: (
    stripeTokenResponse: ReactStripeElements.PatchedTokenResponse
  ) => void;
}

export interface StripeCardInputFormState {
  isGeneratingToken: boolean;
  isValid: boolean;
  error: {
    code?: string;
    message?: string;
    type?: string;
  };
}

export class StripeCardInputForm extends React.Component<
  StripeCardInputFormProps,
  StripeCardInputFormState
> {
  public state: StripeCardInputFormState = {
    isGeneratingToken: false,
    isValid: false,
    error: {}
  };

  public render(): React.ReactNode {
    return this.props.stripe ? (
      <div css={{ textAlign: "right" }}>
        <FlexCardElement disabled={this.state.isGeneratingToken} />
        <div css={{ margin: "20px 0" }}>
          {this.state.isGeneratingToken ? (
            <Spinner
              loadingMessage="Validating your card detail..."
              scale={0.7}
              inline
            />
          ) : (
            <NavigateFnContext.Consumer>
              {nav =>
                nav.navigate ? (
                  <>
                    <Button
                      color={palette.neutral["1"]}
                      textColor={palette.white}
                      disabled={
                        this.props.stripe ===
                        undefined /*TODO add validation check on FlexCardElement*/
                      }
                      text="Review Payment Update"
                      onClick={this.startCardUpdate(nav.navigate)}
                    />
                    {this.renderError()}
                  </>
                ) : (
                  <GenericErrorScreen />
                )
              }
            </NavigateFnContext.Consumer>
          )}
        </div>
      </div>
    ) : (
      <GenericErrorScreen />
    );
  }

  private renderError = () => {
    if (this.state.error && this.state.error.message) {
      return (
        <p
          css={{
            color: palette.red.medium,
            fontFamily: sans,
            fontSize: "0.8rem",
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
      const tokenResponse = await this.props.stripe.createToken(); // may need to add token options for product switch
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

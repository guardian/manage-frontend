import { NavigateFn } from "@reach/router";
import React from "react";
import { DirectDebitDetails } from "../../../../../shared/productResponse";
import { maxWidth, minWidth } from "../../../../styles/breakpoints";
import { sans, validationWarningCSS } from "../../../../styles/fonts";
import AsyncLoader from "../../../asyncLoader";
import { Button } from "../../../buttons";
import { Checkbox } from "../../../checkbox";
import { GenericErrorScreen } from "../../../genericErrorScreen";
import { cleanSortCode, dashifySortCode } from "../../directDebitDisplay";
import { FieldWrapper } from "../fieldWrapper";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import { NavigateFnContext } from "../updatePaymentFlow";
import { DirectDebitLegalPre } from "./directDebitLegalPre";
import { NewDirectDebitPaymentMethodDetail } from "./newDirectDebitPaymentMethodDetail";

const inputBoxBaseStyle = {
  width: "100%",
  height: "100%",
  fontFamily: sans,
  fontSize: "18px",
  border: "none",
  outline: "none"
};

const formWidth = "400px";

interface DirectDebitValidationResponse {
  accountValid: boolean;
}

class DirectDebitValidationLoader extends AsyncLoader<
  DirectDebitValidationResponse
> {}

export interface DirectDebitUpdateFormProps {
  newPaymentMethodDetailUpdater: (ddDetails: NewPaymentMethodDetail) => void;
}

export interface DirectDebitUpdateFormState extends DirectDebitDetails {
  soleAccountHolderConfirmed: boolean;
  isValidating: boolean;
  error?: string;
}

// tslint:disable-next-line:max-classes-per-file
export class DirectDebitInputForm extends React.Component<
  DirectDebitUpdateFormProps,
  DirectDebitUpdateFormState
> {
  public state: DirectDebitUpdateFormState = {
    soleAccountHolderConfirmed: false,
    accountName: "",
    accountNumber: "",
    sortCode: "",
    isValidating: false
  };

  public render(): React.ReactNode {
    return (
      <div
        css={{
          marginBottom: "20px"
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div
            css={{
              maxWidth: "100%",
              [minWidth.desktop]: {
                marginRight: "20px",
                maxWidth: formWidth
              }
            }}
          >
            <FieldWrapper
              width={formWidth}
              label="Account Name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ accountName: event.target.value })
              }
            >
              <input type="text" css={inputBoxBaseStyle} />
            </FieldWrapper>
            <div
              css={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "12px"
              }}
            >
              <FieldWrapper
                width="240px"
                label="Account Number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ accountNumber: event.target.value })
                }
              >
                <input
                  type="text"
                  pattern="[0-9]" // TODO get this validation take effect
                  css={inputBoxBaseStyle}
                  placeholder="e.g. 12345678"
                />
              </FieldWrapper>
              <FieldWrapper
                width="140px"
                label="Sort Code"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ sortCode: cleanSortCode(event.target.value) })
                }
              >
                <input
                  type="text"
                  pattern="[0-9]"
                  css={inputBoxBaseStyle}
                  placeholder="e.g. 10-20-30"
                />
              </FieldWrapper>
            </div>
            <Checkbox
              onChange={newValue =>
                this.setState({ soleAccountHolderConfirmed: newValue })
              }
              checked={this.state.soleAccountHolderConfirmed}
              label="I confirm that I am the account holder and I am solely able to authorise debit from the account"
            />
            <DirectDebitLegalPre
              extraCSS={{
                [minWidth.desktop]: {
                  display: "none"
                }
              }}
            />
            <NavigateFnContext.Consumer>
              {nav =>
                nav.navigate ? (
                  <div
                    css={{
                      marginTop: "20px",
                      textAlign: "right",
                      width: formWidth,
                      [maxWidth.desktop]: {
                        width: "100%"
                      }
                    }}
                  >
                    {this.state.isValidating ? (
                      <DirectDebitValidationLoader
                        fetch={this.validateDirectDebitDetails}
                        shouldPreventRender={this.handleValidationResponse(
                          nav.navigate
                        )} // TODO change to alternateRenderAction (which returns a function to be executed after deciding to state change
                        render={() => null}
                        shouldPreventErrorRender={() => {
                          this.setState({
                            isValidating: false,
                            error:
                              "Could not validate your bank details, please check them and try again."
                          });
                          return true;
                        }}
                        errorRender={() => null}
                        loadingMessage="Validating your direct debit details..."
                        spinnerScale={0.7}
                        inline
                      />
                    ) : (
                      <>
                        <Button
                          text="Review payment update"
                          onClick={this.startDirectDebitUpdate}
                          primary
                          right
                        />
                        {this.state.error ? (
                          <div
                            css={{
                              ...validationWarningCSS,
                              marginTop: "5px"
                            }}
                          >
                            {this.state.error}
                          </div>
                        ) : (
                          undefined
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <GenericErrorScreen loggingMessage="No navigate function - very odd" />
                )
              }
            </NavigateFnContext.Consumer>
          </div>
          <DirectDebitLegalPre
            extraCSS={{
              [maxWidth.desktop]: {
                display: "none"
              }
            }}
          />
        </div>
      </div>
    );
  }

  private handleValidationResponse = (navigate: NavigateFn) => (
    response: DirectDebitValidationResponse
  ) => {
    if (response && response.accountValid) {
      navigate("confirm");
    } else {
      this.setState({
        isValidating: false,
        error: "Your bank details are invalid. Please check them and try again."
      });
    }
    return true;
  };

  private validateDirectDebitDetails: () => Promise<Response> = async () =>
    await fetch(`/api/validate/payment/dd`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        account: this.state.accountNumber,
        sortcode: dashifySortCode(this.state.sortCode),
        holder: this.state.accountName
      }),
      headers: { "Content-Type": "application/json" }
    });

  private startDirectDebitUpdate = () => {
    // TODO make 'check' call with spinner plus validation on the checkbox
    this.props.newPaymentMethodDetailUpdater(
      new NewDirectDebitPaymentMethodDetail({
        accountName: this.state.accountName,
        accountNumber: this.state.accountNumber,
        sortCode: this.state.sortCode
      })
    );
    this.setState({ error: undefined });
    if (this.state.accountName.length < 3) {
      this.setState({ error: "Please enter a valid account name" }); // TODO add field highlighting
    } else if (this.state.soleAccountHolderConfirmed) {
      this.setState({ isValidating: true });
    } else {
      this.setState({
        error: "You need to confirm that you are the account holder"
      }); // TODO highlight checkbox
    }
  };
}

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
import { DirectDebitLegal } from "./directDebitLegal";
import { NewDirectDebitPaymentMethodDetail } from "./newDirectDebitPaymentMethodDetail";

const inputBoxBaseStyle = {
  width: "100%",
  height: "100%",
  fontFamily: sans,
  fontSize: "18px",
  border: "none",
  outline: "none"
};

export const ddFormWidth = "450px";

interface DirectDebitValidationResponse {
  data: {
    accountValid: boolean;
    goCardlessStatusCode: null | number;
  };
}

class DirectDebitValidationLoader extends AsyncLoader<
  DirectDebitValidationResponse
> {}

export interface DirectDebitUpdateFormProps {
  newPaymentMethodDetailUpdater: (ddDetails: NewPaymentMethodDetail) => void;
  testUser: boolean;
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
        <form
          css={{
            display: "flex",
            [minWidth.desktop]: {
              flexDirection: "row"
            },
            [maxWidth.desktop]: {
              flexDirection: "column",
              maxWidth: ddFormWidth
            }
          }}
        >
          <div
            css={{
              maxWidth: ddFormWidth,
              [minWidth.desktop]: {
                marginRight: "20px"
              }
            }}
          >
            <FieldWrapper
              width={ddFormWidth}
              label="Account Name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ accountName: event.target.value })
              }
            >
              <input
                type="text"
                css={inputBoxBaseStyle}
                pattern="[A-Za-z\s]{3,}"
                title="The name of the account holder must have at least 3 letters."
                required
              />
            </FieldWrapper>
            <div
              css={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "12px"
              }}
            >
              <FieldWrapper
                width="170px"
                label="Sort Code"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ sortCode: cleanSortCode(event.target.value) })
                }
              >
                <input
                  type="text"
                  pattern="[0-9]{2}[\-\s]?[0-9]{2}[\-\s]?[0-9]{2}"
                  title="Sort Code must contain 6 numbers (optionally separated by a - or space)"
                  css={inputBoxBaseStyle}
                  placeholder="e.g. 10-20-30"
                  required
                />
              </FieldWrapper>
              <FieldWrapper
                width="260px"
                label="Account Number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ accountNumber: event.target.value })
                }
              >
                <input
                  type="text"
                  pattern="[0-9]{7,}"
                  css={inputBoxBaseStyle}
                  placeholder="e.g. 12345678"
                  title="Account Number should typically be 8 digits"
                  required
                />
              </FieldWrapper>{" "}
            </div>
            <Checkbox
              onChange={newValue =>
                this.setState({ soleAccountHolderConfirmed: newValue })
              }
              checked={this.state.soleAccountHolderConfirmed}
              label="I confirm that I am the account holder and I am solely able to authorise debit from the account"
              maxWidth={ddFormWidth}
              required
            />
            <NavigateFnContext.Consumer>
              {nav =>
                nav.navigate ? (
                  <div
                    css={{
                      marginTop: "20px",
                      textAlign: "right",
                      width: ddFormWidth,
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
                        )}
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
                        loadingMessage="Validating direct debit details..."
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
          <DirectDebitLegal />
        </form>
      </div>
    );
  }

  private handleValidationResponse = (navigate: NavigateFn) => (
    response: DirectDebitValidationResponse
  ) => {
    if (response && response.data.accountValid) {
      navigate("confirm");
    } else if (response && response.data.goCardlessStatusCode === 429) {
      this.setState({
        isValidating: false,
        error:
          "We cannot currently validate your bank details. Please try again later."
      });
    } else {
      this.setState({
        isValidating: false,
        error: "Your bank details are invalid. Please check them and try again."
      });
    }
    return true;
  };

  private validateDirectDebitDetails: () => Promise<Response> = async () =>
    await fetch(
      `/api/validate/payment/dd?mode=${this.props.testUser ? "test" : "live"}`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          accountNumber: this.state.accountNumber,
          sortCode: cleanSortCode(this.state.sortCode)
        }),
        headers: { "Content-Type": "application/json" }
      }
    );

  private startDirectDebitUpdate = () => {
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

import { NavigateFn } from "@reach/router";
import React from "react";
import { DirectDebitDetails } from "../../../../../shared/productResponse";
import { maxWidth, minWidth } from "../../../../styles/breakpoints";
import { sans } from "../../../../styles/fonts";
import { Button } from "../../../buttons";
import { Checkbox } from "../../../checkbox";
import { GenericErrorScreen } from "../../../genericErrorScreen";
import { FieldWrapper } from "../fieldWrapper";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import { NavigateFnContext } from "../updatePaymentFlow";
import { DirectDebitLegalStepOne } from "./ddLegalStepOne";
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

export interface DirectDebitUpdateFormProps {
  newPaymentMethodDetailUpdater: (ddDetails: NewPaymentMethodDetail) => void;
}

export interface DirectDebitUpdateFormState extends DirectDebitDetails {
  soleAccountHolderConfirmed: boolean;
}

export class DirectDebitInputForm extends React.Component<
  DirectDebitUpdateFormProps,
  DirectDebitUpdateFormState
> {
  public state = {
    soleAccountHolderConfirmed: false,
    accountName: "",
    accountNumber: "",
    sortCode: ""
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
            flexDirection: "row",
            [maxWidth.desktop]: {
              flexWrap: "wrap"
            }
          }}
        >
          <div
            css={{
              maxWidth: "100%",
              [minWidth.desktop]: {
                marginRight: "20px"
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
                  this.setState({ sortCode: event.target.value })
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
          </div>
          <DirectDebitLegalStepOne />
        </div>
        <NavigateFnContext.Consumer>
          {nav =>
            nav.navigate ? (
              <div
                css={{
                  marginTop: "30px",
                  textAlign: "right",
                  width: formWidth,
                  [maxWidth.desktop]: {
                    width: "100%"
                  }
                }}
              >
                <Button
                  text="Review payment update"
                  onClick={this.startDirectDebitUpdate(nav.navigate)}
                  primary
                  right
                />
                {/*TODO {this.renderError()}*/}
              </div>
            ) : (
              <GenericErrorScreen loggingMessage="No navigate function - very odd" />
            )
          }
        </NavigateFnContext.Consumer>
      </div>
    );
  }

  private startDirectDebitUpdate = (navigate: NavigateFn) => () => {
    // TODO make 'check' call with spinner plus validation on the checkbox
    this.props.newPaymentMethodDetailUpdater(
      new NewDirectDebitPaymentMethodDetail({
        accountName: this.state.accountName,
        accountNumber: this.state.accountNumber,
        sortCode: this.state.sortCode
      })
    );
    navigate("confirm");
  };
}

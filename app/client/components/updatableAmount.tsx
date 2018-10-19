import React, { ChangeEvent } from "react";
import {
  Subscription,
  SubscriptionPlan,
  WithSubscription
} from "../../shared/productResponse";
import { ProductType, WithProductType } from "../../shared/productTypes";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { validationWarningCSS } from "../styles/fonts";
import AsyncLoader from "./asyncLoader";
import { Button } from "./buttons";
import { wrappingContainerCSS } from "./productPage";

enum MinOrMax {
  minimum,
  maximum
}

// min & max values based on https://github.com/guardian/support-frontend/blob/5aa237d/assets/helpers/contributions.js
const calculateMinOrMaxAmount = (
  minOrMax: MinOrMax,
  plan: SubscriptionPlan
) => {
  if (plan.interval.toLowerCase() === "month") {
    if (plan.currencyISO === "NZD" || plan.currencyISO === "AUD") {
      return minOrMax === MinOrMax.minimum ? 10 : 200;
    }
    if (plan.currencyISO === "CAD") {
      return minOrMax === MinOrMax.minimum ? 5 : 166;
    }
    return minOrMax === MinOrMax.minimum ? 2 : 166; // monthly default
  }
  return minOrMax === MinOrMax.minimum ? 10 : 2000; // annual
};

const pleaseCheck = "Please check the amount you've entered.";

const validateValue = (
  currentAmount: number,
  newValue: number,
  subscription: Subscription
) => {
  if (isNaN(newValue)) {
    return "Please enter a valid number";
  }
  if (newValue === currentAmount) {
    return `Your current contribution is ${
      subscription.plan.currency
    }${currentAmount.toFixed(2)} a ${
      subscription.plan.interval
    }. Please enter a different amount.`;
  }
  const minAmount = calculateMinOrMaxAmount(
    MinOrMax.minimum,
    subscription.plan
  );
  if (newValue < minAmount) {
    return `Please enter an amount of ${
      subscription.plan.currency
    }${minAmount} or more a ${subscription.plan.interval}`;
  }
  const maxAmount = calculateMinOrMaxAmount(
    MinOrMax.maximum,
    subscription.plan
  );
  if (newValue > maxAmount) {
    return `Thank you but we cannot accept contributions over ${
      subscription.plan.currency
    }${maxAmount} a ${subscription.plan.interval}`;
  }
  if (newValue > 10 * currentAmount) {
    return `Your current contribution is ${
      subscription.plan.currency
    }${currentAmount.toFixed(2)} a ${
      subscription.plan.interval
    }. ${pleaseCheck}`;
  }
};

const amountValidationWarningCSS = {
  ...validationWarningCSS,
  minHeight: "2rem",
  padding: "5px 15px",
  width: "100%"
};

class UpdateAmountLoader extends AsyncLoader<string> {}

const getAmountUpdater = (
  newAmount: number,
  productType: ProductType
) => async () =>
  await fetch(`/api/update/amount/${productType.urlPart}`, {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({ newPaymentAmount: newAmount })
  });

export type UpdatableAmountProps = WithSubscription & WithProductType;

export interface UpdatableAmountState {
  inEditMode: boolean;
  isApplyingUpdate: boolean;
  currentAmount: number;
  newAmount: number;
  validationMessage?: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdatableAmount extends React.Component<
  UpdatableAmountProps,
  UpdatableAmountState
> {
  public initialAmount = this.props.subscription.nextPaymentPrice / 100.0;
  public state = {
    inEditMode: false,
    isApplyingUpdate: false,
    currentAmount: this.initialAmount,
    newAmount: this.initialAmount,
    validationMessage: ""
  };

  public render(): React.ReactNode {
    return (
      <div css={wrappingContainerCSS}>
        {this.state.isApplyingUpdate ? (
          <UpdateAmountLoader
            fetch={getAmountUpdater(
              this.state.newAmount,
              this.props.productType
            )}
            readerOnOK={(resp: Response) => resp.text()}
            render={() => {
              this.setState({
                isApplyingUpdate: false,
                inEditMode: false,
                currentAmount: this.state.newAmount
              });
              return null;
            }}
            loadingMessage={"Updating..."}
            errorRender={() => {
              this.setState({
                isApplyingUpdate: false,
                validationMessage:
                  "Updating failed this time. Please try again later..."
              });
              return null;
            }}
            spinnerScale={0.7}
            inline
          />
        ) : (
          <>
            <span css={{ width: "12px" }}>
              {this.props.subscription.plan.currency}
            </span>
            {this.state.inEditMode ? (
              <>
                <input
                  css={{
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    width: "70px",
                    marginLeft: "3px",
                    marginRight: "3px",
                    height: "32px",
                    border: "1px black solid"
                  }}
                  type="number"
                  step="0.01"
                  defaultValue={this.state.newAmount.toFixed(2)}
                  onChange={this.handleChange}
                  autoFocus
                />
                <span
                  css={{
                    marginRight: "10px"
                  }}
                >
                  {this.props.subscription.plan.currencyISO}
                </span>
                <div
                  css={{
                    ...amountValidationWarningCSS,
                    display: "block",
                    [minWidth.mobileLandscape]: {
                      display: "none"
                    }
                  }}
                >
                  {this.state.validationMessage || " "}
                </div>
                <div>
                  <Button
                    text="Confirm"
                    onClick={() => this.setState({ isApplyingUpdate: true })}
                    disabled={
                      this.state.validationMessage !== undefined &&
                      !this.state.validationMessage.endsWith(pleaseCheck)
                    }
                  />{" "}
                  <Button
                    text="Back"
                    onClick={() => this.setState({ inEditMode: false })}
                  />
                </div>
                <div
                  css={{
                    ...amountValidationWarningCSS,
                    display: "none",
                    [minWidth.mobileLandscape]: {
                      display: "block"
                    }
                  }}
                >
                  {this.state.validationMessage || <>&nbsp;</>}
                </div>
              </>
            ) : (
              <>
                <span
                  css={{
                    marginRight: "15px"
                  }}
                >
                  {this.state.currentAmount.toFixed(2)}{" "}
                  {this.props.subscription.plan.currencyISO}
                </span>
                {this.props.productType.updateAmountMdaEndpoint ? (
                  <>
                    <Button
                      text="Change amount"
                      onClick={() => {
                        // tslint:disable-next-line:no-object-mutation
                        this.initialAmount = this.state.currentAmount; // effectively clears any previous success message
                        this.setState({
                          inEditMode: true,
                          validationMessage: validateValue(
                            this.initialAmount,
                            this.state.newAmount,
                            this.props.subscription
                          )
                        });
                      }}
                    />
                    {this.initialAmount !== this.state.currentAmount ? (
                      <div
                        css={{
                          ...amountValidationWarningCSS,
                          paddingLeft: "0",
                          fontWeight: "bold",
                          color: palette.green.dark
                        }}
                      >
                        Your contribution amount was updated successfully. Thank
                        you.
                      </div>
                    ) : (
                      undefined
                    )}
                  </>
                ) : (
                  undefined
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseFloat(event.target.value);
    this.setState({
      newAmount: newValue,
      validationMessage: validateValue(
        this.state.currentAmount,
        newValue,
        this.props.subscription
      )
    });
  };
}

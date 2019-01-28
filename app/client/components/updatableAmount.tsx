import React, { ChangeEvent } from "react";
import {
  SubscriptionPlan,
  WithSubscription
} from "../../shared/productResponse";
import {
  ProductType,
  ProductTypeWithProductPageProperties,
  WithProductType
} from "../../shared/productTypes";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { validationWarningCSS } from "../styles/fonts";
import { trackEvent } from "./analytics";
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
  subscriptionPlan: SubscriptionPlan
) => {
  if (subscriptionPlan.interval.toLowerCase() === "month") {
    if (
      subscriptionPlan.currencyISO === "NZD" ||
      subscriptionPlan.currencyISO === "AUD"
    ) {
      return minOrMax === MinOrMax.minimum ? 10 : 200;
    }
    if (subscriptionPlan.currencyISO === "CAD") {
      return minOrMax === MinOrMax.minimum ? 5 : 166;
    }
    return minOrMax === MinOrMax.minimum ? 2 : 166; // monthly default
  }
  return minOrMax === MinOrMax.minimum ? 10 : 2000; // annual
};

export const pleaseCheck = "Please check the amount you've entered.";

export const validateValue = (
  currentAmount: number,
  newValue: number,
  subscriptionPlan: SubscriptionPlan
) => {
  if (isNaN(newValue)) {
    return "Please enter a valid number";
  }
  if (newValue === currentAmount) {
    return `Your current contribution is ${
      subscriptionPlan.currency
    }${currentAmount.toFixed(2)} a ${
      subscriptionPlan.interval
    }. Please enter a different amount.`;
  }
  const minAmount = calculateMinOrMaxAmount(MinOrMax.minimum, subscriptionPlan);
  if (newValue < minAmount) {
    return `Please enter an amount of ${
      subscriptionPlan.currency
    }${minAmount} or more a ${subscriptionPlan.interval}`;
  }
  const maxAmount = calculateMinOrMaxAmount(MinOrMax.maximum, subscriptionPlan);
  if (newValue > maxAmount) {
    return `Thank you but we cannot accept contributions over ${
      subscriptionPlan.currency
    }${maxAmount} a ${subscriptionPlan.interval}`;
  }
  if (newValue > 10 * currentAmount) {
    return `Your current contribution is ${
      subscriptionPlan.currency
    }${currentAmount.toFixed(2)} a ${
      subscriptionPlan.interval
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
  productType: ProductType,
  subscriptionName: string
) => async () =>
  await fetch(`/api/update/amount/${productType.urlPart}/${subscriptionName}`, {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({ newPaymentAmount: newAmount })
  });

export type UpdatableAmountProps = WithSubscription &
  WithProductType<ProductType>;

export interface UpdatableAmountState {
  inEditMode: boolean;
  isApplyingUpdate: boolean;
  currentAmount: number; // this represents the value currently stored server-side
  newAmount: number; // this represents the new (in-flux) value based on the users changes
  validationMessage?: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdatableAmount extends React.Component<
  UpdatableAmountProps,
  UpdatableAmountState
> {
  public initialAmount = this.props.subscription.plan.amount / 100.0;
  public state = {
    inEditMode: false,
    isApplyingUpdate: false,
    currentAmount: this.initialAmount, // this value should start at the value from the full api call
    newAmount: this.initialAmount, // this value should start at the value from the full api call
    validationMessage: ""
  };

  public render(): React.ReactNode {
    return (
      <div css={wrappingContainerCSS}>
        {this.state.isApplyingUpdate ? (
          this.getPerformUpdateLoader()
        ) : (
          <>
            <span css={{ width: "12px" }}>
              {this.props.subscription.plan.currency}
            </span>
            {this.state.inEditMode
              ? this.getEditModeRenderer()
              : this.getDisplayModeRenderer()}
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
        this.props.subscription.plan
      )
    });
  };

  private getPerformUpdateLoader = () => (
    <UpdateAmountLoader
      fetch={getAmountUpdater(
        this.state.newAmount,
        this.props.productType,
        this.props.subscription.subscriberId
      )}
      readerOnOK={(resp: Response) => resp.text()}
      render={() => {
        trackEvent({
          eventCategory: "amount_change",
          eventAction: "contributions_amount_change_success",
          eventLabel: `by ${this.props.subscription.plan.currency}${(
            this.state.newAmount - this.state.currentAmount
          ).toFixed(2)}${this.props.subscription.plan.currencyISO}`
        });
        this.setState({
          isApplyingUpdate: false,
          inEditMode: false,
          currentAmount: this.state.newAmount
        });
        return null;
      }}
      loadingMessage={"Updating..."}
      errorRender={() => {
        trackEvent({
          eventCategory: "amount_change",
          eventAction: "contributions_amount_change_failed"
        });
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
  );

  private getEditModeRenderer = () => (
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
  );

  private getDisplayModeRenderer = () => (
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
                  this.props.subscription.plan
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
              Your contribution amount was updated successfully. Thank you.
            </div>
          ) : (
            undefined
          )}
        </>
      ) : (
        undefined
      )}
    </>
  );
}

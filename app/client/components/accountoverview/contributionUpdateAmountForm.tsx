import { css, SerializedStyles } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useState } from "react";
import { PaidSubscriptionPlan } from "../../../shared/productResponse";
import { Button } from "../buttons";
import { Input } from "../delivery/address/input";

interface ContributionUpdateAmountForm {
  subscriptionId: string;
  mainPlan: PaidSubscriptionPlan;
}

export const ContributionUpdateAmountForm = (
  props: ContributionUpdateAmountForm
) => {
  const [otherAmount, setOtherAmount] = useState<string | number>(20);
  const [isOtherAmountSelected, setIsOtherAmountSelected] = useState<boolean>(
    false
  );
  const [selectedValue, setSelectedValue] = useState<string | number>();

  const contributionAmounts: number[] = [2, 5, 10];

  const radioOptionCss: SerializedStyles = css`
    input {
      display: none;
    }
    input + label {
      display: block;
      text-align: center;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid ${palette.neutral[60]};
      color: ${palette.neutral[46]};
      font-weight: bold;
      margin: 0 auto;
      padding: 0;
      line-height: 48px;
      width: 120px;
      cursor: pointer;
    }
    input:checked + label {
      background-color: ${palette.brand[800]};
      color: ${palette.brand[400]};
      border: 0;
      box-shadow: 0 0 0 4px ${palette.brand[500]};
    }
    display: inline-block;
    margin: 0 ${space[3]}px ${space[3]}px 0;
  `;

  const otherAmountOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsOtherAmountSelected(true);
    setSelectedValue("other");
  };

  interface ValidationChoice {
    passed: boolean;
    message?: string;
  }

  const validateChoice = (): ValidationChoice => {
    const chosenOption =
      selectedValue &&
      (selectedValue === "other"
        ? otherAmount
        : `${selectedValue}`.replace(props.mainPlan.currency, ""));
    if (!chosenOption) {
      return {
        passed: false,
        message: "Please make a selection"
      };
    } else if (chosenOption) {
      return {
        passed: false,
        message: "You have selected the same amount as you currently contribute"
      };
    } else if (isNaN(Number(chosenOption))) {
      return {
        passed: false,
        message:
          "There is a problem with the amount you have selected, please make sure it is a valid amount"
      };
    }
    return {
      passed: true
    };
  };

  return (
    <div>
      <div
        css={css`
          border: 1px solid ${palette.neutral[20]};
          margin-bottom: ${space[5]}px;
        `}
      >
        <dl
          css={css`
            padding: ${space[5]}px;
            margin: 0;
            border-bottom: 1px solid ${palette.neutral[20]};
            ${textSans.medium()};
          `}
        >
          <dt
            css={css`
              font-weight: bold;
              display: inline-block;
            `}
          >
            Current amount
          </dt>
          <dd
            css={css`
              display: inline-block;
            `}
          >{`${props.mainPlan.currency}${(props.mainPlan.amount / 100).toFixed(
            2
          )}`}</dd>
        </dl>
        <div
          css={css`
            ${textSans.medium()};
            padding: ${space[5]}px;
          `}
        >
          <h4
            css={css`
              ${textSans.medium({ fontWeight: "bold" })};
              margin: 0 0 ${space[3]}px 0;
            `}
          >
            Choose the amount to contribute
          </h4>
          {contributionAmounts.map(possibleAmount => (
            <div css={radioOptionCss} key={`amount-${possibleAmount}`}>
              <input
                type="radio"
                id={`amount-${possibleAmount}`}
                name="amount"
                value={`${props.mainPlan.currency}${possibleAmount}`}
                onChange={e => {
                  setSelectedValue(e.target.value);
                  setIsOtherAmountSelected(false);
                }}
              />
              <label
                htmlFor={`amount-${possibleAmount}`}
              >{`${props.mainPlan.currency}${possibleAmount}`}</label>
            </div>
          ))}
          <div css={radioOptionCss}>
            <input
              type="radio"
              id="amount-other"
              name="amount"
              value="other"
              checked={isOtherAmountSelected}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIsOtherAmountSelected(e.target.checked);
              }}
            />
            <label htmlFor="amount-other">Other</label>
          </div>
          <div
            css={css`
              margin-top: ${space[3]}px;
            `}
          >
            <Input
              type="number"
              min="1"
              step="1.00"
              label="Other amount"
              prefixValue={props.mainPlan.currency}
              width={30}
              value={otherAmount}
              changeSetState={setOtherAmount}
              onFocus={otherAmountOnFocus}
              setFocus={isOtherAmountSelected}
            />
          </div>
        </div>
      </div>
      <Button
        colour={palette.brand[800]}
        textColour={palette.brand[400]}
        fontWeight="bold"
        text="Change amount"
        onClick={() => {
          const validationResult = validateChoice();
          if (!validationResult.passed) {
            // show validation error message
            return;
          }
          // POST data to the contribution amount update endpoint
        }}
      />
    </div>
  );
};

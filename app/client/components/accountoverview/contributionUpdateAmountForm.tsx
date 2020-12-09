import { css, SerializedStyles } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { InlineError } from "@guardian/src-inline-error";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import {
  augmentInterval,
  PaidSubscriptionPlan
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { trackEvent } from "../analytics";
import AsyncLoader from "../asyncLoader";
import { Button } from "../buttons";
import { Input } from "../input";

interface ContributionUpdateAmountFormProps {
  subscriptionId: string;
  mainPlan: PaidSubscriptionPlan;
  productType: ProductType;
  nextPaymentDate: string | null;
  onUpdateConfirmed: (updatedAmount: number) => void;
}

type ContributionInterval = "month" | "year";

interface ContributionAmountOptions {
  amounts: number[];
  otherDefaultAmount: number;
  minAmount: number;
  maxAmount: number;
}

interface ContributionAmountsLookup {
  [currencyISO: string]: {
    month: ContributionAmountOptions;
    year: ContributionAmountOptions;
  };
}

class UpdateAmountLoader extends AsyncLoader<string> {}

// TODO: make this dynamic (i.e. looks up api/config file agreed/shared by contributions team)
const contributionAmountsLookup: ContributionAmountsLookup = {
  GBP: {
    month: {
      amounts: [3, 7, 12],
      otherDefaultAmount: 2,
      minAmount: 2,
      maxAmount: 166
    },
    year: {
      amounts: [60, 120, 240, 480],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 2000
    }
  },
  USD: {
    month: {
      amounts: [5, 10, 20],
      otherDefaultAmount: 2,
      minAmount: 2,
      maxAmount: 800
    },
    year: {
      amounts: [50, 100, 250, 500],
      otherDefaultAmount: 20,
      minAmount: 10,
      maxAmount: 10000
    }
  },
  EUR: {
    month: {
      amounts: [6, 10, 20],
      otherDefaultAmount: 2,
      minAmount: 2,
      maxAmount: 166
    },
    year: {
      amounts: [50, 100, 250, 500],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 2000
    }
  },
  AUD: {
    month: {
      amounts: [10, 20, 40],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 200
    },
    year: {
      amounts: [80, 250, 500, 750],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 2000
    }
  },
  NZD: {
    month: {
      amounts: [10, 20, 50],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 200
    },
    year: {
      amounts: [50, 100, 250, 500],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 2000
    }
  },
  CAD: {
    month: {
      amounts: [5, 10, 20],
      otherDefaultAmount: 5,
      minAmount: 5,
      maxAmount: 166
    },
    year: {
      amounts: [60, 100, 250, 500],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 2000
    }
  },
  international: {
    month: {
      amounts: [5, 10, 20],
      otherDefaultAmount: 5,
      minAmount: 5,
      maxAmount: 166
    },
    year: {
      amounts: [60, 100, 250, 500],
      otherDefaultAmount: 10,
      minAmount: 10,
      maxAmount: 2000
    }
  }
};

export const ContributionUpdateAmountForm = (
  props: ContributionUpdateAmountFormProps
) => {
  const currentContributionOptions = (contributionAmountsLookup[
    props.mainPlan.currencyISO
  ] || contributionAmountsLookup.international)[
    props.mainPlan.interval as ContributionInterval
  ];

  const [otherAmount, setOtherAmount] = useState<string | number>(
    currentContributionOptions.otherDefaultAmount
  );
  const [isOtherAmountSelected, setIsOtherAmountSelected] = useState<boolean>(
    false
  );
  const [selectedValue, setSelectedValue] = useState<string | number>();
  const [inValidationErrorState, setValidationErrorState] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState<string>(
    ""
  );
  const [showUpdateLoader, setDisplayOfUpdateLoader] = useState<boolean>(false);
  const [updateFailed, setUpdateFailedStatus] = useState<boolean>(false);
  const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);

  useEffect(() => {
    if (inValidationErrorState) {
      const validationResult = validateChoice();
      setValidationErrorState(!validationResult.passed);
    }
  }, [otherAmount, selectedValue]);

  useEffect(() => {
    if (confirmedAmount) {
      props.onUpdateConfirmed(confirmedAmount);
    }
  }, [confirmedAmount]);

  const getAmountUpdater = (
    newAmount: number,
    productType: ProductType,
    subscriptionName: string
  ) => async () =>
    await fetch(
      `/api/update/amount/${productType.urlPart}/${subscriptionName}`,
      {
        credentials: "include",
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify({ newPaymentAmount: newAmount })
      }
    );

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

  const otherAmountOnFocus = () => {
    setIsOtherAmountSelected(true);
    setSelectedValue("other");
  };

  interface ValidationChoice {
    passed: boolean;
    message?: string;
    noSelection?: boolean;
  }

  const validateChoice = (): ValidationChoice => {
    const chosenOption =
      selectedValue &&
      (selectedValue === "other"
        ? otherAmount
        : `${selectedValue}`.replace(props.mainPlan.currency, ""));
    const chosenOptionNum = Number(chosenOption);
    if (!chosenOption) {
      return {
        passed: false,
        message: "Please make a selection",
        noSelection: true
      };
    } else if (chosenOptionNum === props.mainPlan.amount / 100) {
      return {
        passed: false,
        message: "You have selected the same amount as you currently contribute"
      };
    } else if (isNaN(chosenOptionNum)) {
      return {
        passed: false,
        message:
          "There is a problem with the amount you have selected, please make sure it is a valid amount"
      };
    } else if (
      !isNaN(chosenOptionNum) &&
      chosenOptionNum < currentContributionOptions.minAmount
    ) {
      return {
        passed: false,
        message: `There is a minimum ${
          props.mainPlan.interval
        }ly contribution amount of ${
          props.mainPlan.currency
        }${currentContributionOptions.minAmount.toFixed(2)} ${
          props.mainPlan.currencyISO
        }`
      };
    } else if (
      !isNaN(chosenOptionNum) &&
      chosenOptionNum > currentContributionOptions.maxAmount
    ) {
      return {
        passed: false,
        message: `There is a maximum ${
          props.mainPlan.interval
        }ly contribution amount of ${
          props.mainPlan.currency
        }${currentContributionOptions.maxAmount.toFixed(2)} ${
          props.mainPlan.currencyISO
        }`
      };
    }
    return {
      passed: true
    };
  };

  const pendingAmount =
    selectedValue === "other"
      ? Number(`${otherAmount}`.replace(props.mainPlan.currency, ""))
      : Number(`${selectedValue}`.replace(props.mainPlan.currency, ""));

  if (showUpdateLoader) {
    return (
      <UpdateAmountLoader
        fetch={getAmountUpdater(
          pendingAmount,
          props.productType,
          props.subscriptionId
        )}
        readerOnOK={(resp: Response) => resp.text()}
        render={() => {
          trackEvent({
            eventCategory: "amount_change",
            eventAction: "contributions_amount_change_success",
            eventLabel: `by ${props.mainPlan.currency}${(
              pendingAmount -
              props.mainPlan.amount / 100
            ).toFixed(2)}${props.mainPlan.currencyISO}`
          });
          // props.onUpdateConfirmed(pendingAmount);
          setConfirmedAmount(pendingAmount);
          // setUpdateFailedStatus(false);
          // setConfirmationStatus(true);
          // setDisplayOfUpdateLoader(false);
          return null;
        }}
        loadingMessage={"Updating..."}
        errorRender={() => {
          trackEvent({
            eventCategory: "amount_change",
            eventAction: "contributions_amount_change_failed"
          });
          setUpdateFailedStatus(true);
          setDisplayOfUpdateLoader(false);
          return null;
        }}
        spinnerScale={0.7}
        inline
      />
    );
  }

  return (
    <>
      {updateFailed && (
        <InlineError>
          Updating failed this time. Please try again later...
        </InlineError>
      )}
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
            {capitalize(augmentInterval(props.mainPlan.interval))} amount
          </dt>
          <dd
            css={css`
              display: inline-block;
            `}
          >{`${props.mainPlan.currency}${(props.mainPlan.amount / 100).toFixed(
            2
          )} ${props.mainPlan.currencyISO}`}</dd>
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
              margin: 0 0 ${inValidationErrorState ? space[3] : 0}px 0;
            `}
          >
            Choose the amount to contribute
          </h4>
          {inValidationErrorState && !selectedValue && (
            <InlineError>{validationErrorMessage}</InlineError>
          )}
          {currentContributionOptions.amounts.map(possibleAmount => (
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
          {isOtherAmountSelected && (
            <div
              css={css`
                margin-top: ${space[3]}px;
              `}
            >
              <Input
                type="number"
                min={`${currentContributionOptions.minAmount}`}
                step="1.00"
                label="Other amount"
                prefixValue={props.mainPlan.currency}
                width={30}
                value={otherAmount}
                changeSetState={setOtherAmount}
                onFocus={otherAmountOnFocus}
                setFocus={isOtherAmountSelected}
                inErrorState={
                  inValidationErrorState &&
                  (!!selectedValue || (isOtherAmountSelected && !otherAmount))
                }
                errorMessage={validationErrorMessage}
              />
            </div>
          )}
        </div>
      </div>
      <Button
        colour={palette.brand[800]}
        textColour={palette.brand[400]}
        fontWeight="bold"
        text="Change amount"
        onClick={() => {
          const validationResult = validateChoice();
          setValidationErrorState(!validationResult.passed);
          if (!validationResult.passed) {
            setValidationErrorMessage(validationResult.message as string);
            return;
          }
          setDisplayOfUpdateLoader(true);
        }}
      />
    </>
  );
};

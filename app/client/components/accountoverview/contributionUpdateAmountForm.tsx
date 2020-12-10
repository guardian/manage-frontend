import { css } from "@emotion/core";
import { ChoiceCard, ChoiceCardGroup } from "@guardian/src-choice-card";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { InlineError } from "@guardian/src-inline-error";
import { TextInput } from "@guardian/src-text-input";
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

interface ContributionUpdateAmountFormProps {
  subscriptionId: string;
  mainPlan: PaidSubscriptionPlan;
  productType: ProductType;
  // we use this over the value in mainPlan as that value isn't updated after the user submits this form
  currentAmount: number;
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

  const [otherAmount, setOtherAmount] = useState<number | null>(
    currentContributionOptions.otherDefaultAmount
  );
  const [isOtherAmountSelected, setIsOtherAmountSelected] = useState<boolean>(
    false
  );
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [inValidationErrorState, setValidationErrorState] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState<string>(
    ""
  );
  const [showUpdateLoader, setShowUpdateLoader] = useState<boolean>(false);
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

  interface ValidationChoice {
    passed: boolean;
    message?: string;
    noSelection?: boolean;
  }

  const validateChoice = (): ValidationChoice => {
    const chosenOption = isOtherAmountSelected ? otherAmount : selectedValue;

    const chosenOptionNum = Number(chosenOption);
    if (!chosenOption) {
      return {
        passed: false,
        message: "Please make a selection",
        noSelection: true
      };
    } else if (chosenOptionNum === props.currentAmount) {
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

  const pendingAmount = Number(
    isOtherAmountSelected ? otherAmount : selectedValue
  );

  const amountLabel = (amount: number) => {
    return `${props.mainPlan.currency} ${amount} per ${props.mainPlan.interval}`;
  };

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
              pendingAmount - props.currentAmount
            ).toFixed(2)}${props.mainPlan.currencyISO}`
          });
          setConfirmedAmount(pendingAmount);
          return null;
        }}
        loadingMessage={"Updating..."}
        errorRender={() => {
          trackEvent({
            eventCategory: "amount_change",
            eventAction: "contributions_amount_change_failed"
          });
          setUpdateFailedStatus(true);
          setShowUpdateLoader(false);
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
          >{`${props.mainPlan.currency}${props.currentAmount.toFixed(2)} ${
            props.mainPlan.currencyISO
          }`}</dd>
        </dl>
        <div
          css={css`
            ${textSans.medium()};
            padding: ${space[5]}px;
          `}
        >
          {inValidationErrorState && !selectedValue && (
            <InlineError>{validationErrorMessage}</InlineError>
          )}

          <div
            css={css`
              max-width: 500px;
            `}
          >
            <ChoiceCardGroup
              name="amounts"
              label="Choose the amount to contribute"
              columns={2}
            >
              <>
                {currentContributionOptions.amounts.map(amount => (
                  <ChoiceCard
                    id={`amount-${amount}`}
                    key={amount}
                    value={amount.toString()}
                    label={amountLabel(amount)}
                    checked={selectedValue === amount}
                    onChange={() => {
                      setSelectedValue(amount);
                      setIsOtherAmountSelected(false);
                    }}
                  />
                ))}

                <ChoiceCard
                  id={`amount-other`}
                  value="Other"
                  label="Other"
                  checked={isOtherAmountSelected}
                  onChange={() => {
                    setIsOtherAmountSelected(true);
                    setSelectedValue(null);
                  }}
                />
              </>
            </ChoiceCardGroup>

            {isOtherAmountSelected && (
              <div
                css={css`
                  margin-top: ${space[3]}px;
                `}
              >
                <TextInput
                  label={`Other amount (${props.mainPlan.currency})`}
                  type="number"
                  step={1}
                  min={currentContributionOptions.minAmount}
                  max={currentContributionOptions.maxAmount}
                  value={otherAmount || ""}
                  onChange={event =>
                    setOtherAmount(
                      event.target.value ? Number(event.target.value) : null
                    )
                  }
                />
              </div>
            )}
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
          setValidationErrorState(!validationResult.passed);
          if (!validationResult.passed) {
            setValidationErrorMessage(validationResult.message as string);
            return;
          }
          setShowUpdateLoader(true);
        }}
      />
    </>
  );
};

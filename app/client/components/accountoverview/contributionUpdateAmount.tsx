import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { capitalize } from "lodash";
import React, { Dispatch, SetStateAction, useState } from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  augmentInterval,
  PaidSubscriptionPlan
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { Button } from "../buttons";
import { SuccessMessage } from "../delivery/address/deliveryAddressEditConfirmation";
import { ProductDescriptionListTable } from "../productDescriptionListTable";

import { ContributionUpdateAmountForm } from "./contributionUpdateAmountForm";

interface ContributionUpdateAmountProps {
  subscriptionId: string;
  mainPlan: PaidSubscriptionPlan;
  productType: ProductType;
  nextPaymentDate: string | null;
  amountUpdateStateChange: Dispatch<SetStateAction<number | null>>;
}

export const ContributionUpdateAmount = (
  props: ContributionUpdateAmountProps
) => {
  enum Status {
    OVERVIEW,
    EDITING,
    CONFIRMED
  }

  const [status, setStatus] = useState<Status>(Status.OVERVIEW);
  const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);

  const currentAmount = confirmedAmount || props.mainPlan.amount / 100;

  if (status === Status.EDITING) {
    return (
      <ContributionUpdateAmountForm
        {...props}
        currentAmount={currentAmount}
        onUpdateConfirmed={updatedAmount => {
          setConfirmedAmount(updatedAmount);
          setStatus(Status.CONFIRMED);
        }}
      />
    );
  }

  return (
    <>
      {status === Status.CONFIRMED && (
        <SuccessMessage
          message={`We have successfully updated the amount of your contribution. ${props.nextPaymentDate &&
            `This amount will be taken on ${formatDateStr(
              props.nextPaymentDate
            )}. `}Thank you for supporting the Guardian.`}
          additionalCss={css`
            margin-bottom: ${space[5]}px;
          `}
        />
      )}
      <ProductDescriptionListTable
        borderColour={palette.neutral[86]}
        content={[
          {
            title: `${capitalize(
              augmentInterval(props.mainPlan.interval)
            )} amount`,
            value: `${props.mainPlan.currency}${currentAmount.toFixed(2)} ${
              props.mainPlan.currencyISO
            }`
          }
        ]}
      />
      <Button
        colour={palette.brand[800]}
        textColour={palette.brand[400]}
        fontWeight="bold"
        text="Change amount"
        onClick={() => {
          setStatus(Status.EDITING);
        }}
      />
    </>
  );
};

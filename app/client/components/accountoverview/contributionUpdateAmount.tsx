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
  const [showForm, setFormDisplayStatus] = useState<boolean>(false);
  const [showConfirmation, setConfirmationStatus] = useState<boolean>(false);
  const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);

  if (showForm) {
    return (
      <ContributionUpdateAmountForm
        {...props}
        onUpdateConfirmed={updatedAmount => {
          setConfirmedAmount(updatedAmount);
          setFormDisplayStatus(false);
          setConfirmationStatus(true);
        }}
      />
    );
  } else if (showConfirmation && confirmedAmount) {
    return (
      <>
        <SuccessMessage
          message={`We have successfully updated the amount of your contribution. ${props.nextPaymentDate &&
            `This amount will be taken on ${formatDateStr(
              props.nextPaymentDate
            )}. `}Thank you for supporting the Guardian.`}
          additionalCss={css`
            margin-bottom: ${space[5]}px;
          `}
        />
        <ProductDescriptionListTable
          borderColour={palette.neutral[86]}
          content={[
            {
              title: `${capitalize(
                augmentInterval(props.mainPlan.interval)
              )} amount`,
              value: `${props.mainPlan.currency}${confirmedAmount.toFixed(2)} ${
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
            setConfirmationStatus(false);
          }}
        />
      </>
    );
  }

  return (
    <>
      <ProductDescriptionListTable
        borderColour={palette.neutral[86]}
        content={[
          {
            title: `${capitalize(
              augmentInterval(props.mainPlan.interval)
            )} amount`,
            value: `${props.mainPlan.currency}${(
              props.mainPlan.amount / 100
            ).toFixed(2)} ${props.mainPlan.currencyISO}`
          }
        ]}
      />
      <Button
        colour={palette.brand[800]}
        textColour={palette.brand[400]}
        fontWeight="bold"
        text="Change amount"
        onClick={() => {
          setFormDisplayStatus(true);
        }}
      />
    </>
  );
};

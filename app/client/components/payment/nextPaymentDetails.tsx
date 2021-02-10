import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand } from "@guardian/src-foundations/palette";
import React from "react";
import { DateHelper } from "../../../shared/dates";
import {
  augmentInterval,
  isPaidSubscriptionPlan,
  isSixForSix,
  Subscription,
  SubscriptionPlan
} from "../../../shared/productResponse";
import { InfoIconDark } from "../svgs/infoIconDark";

export interface NextPaymentDetails {
  paymentKey: string;
  paymentValue: string;
  isNewPaymentValue?: boolean;
  nextPaymentDateKey: string;
  nextPaymentDateValue?: string;
}

export const getNextPaymentDetails = (
  mainPlan: SubscriptionPlan,
  subscription: Subscription,
  overiddenAmount: number | null,
  hasPaymentFailure: boolean
): NextPaymentDetails | undefined => {
  const paidFuturePlans = subscription.futurePlans.filter(
    isPaidSubscriptionPlan
  );
  const planAfterMainPlan =
    paidFuturePlans[0] === mainPlan ? paidFuturePlans[1] : paidFuturePlans[0];
  if (isPaidSubscriptionPlan(mainPlan)) {
    const paymentKey = `Next ${augmentInterval(
      subscription.currentPlans.length !== 0 &&
        isSixForSix(mainPlan.name) &&
        planAfterMainPlan
        ? planAfterMainPlan.interval
        : mainPlan.interval
    )} payment`;

    const paymentValue = `${mainPlan.currency}${(
      overiddenAmount ||
      (subscription.nextPaymentPrice || mainPlan.amount) / 100.0
    ).toFixed(2)} ${mainPlan.currencyISO}`;

    const nextPaymentDateValue =
      !hasPaymentFailure && subscription.nextPaymentDate
        ? DateHelper(
            subscription.currentPlans.length === 0
              ? mainPlan.start
              : subscription.nextPaymentDate
          ).dateStr()
        : undefined;

    const isNewPaymentValue =
      planAfterMainPlan &&
      mainPlan.amount !== planAfterMainPlan.amount &&
      !isSixForSix(mainPlan.name);

    return {
      paymentKey,
      paymentValue,
      isNewPaymentValue,
      nextPaymentDateKey: "Next payment date",
      nextPaymentDateValue
    };
  }
};

export const NewPaymentPriceAlert = () => (
  <span
    css={css`
      display: flex;
      align-items: center;
    `}
  >
    <span
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      `}
    >
      <InfoIconDark fillColor={brand[500]} />
    </span>
    <span
      css={css`
        margin-left: ${space[1]}px;
      `}
    >
      New price
    </span>
  </span>
);

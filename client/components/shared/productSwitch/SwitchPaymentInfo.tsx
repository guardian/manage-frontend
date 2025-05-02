import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { BillingPeriod } from '@/shared/productResponse';
import { getBillingPeriodAdjective } from '../../../../shared/productTypes';
import { formatAmount } from '../../../utilities/utils';

export const SwitchPaymentInfo = ({
	amountPayableToday,
	alreadyPayingAboveThreshold,
	currencySymbol,
	supporterPlusPurchaseAmount,
	billingPeriod,
	nextPaymentDate,
}: {
	amountPayableToday: number;
	alreadyPayingAboveThreshold: boolean;
	currencySymbol: string;
	supporterPlusPurchaseAmount: number;
	billingPeriod: BillingPeriod;
	nextPaymentDate: string;
}) => {
	const monthlyOrAnnual =
		getBillingPeriodAdjective(billingPeriod).toLowerCase();

	return (
		<>
			<strong
				css={css`
					padding-bottom: ${space[1]}px;
				`}
			>
				{amountPayableToday > 0 &&
					`Your first payment will be
									${alreadyPayingAboveThreshold ? 'just' : ''}
									${currencySymbol}${formatAmount(amountPayableToday)}`}
				{amountPayableToday == 0 &&
					"There's nothing extra to pay today"}
			</strong>
			<p>
				{amountPayableToday > 0 &&
					`We will charge you a smaller amount today, to
								offset the payment you've already given us for
								the rest of the ${billingPeriod}.`}
				{amountPayableToday == 0 &&
					`We won't charge you today, as your current payment covers you for the rest of the ${billingPeriod}.`}{' '}
				After this, from {nextPaymentDate}, your new {monthlyOrAnnual}{' '}
				payment will be {currencySymbol}
				{formatAmount(supporterPlusPurchaseAmount)}.
			</p>
			<p>
				You will be charged the subscription and contribution amounts
				using your chosen payment method at each renewal, at the rate
				then in effect, unless you cancel.
			</p>
		</>
	);
};

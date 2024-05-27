import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { parseDate } from '../../../../shared/dates';
import type {
	Subscription,
	SubscriptionPlan,
} from '../../../../shared/productResponse';
import {
	augmentBillingPeriod,
	isPaidSubscriptionPlan,
	isSixForSix,
} from '../../../../shared/productResponse';
import { InfoIconDark } from './assets/InfoIconDark';

export interface NextPaymentDetails {
	paymentInterval: string;
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
	hasPaymentFailure: boolean,
): NextPaymentDetails | undefined => {
	const paidFuturePlans = subscription.futurePlans.filter(
		isPaidSubscriptionPlan,
	);
	const planAfterMainPlan =
		paidFuturePlans[0] === mainPlan
			? paidFuturePlans[1]
			: paidFuturePlans[0];
	if (isPaidSubscriptionPlan(mainPlan)) {
		const paymentInterval =
			subscription.currentPlans.length !== 0 &&
			isSixForSix(mainPlan.name) &&
			planAfterMainPlan
				? planAfterMainPlan.billingPeriod
				: mainPlan.billingPeriod;

		const paymentKey = `Next ${augmentBillingPeriod(
			paymentInterval,
		)} payment`;

		const paymentValue =
			subscription.readerType === 'Patron'
				? 'not applicable'
				: `${mainPlan.currency}${(
						overiddenAmount ||
						(subscription.nextPaymentPrice ?? mainPlan.price) /
							100.0
				  ).toFixed(2)} ${mainPlan.currencyISO}`;

		const nextPaymentDateValue =
			subscription.readerType === 'Patron'
				? 'not applicable'
				: !hasPaymentFailure && subscription.nextPaymentDate
				? parseDate(
						subscription.currentPlans.length === 0
							? mainPlan.start
							: subscription.nextPaymentDate,
				  ).dateStr()
				: undefined;

		const isNewPaymentValue =
			planAfterMainPlan &&
			mainPlan.price !== planAfterMainPlan.price &&
			!isSixForSix(mainPlan.name);

		return {
			paymentInterval,
			paymentKey,
			paymentValue,
			isNewPaymentValue,
			nextPaymentDateKey: 'Next payment date',
			nextPaymentDateValue,
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
			<InfoIconDark fillColor={palette.brand[500]} />
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

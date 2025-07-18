import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { parseDate } from '../../../../shared/dates';
import type {
	BillingPeriod,
	PaidSubscriptionPlan,
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
	paymentInterval: BillingPeriod;
	paymentKey: string;
	paymentValue: string;
	paymentValueShort: string;
	isNewPaymentValue?: boolean;
	nextPaymentDateKey: string;
	nextPaymentDateValue?: string;
	currentPriceValue?: string;
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

		const getPaymentValue = (shortVersion?: 'short') => {
			if (subscription.readerType === 'Patron') {
				return 'not applicable';
			}
			const amount =
				overiddenAmount ||
				(subscription.nextPaymentPrice ?? mainPlan.price) / 100; // we have kept the null coalessing check in here incase MDAPI returns a null value for nextPaymentPrice (not expected)
			if (shortVersion === 'short') {
				return `${mainPlan.currency}${
					Number.isInteger(amount) ? amount : amount.toFixed(2)
				}`;
			}
			return `${mainPlan.currency}${amount.toFixed(2)} ${
				mainPlan.currencyISO
			}`;
		};

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

		const currentPaidSubscriptionPlan: PaidSubscriptionPlan | undefined = (
			subscription.currentPlans[0] as PaidSubscriptionPlan
		)?.price
			? (subscription.currentPlans[0] as PaidSubscriptionPlan)
			: undefined;

		return {
			paymentInterval,
			paymentKey,
			paymentValue: getPaymentValue(),
			paymentValueShort: getPaymentValue('short'),
			isNewPaymentValue,
			nextPaymentDateKey: 'Next payment date',
			nextPaymentDateValue,
			currentPriceValue: currentPaidSubscriptionPlan
				? `${currentPaidSubscriptionPlan.currency}${(
						currentPaidSubscriptionPlan.price / 100
				  ).toFixed(2)} ${currentPaidSubscriptionPlan.currencyISO}`
				: getPaymentValue(),
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

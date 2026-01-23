import { isOneOf } from '@guardian/libs';
import type { PaidSubscriptionPlan } from '../../../shared/productResponse';
import { type CurrencyIso, CurrencyIsos } from '../currencyIso';

/* 
	Pricing for 2026 Membership Price Rise and Save Journey
*/
const billingPeriods = ['month', 'year'] as const;

const newSupporterMembershipByCountryGroup: Record<
	CurrencyIso,
	Record<'month' | 'year', number>
> = {
	GBP: {
		month: 10,
		year: 100,
	},
	USD: {
		month: 13,
		year: 129,
	},
	EUR: {
		month: 12,
		year: 120,
	},
	AUD: {
		month: 17,
		year: 170,
	},
	CAD: {
		month: 15,
		year: 150,
	},
	NZD: {
		month: 17,
		year: 170,
	},
};

const oldSupporterMembershipByCountryGroup: Record<
	CurrencyIso,
	Record<'month' | 'year', number>
> = {
	GBP: {
		month: 7,
		year: 80,
	},
	USD: {
		month: 10,
		year: 95,
	},
	EUR: {
		month: 10,
		year: 95,
	},
	AUD: {
		month: 15,
		year: 160,
	},
	CAD: {
		month: 13,
		year: 120,
	},
	NZD: {
		month: 15,
		year: 160,
	},
};

function getMembershipPrice(
	{ currencyISO, billingPeriod }: PaidSubscriptionPlan,
	pricePerCurrency: Record<CurrencyIso, Record<'month' | 'year', number>>,
): number {
	if (!isOneOf(CurrencyIsos)(currencyISO)) {
		throw new Error('Unsupported membership currency');
	}

	if (!isOneOf(billingPeriods)(billingPeriod)) {
		throw new Error('Unsupported membership billing period');
	}

	return pricePerCurrency[currencyISO][billingPeriod];
}

export function getNewMembershipPrice(plan: PaidSubscriptionPlan): number {
	return getMembershipPrice(plan, newSupporterMembershipByCountryGroup);
}

export function getOldMembershipPrice(plan: PaidSubscriptionPlan): number {
	return getMembershipPrice(plan, oldSupporterMembershipByCountryGroup);
}

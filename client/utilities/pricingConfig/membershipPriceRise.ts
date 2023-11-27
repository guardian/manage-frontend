import { isOneOf } from '@guardian/libs';
import type { PaidSubscriptionPlan } from '../../../shared/productResponse';

/* 
	Pricing for 2023 Membership Price Rise and Save Journey
*/
const MembershipCurrencyIsos = ['GBP', 'USD', 'AUD', 'EUR', 'CAD'] as const;
type MembershipCurrencyIso = typeof MembershipCurrencyIsos[number];
const billingPeriods = ['month', 'year'] as const;

const newSupporterMembershipByCountryGroup: Record<
	MembershipCurrencyIso,
	Record<'month' | 'year', number>
> = {
	GBP: {
		month: 7,
		year: 75,
	},
	USD: {
		month: 9.99,
		year: 120,
	},
	EUR: {
		month: 9.99,
		year: 95,
	},
	AUD: {
		month: 14.99,
		year: 160,
	},
	CAD: {
		month: 12.99,
		year: 120,
	},
};

const oldSupporterMembershipByCountryGroup: Record<
	MembershipCurrencyIso,
	Record<'month' | 'year', number>
> = {
	GBP: {
		month: 5,
		year: 49,
	},
	USD: {
		month: 6.99,
		year: 69,
	},
	EUR: {
		month: 4.99,
		year: 49,
	},
	AUD: {
		month: 10,
		year: 100,
	},
	CAD: {
		month: 6.99,
		year: 69,
	},
};

function getMembershipPrice(
	{ currencyISO, billingPeriod }: PaidSubscriptionPlan,
	pricePerCurrency: Record<
		MembershipCurrencyIso,
		Record<'month' | 'year', number>
	>,
): number {
	if (!isOneOf(MembershipCurrencyIsos)(currencyISO)) {
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

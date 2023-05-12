import type { PaidSubscriptionPlan } from '../../shared/productResponse';
import type { MembershipCurrencyIso } from './currencyIso';

//ToDo: TBC annual prices
const newSupporterMembershipByCountryGroup: Record<
	MembershipCurrencyIso,
	Record<'Monthly' | 'Annual', number>
> = {
	GBP: {
		Monthly: 7,
		Annual: 0,
	},
	USD: {
		Monthly: 9.99,
		Annual: 0,
	},
	EUR: {
		Monthly: 9.99,
		Annual: 0,
	},
	AUD: {
		Monthly: 14.99,
		Annual: 0,
	},
	CAD: {
		Monthly: 12.99,
		Annual: 0,
	},
};

const oldSupporterMembershipByCountryGroup: Record<
	MembershipCurrencyIso,
	Record<'Monthly' | 'Annual', number>
> = {
	GBP: {
		Monthly: 5,
		Annual: 49,
	},
	USD: {
		Monthly: 6.99,
		Annual: 69,
	},
	EUR: {
		Monthly: 4.99,
		Annual: 49,
	},
	AUD: {
		Monthly: 10,
		Annual: 100,
	},
	CAD: {
		Monthly: 6.99,
		Annual: 69,
	},
};

function getMembershipPrice(
	plan: PaidSubscriptionPlan,
	pricePerCurrency: Record<
		MembershipCurrencyIso,
		Record<'Monthly' | 'Annual', number>
	>,
) {
	const currency = plan.currencyISO as MembershipCurrencyIso;
	const monthlyOrAnnual =
		plan.billingPeriod === 'month' ? 'Monthly' : 'Annual';

	const currencyPricing = pricePerCurrency[currency];

	if (currencyPricing === undefined) {
		throw new Error('Unsupported membership currency');
	}

	return currencyPricing[monthlyOrAnnual];
}

export function getNewMembershipPrice(plan: PaidSubscriptionPlan): number {
	return getMembershipPrice(plan, newSupporterMembershipByCountryGroup);
}

export function getOldMembershipPrice(plan: PaidSubscriptionPlan): number {
	return getMembershipPrice(plan, oldSupporterMembershipByCountryGroup);
}

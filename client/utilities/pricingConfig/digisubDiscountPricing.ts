import { isOneOf } from '@guardian/libs';
import type { PaidSubscriptionPlan } from '@/shared/productResponse';
import { type CurrencyIso, CurrencyIsos } from '../currencyIso';

/* 
	Pricing for 2023 Digisub Price Rise and Save Journey
*/
const billingPeriods = ['month', 'quarter', 'year'] as const;
type BillingPeriod = typeof billingPeriods[number];

const oldDigisubPricePerCurrency: Record<
	CurrencyIso,
	Record<BillingPeriod, number>
> = {
	GBP: {
		month: 11.99,
		quarter: 35.95,
		year: 119,
	},
	USD: {
		month: 19.99,
		quarter: 59.95,
		year: 199,
	},
	EUR: {
		month: 14.99,
		quarter: 44.95,
		year: 149,
	},
	CAD: {
		month: 21.95,
		quarter: 65.85,
		year: 219,
	},
	AUD: {
		month: 21.5,
		quarter: 64.5,
		year: 215,
	},
	NZD: {
		month: 21.5,
		quarter: 64.5,
		year: 215,
	},
};

const newDigisubPricePerCurrency: Record<
	CurrencyIso,
	Record<BillingPeriod, number>
> = {
	GBP: {
		month: 14.99,
		quarter: 44.94,
		year: 149,
	},
	USD: {
		month: 24.99,
		quarter: 74.94,
		year: 249,
	},
	EUR: {
		month: 18.99,
		quarter: 56.19,
		year: 187,
	},
	CAD: {
		month: 27.44,
		quarter: 82.31,
		year: 274,
	},
	AUD: {
		month: 26.99,
		quarter: 79.99,
		year: 269.99,
	},
	NZD: {
		month: 26.99,
		quarter: 79.99,
		year: 269.99,
	},
};

function getDigisubPrice(
	{ currencyISO, billingPeriod }: PaidSubscriptionPlan,
	pricePerCurrency: Record<CurrencyIso, Record<BillingPeriod, number>>,
): number {
	if (!isOneOf(billingPeriods)(billingPeriod)) {
		throw new Error('Unsupported digisub billing period');
	}

	// Use USD for International pricing as fallback
	if (!isOneOf(CurrencyIsos)(currencyISO)) {
		return pricePerCurrency['USD'][billingPeriod];
	}

	return pricePerCurrency[currencyISO][billingPeriod];
}

export function getNewDigisubPrice(plan: PaidSubscriptionPlan): number {
	return getDigisubPrice(plan, newDigisubPricePerCurrency);
}

export function getOldDigisubPrice(plan: PaidSubscriptionPlan): number {
	return getDigisubPrice(plan, oldDigisubPricePerCurrency);
}

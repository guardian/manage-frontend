import type { CurrencyIso } from '../currencyIso';

type PriceConfig = {
	minAmount: number;
	maxAmount: number;
};

export const supporterPlusPriceConfigByCountryGroup: Record<
	CurrencyIso | 'international',
	Record<string, PriceConfig>
> = {
	GBP: {
		month: { minAmount: 14, maxAmount: 166 },
		year: { minAmount: 140, maxAmount: 2000 },
	},
	USD: {
		month: { minAmount: 18, maxAmount: 800 },
		year: { minAmount: 180, maxAmount: 10000 },
	},
	EUR: {
		month: { minAmount: 14, maxAmount: 166 },
		year: { minAmount: 140, maxAmount: 2000 },
	},
	AUD: {
		month: { minAmount: 25, maxAmount: 200 },
		year: { minAmount: 250, maxAmount: 2000 },
	},
	NZD: {
		month: { minAmount: 25, maxAmount: 200 },
		year: { minAmount: 250, maxAmount: 2000 },
	},
	CAD: {
		month: { minAmount: 18, maxAmount: 166 },
		year: { minAmount: 180, maxAmount: 2000 },
	},
	international: {
		month: { minAmount: 18, maxAmount: 166 },
		year: { minAmount: 180, maxAmount: 2000 },
	},
};

export function getBenefitsThreshold(
	currency: CurrencyIso,
	billingPeriod: 'month' | 'year',
): number {
	const region =
		supporterPlusPriceConfigByCountryGroup[currency] ??
		supporterPlusPriceConfigByCountryGroup['international'];
	return region[billingPeriod].minAmount;
}

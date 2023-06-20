import type { CurrencyIso } from './currencyIso';

type PriceConfig = {
	minAmount: number;
	maxAmount: number;
};

export const supporterPlusPriceConfigByCountryGroup: Record<
	CurrencyIso | 'international',
	Record<string, PriceConfig>
> = {
	GBP: {
		Monthly: { minAmount: 10, maxAmount: 166 },
		Annual: { minAmount: 95, maxAmount: 2000 },
	},
	USD: {
		Monthly: { minAmount: 13, maxAmount: 800 },
		Annual: { minAmount: 120, maxAmount: 10000 },
	},
	EUR: {
		Monthly: { minAmount: 10, maxAmount: 166 },
		Annual: { minAmount: 95, maxAmount: 2000 },
	},
	AUD: {
		Monthly: { minAmount: 17, maxAmount: 200 },
		Annual: { minAmount: 160, maxAmount: 2000 },
	},
	NZD: {
		Monthly: { minAmount: 17, maxAmount: 200 },
		Annual: { minAmount: 160, maxAmount: 2000 },
	},
	CAD: {
		Monthly: { minAmount: 13, maxAmount: 166 },
		Annual: { minAmount: 120, maxAmount: 2000 },
	},
	international: {
		Monthly: { minAmount: 13, maxAmount: 166 },
		Annual: { minAmount: 120, maxAmount: 2000 },
	},
};

export function getBenefitsThreshold(
	currency: CurrencyIso,
	billingPeriod: 'Monthly' | 'Annual',
): number {
	const region =
		supporterPlusPriceConfigByCountryGroup[currency] ??
		supporterPlusPriceConfigByCountryGroup['international'];
	return region[billingPeriod].minAmount;
}

export function suggestedAmounts(currentAmount: number) {
	const firstValue = currentAmount + 2;

	const secondValue = Math.ceil((firstValue + 1) / 5) * 5;

	const thirdValue = secondValue + 5;

	return [firstValue, secondValue, thirdValue];
}

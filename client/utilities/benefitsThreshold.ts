import type { CurrencyIso } from './currencyIso';

export const benefitsThresholdsByCountryGroup: Record<
	CurrencyIso | 'international',
	Record<string, number>
> = {
	GBP: {
		Monthly: 10,
		Annual: 95,
	},
	USD: {
		Monthly: 13,
		Annual: 120,
	},
	EUR: {
		Monthly: 10,
		Annual: 95,
	},
	AUD: {
		Monthly: 17,
		Annual: 160,
	},
	NZD: {
		Monthly: 17,
		Annual: 160,
	},
	CAD: {
		Monthly: 13,
		Annual: 120,
	},
	international: {
		Monthly: 13,
		Annual: 120,
	},
};

export function getBenefitsThreshold(
	currency: CurrencyIso,
	billingPeriod: 'Monthly' | 'Annual',
): number {
	const region =
		benefitsThresholdsByCountryGroup[currency] ??
		benefitsThresholdsByCountryGroup['international'];
	return region[billingPeriod];
}

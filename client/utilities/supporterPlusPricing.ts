import type { PaidSubscriptionPlan } from '../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../shared/productTypes';
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
		month: { minAmount: 10, maxAmount: 166 },
		year: { minAmount: 95, maxAmount: 2000 },
	},
	USD: {
		month: { minAmount: 13, maxAmount: 800 },
		year: { minAmount: 120, maxAmount: 10000 },
	},
	EUR: {
		month: { minAmount: 10, maxAmount: 166 },
		year: { minAmount: 95, maxAmount: 2000 },
	},
	AUD: {
		month: { minAmount: 17, maxAmount: 200 },
		year: { minAmount: 160, maxAmount: 2000 },
	},
	NZD: {
		month: { minAmount: 17, maxAmount: 200 },
		year: { minAmount: 160, maxAmount: 2000 },
	},
	CAD: {
		month: { minAmount: 13, maxAmount: 166 },
		year: { minAmount: 120, maxAmount: 2000 },
	},
	international: {
		month: { minAmount: 13, maxAmount: 166 },
		year: { minAmount: 120, maxAmount: 2000 },
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

export function getSuggestedAmounts(
	currentAmount: number,
	monthlyOrAnnual: 'Monthly' | 'Annual',
) {
	return monthlyOrAnnual === 'Monthly'
		? suggestedAmountsMonthly(currentAmount)
		: suggestedAmountsAnnual(currentAmount);
}

export function getSuggestedAmountsFromMainPlan(
	mainPlan: PaidSubscriptionPlan,
) {
	const currentAmount = mainPlan.price / 100;
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);

	return getSuggestedAmounts(currentAmount, monthlyOrAnnual);
}

function suggestedAmountsMonthly(currentAmount: number) {
	const firstValue = currentAmount + 2;

	const secondValue = Math.ceil((firstValue + 1) / 5) * 5;

	const thirdValue = secondValue + 5;

	return [firstValue, secondValue, thirdValue];
}

function suggestedAmountsAnnual(currentAmount: number) {
	const percentageStepUps = [1.1, 1.25, 1.5];

	return percentageStepUps.map(
		(p) => Math.round((currentAmount * p) / 5) * 5,
	);
}

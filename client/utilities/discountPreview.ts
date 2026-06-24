import type { MonthsOrYears } from '@/shared/dates';

interface NonDiscountedPayments {
	date: string;
	amount: number;
}

export type DiscountPreviewResponse = {
	discountedPrice: number;
	discountPercentage: number; // if this figure is anything other than 100 then you know your dealing with a percentage style offer
	upToPeriods: number;
	upToPeriodsType: MonthsOrYears;
	firstDiscountedPaymentDate: string;
	nextNonDiscountedPaymentDate: string;
	nonDiscountedPayments: NonDiscountedPayments[];
};

export const getMaxNonDiscountedPrice = (
	nonDiscountedPayments: NonDiscountedPayments[],
	asHumanReadable?: boolean,
) => {
	const allNonDiscountedAmounts = nonDiscountedPayments.map((p) => p.amount);
	const maxNonDiscountedPrice = Math.max(...allNonDiscountedAmounts);
	if (!asHumanReadable) {
		return maxNonDiscountedPrice;
	}
	return Number.isInteger(maxNonDiscountedPrice)
		? maxNonDiscountedPrice
		: maxNonDiscountedPrice.toFixed(2);
};

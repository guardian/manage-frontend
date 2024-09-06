interface NonDiscountedPayments {
	date: string;
	amount: number;
}

export type DiscountPreviewResponse = {
	discountedPrice: number;
	upToPeriods: number;
	upToPeriodsType: string;
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

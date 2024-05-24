export type DiscountPreviewResponse = {
	discountedPrice: number;
	upToPeriods: number;
	upToPeriodsType: string;
	firstDiscountedPaymentDate: string;
	nextNonDiscountedPaymentDate: string;
};

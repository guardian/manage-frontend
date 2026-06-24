export interface SwitchDiscountResponse {
	discountedPrice: number;
	discountPercentage: number;
	upToPeriods: number;
	upToPeriodsType: 'Years' | 'Months' | 'Weeks' | 'Days';
}

export interface SwitchPreviewResponse {
	amountPayableToday: number;
	supporterPlusPurchaseAmount: number;
	contributionRefundAmount: number;
	nextPaymentDate: string;
	discount?: SwitchDiscountResponse;
}

export interface UpgradePreviewResponse {
	amountPayableToday: number;
	proratedRefundAmount: number;
	targetCatalogPrice: number;
	nextPaymentDate: string;
	discount?: SwitchDiscountResponse;
}

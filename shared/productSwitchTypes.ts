export type ProductSwitchType =
	| 'to-recurring-contribution'
	| 'recurring-contribution-to-supporter-plus';

export interface SwitchPreviewResponse {
	amountPayableToday: number;
	supporterPlusPurchaseAmount: number;
	contributionRefundAmount: number;
	nextPaymentDate: string;
	discount?: {
		discountedPrice: number;
		discountPercentage: number;
		upToPeriods: number;
		upToPeriodsType: 'Years' | 'Months' | 'Weeks' | 'Days';
	};
}

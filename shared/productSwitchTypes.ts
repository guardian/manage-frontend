export type ProductSwitchType =
	| 'to-recurring-contribution'
	| 'recurring-contribution-to-supporter-plus'
	| 'change-billing-frequency-from-monthly-to-annual';

export interface PreviewResponse {
	amountPayableToday: number;
	supporterPlusPurchaseAmount: number;
	contributionRefundAmount: number;
	nextPaymentDate: string;
	checkChargeAmountBeforeUpdate: boolean;
}

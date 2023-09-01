export type ProductSwitchType =
	| 'to-recurring-contribution'
	| 'recurring-contribution-to-supporter-plus';

export interface PreviewResponse {
	amountPayableToday: number;
	supporterPlusPurchaseAmount: number;
	nextPaymentDate: string;
	checkChargeAmountBeforeUpdate: boolean;
}

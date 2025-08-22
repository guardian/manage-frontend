import type { SwitchPreviewResponse } from '../../shared/productSwitchTypes';

export const productMovePreviewResponse: SwitchPreviewResponse = {
	amountPayableToday: 5.0,
	supporterPlusPurchaseAmount: 12.0,
	contributionRefundAmount: -5,
	nextPaymentDate: '2023-03-20',
};

export const productMoveSuccessfulResponse = {
	message: 'Product move completed successfully',
};

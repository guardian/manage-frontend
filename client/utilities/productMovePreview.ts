// These functions are client side versions of logic performed in the product-move-api to render preview details
// They are duplicated here to avoid making many api calls if a user selects different amounts that require preview

/**
 * calculate the amount a user will pay at the time they switch product
 */
export function calculateAmountPayableToday(
	userChosenAmount: number,
	contributionRefundAmount: number,
): number {
	// contributionRefundAmount will be a negative number (eg if the refund is £5 the param will be -5)
	return userChosenAmount - Math.abs(contributionRefundAmount);
}

/**
 * calculate param to pass to non-preview call to check whether the amount is less than the minimum Stripe charge
 */
export function calculateCheckChargeAmountBeforeUpdate(
	amountPayableToday: number,
): boolean {
	return amountPayableToday > 0 && amountPayableToday < 0.5;
}

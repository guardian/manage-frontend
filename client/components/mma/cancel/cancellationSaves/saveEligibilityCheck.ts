import { getNewMembershipPrice } from '@/client/utilities/pricingConfig/membershipPriceRise';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
} from '@/shared/productResponse';
import {
	getMainPlan,
	getSpecificProductTypeFromProductKey,
} from '@/shared/productResponse';
import type { OptionalCancellationReasonId } from '../cancellationReason';

export function ineligibleForSave(
	products: ProductDetail[],
	productToCancel: ProductDetail,
): boolean {
	const productType = getSpecificProductTypeFromProductKey(
		productToCancel.mmaProductKey,
	);
	if (productType.productType === 'membership') {
		return isMembershipIneligible(products, productToCancel);
	}

	return false;
}

function isMembershipIneligible(
	products: ProductDetail[],
	productToCancel: ProductDetail,
): boolean {
	const inPaymentFailure = !!products.find((product) => product.alertText);

	const hasOtherProduct = !!products.find((product) => {
		const productType = getSpecificProductTypeFromProductKey(
			product.mmaProductKey,
		);
		return (
			productType.productType != 'membership' &&
			!product.subscription.cancelledAt
		);
	});

	const membershipTierIsNotSupporter =
		productToCancel.mmaProductKey !== 'Supporter';

	const mainPlan = getMainPlan(
		productToCancel.subscription,
	) as PaidSubscriptionPlan;

	const hasBeenPriceRisen =
		getNewMembershipPrice(mainPlan) === mainPlan.price / 100;

	return (
		inPaymentFailure ||
		hasOtherProduct ||
		membershipTierIsNotSupporter ||
		hasBeenPriceRisen
	);
}

export const reasonIsEligibleForSwitch = (
	selectedReasonId: OptionalCancellationReasonId,
) =>
	selectedReasonId === 'mma_break_from_news' ||
	selectedReasonId === 'mma_benefits' ||
	selectedReasonId === 'mma_financial_circumstances' ||
	selectedReasonId === 'mma_dont_read_enough' ||
	selectedReasonId === 'mma_support_another_way' ||
	selectedReasonId === 'mma_values';

export const allowCountrySwitchDiscount = (
	billingCountry: string | undefined,
) => ['United Kingdom', 'United States'].includes(billingCountry || '');

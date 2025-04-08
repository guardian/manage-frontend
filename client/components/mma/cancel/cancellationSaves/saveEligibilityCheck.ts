import { getNewMembershipPrice } from '@/client/utilities/pricingConfig/membershipPriceRise';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
} from '@/shared/productResponse';
import { getMainPlan, getSpecificProductType } from '@/shared/productResponse';

export function ineligibleForSave(
	products: ProductDetail[],
	productToCancel: ProductDetail,
): boolean {
	const productType = getSpecificProductType(productToCancel.tier);
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
		const productType = getSpecificProductType(product.tier);
		return (
			productType.productType != 'membership' &&
			!product.subscription.cancelledAt
		);
	});

	const membershipTierIsNotSupporter = productToCancel.tier !== 'Supporter';

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

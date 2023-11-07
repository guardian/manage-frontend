import { getNewMembershipPrice } from '@/client/utilities/membershipPriceRise';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
} from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';

export function ineligibleForSave(
	products: ProductDetail[],
	productToCancel: ProductDetail,
) {
	if (productToCancel.mmaCategory === 'membership') {
		return isMembershipIneligible(products, productToCancel);
	}
}

function isMembershipIneligible(
	products: ProductDetail[],
	productToCancel: ProductDetail,
) {
	const inPaymentFailure = products.find((product) => product.alertText);

	const hasOtherProduct = products.find(
		(product) =>
			product.mmaCategory != 'membership' &&
			!product.subscription.cancelledAt,
	);

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

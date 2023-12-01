import { getNewDigisubPrice } from '@/client/utilities/pricingConfig/digisubDiscountPricing';
import { getNewMembershipPrice } from '@/client/utilities/pricingConfig/membershipPriceRise';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
	Subscription,
} from '@/shared/productResponse';
import { getMainPlan, isPaidSubscriptionPlan } from '@/shared/productResponse';

export function ineligibleForSave(
	products: ProductDetail[],
	productToCancel: ProductDetail,
): boolean {
	if (productToCancel.mmaCategory === 'membership') {
		return isMembershipIneligible(products, productToCancel);
	}

	return false;
}

function isMembershipIneligible(
	products: ProductDetail[],
	productToCancel: ProductDetail,
): boolean {
	const inPaymentFailure = !!products.find((product) => product.alertText);

	const hasOtherProduct = !!products.find(
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

export function eligibleForDigisubDiscount(
	productDetail: ProductDetail,
): boolean {
	const hasPaymentFailure = !!productDetail.alertText;
	return hasNewPrice(productDetail.subscription) && !hasPaymentFailure;
}

function hasNewPrice(subscription: Subscription): boolean {
	if (subscription.nextPaymentPrice === null) {
		return false;
	}

	const mainPlan = getMainPlan(subscription);
	if (!isPaidSubscriptionPlan(mainPlan)) {
		return false;
	}

	return subscription.nextPaymentPrice / 100 === getNewDigisubPrice(mainPlan);
}

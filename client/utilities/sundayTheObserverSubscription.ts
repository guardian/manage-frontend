import type { ProductDetail } from '@/shared/productResponse';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import type { ProductType } from '@/shared/productTypes';

export const isSundayTheObserverSubscription = (
	productType: ProductType,
	productDetail: ProductDetail,
): boolean => {
	if (
		[
			PRODUCT_TYPES.homedelivery.urlPart,
			PRODUCT_TYPES.digitalvoucher.urlPart,
		].includes(productType.urlPart)
	) {
		// Get plans
		const subscriptionPlans = (() => {
			if (productDetail.subscription.currentPlans.length > 0) {
				return productDetail.subscription.currentPlans;
			} else if (productDetail.subscription.futurePlans.length > 0) {
				return productDetail.subscription.futurePlans;
			}
			return [];
		})();

		// Look for Sunday plans only
		if (
			subscriptionPlans.length === 1 &&
			subscriptionPlans[0].daysOfWeek?.length === 1 &&
			subscriptionPlans[0].daysOfWeek[0] === 'Sunday'
		) {
			return true;
		}
	}
	return false;
};

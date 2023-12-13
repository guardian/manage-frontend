import { isOneOf } from '@guardian/libs';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
	type ProductDetail,
} from '@/shared/productResponse';

const billingPeriods = ['month', 'quarter', 'year'] as const;

export function getDiscountMonthsForDigisub(
	productDetail: ProductDetail,
): number {
	const mainPlan = getMainPlan(productDetail.subscription);

	if (!isPaidSubscriptionPlan(mainPlan)) {
		throw new Error('Unexpected digisub plan type');
	}

	if (!isOneOf(billingPeriods)(mainPlan.billingPeriod)) {
		throw new Error('Unsupported digisub billing period');
	}

	switch (mainPlan.billingPeriod) {
		case 'month':
			return 3;
		case 'quarter':
			return 3;
		case 'year':
			return 12;
	}
}

import { isOneOf } from '@guardian/libs';
import { conf } from '@/server/config';
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

export function getDiscountRatePlanId(months: number): string {
	return MonthsToDiscountRatePlanIdMapping[conf.STAGE][months];
}

const MonthsToDiscountRatePlanIdMapping: Record<
	string,
	Record<number, string>
> = {
	DEV: {
		3: '2c92c0f962cec7990162d3882afc52dd',
		12: '8ad08f068b5b9ca2018b5cadf0897ed3',
	},
	CODE: {
		3: '2c92c0f962cec7990162d3882afc52dd',
		12: '8ad08f068b5b9ca2018b5cadf0897ed3',
	},
	PROD: {
		3: '2c92a0ff64176cd40164232c8ec97661',
		12: '8a128adf8b64bcfd018b6b6fdc7674f5',
	},
};

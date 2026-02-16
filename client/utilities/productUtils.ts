import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../shared/identity';
import type { ProductDetail } from '../../shared/productResponse';
import { MDA_TEST_USER_HEADER } from '../../shared/productResponse';
import type {
	AllProductsProductTypeFilterString,
	ProductType,
	ProductTypeWithCancellationFlow,
	ProductTypeWithDeliveryRecordsProperties,
	ProductTypeWithHolidayStopsFlow,
} from '../../shared/productTypes';
import { nonServiceableCountries } from '../components/mma/shared/NonServiceableCountries';
import { baseSupporterPlus } from '../fixtures/productBuilder/baseProducts';
import { fetchWithDefaultParameters } from './fetch';

export const shouldHaveHolidayStopsFlow = (
	productType: ProductType,
): productType is ProductTypeWithHolidayStopsFlow => !!productType.holidayStops;

export const membershipToContribFetch = (
	subscriptionId: string,
	price: number,
	preview: boolean,
	isTestUser: boolean,
) =>
	fetch(`/api/product-move/to-recurring-contribution/${subscriptionId}`, {
		method: 'POST',
		body: JSON.stringify({ preview, price }),
		headers: {
			'Content-Type': 'application/json',
			[MDA_TEST_USER_HEADER]: `${isTestUser}`,
		},
	});

export const contribToSupporterPlusFetch = (
	subscriptionId: string,
	preview: boolean,
	isTestUser: boolean,
	applyDiscountIfAvailable?: boolean,
	chosenAmount?: number,
) =>
	fetch(
		`/api/product-move/recurring-contribution-to-supporter-plus/${subscriptionId}`,
		{
			method: 'POST',
			body: JSON.stringify({
				preview,
				applyDiscountIfAvailable,
				newAmount: chosenAmount,
			}),
			headers: {
				'Content-Type': 'application/json',
				[MDA_TEST_USER_HEADER]: `${isTestUser}`,
			},
		},
	);

export const createProductDetailFetcher =
	(
		productTypeFilter: AllProductsProductTypeFilterString,
		subscriptionName?: string,
	) =>
	() => {
		const apiUrl =
			'/api/me/mma' +
			(subscriptionName
				? `/${subscriptionName}`
				: `?productType=${productTypeFilter}`);

		return fetchWithDefaultParameters(apiUrl, {
			headers: {
				[X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
					window.location.href,
				),
			},
		});
	};

export const createProductDetailFetch = (
	productTypeFilter: AllProductsProductTypeFilterString,
	subscriptionName?: string,
) =>
	fetchWithDefaultParameters(
		'/api/me/mma' +
			(subscriptionName
				? `/${subscriptionName}`
				: `?productType=${productTypeFilter}`),
		{
			headers: {
				[X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
					window.location.href,
				),
			},
		},
	).then((res) => res.json());

export const allRecurringProductsDetailFetcher = () =>
	fetchWithDefaultParameters('/api/me/mma', {
		headers: {
			[X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
				window.location.href,
			),
		},
	});

export const allSingleProductsDetailFetcher = () =>
	fetchWithDefaultParameters('/api/me/one-off-contributions');

export const hasCancellationFlow = (
	productType: ProductType,
): productType is ProductTypeWithCancellationFlow =>
	productType.cancellation !== undefined;

export const hasDeliveryFlow = (productType: ProductType) =>
	productType.delivery?.showAddress;

export const hasDeliveryRecordsFlow = (
	productType: ProductType,
): productType is ProductTypeWithDeliveryRecordsProperties =>
	!!productType.delivery?.records;

export function isNonServiceableCountry(productDetail: ProductDetail) {
	return nonServiceableCountries.includes(productDetail.billingCountry ?? '');
}

export const isMonthlySubscription = (
	productDetail: ProductDetail,
): boolean => {
	const futurePlan = productDetail.subscription.futurePlans[0];
	if (futurePlan && 'billingPeriod' in futurePlan) {
		return futurePlan.billingPeriod === 'month';
	}
	const mainPlan = productDetail.subscription.currentPlans[0];
	if (mainPlan && 'billingPeriod' in mainPlan) {
		return mainPlan.billingPeriod === 'month';
	}
	return false;
};

/**
 * Validates that the subscription has a SupporterPlus Monthly rate plan.
 *
 * @param productDetail The product detail to validate
 * @returns boolean - true if the subscription has a SupporterPlus Monthly rate plan
 */
export const hasSupporterPlusMonthlyRatePlan = (
	productDetail: ProductDetail,
): boolean => {
	// Check if this is a monthly subscription
	if (!isMonthlySubscription(productDetail)) {
		return false;
	}

	// Verify that active rate plans include a valid plan
	const hasValidCurrentPlans =
		productDetail.subscription.currentPlans.length > 0;
	const hasValidFuturePlans =
		productDetail.subscription.futurePlans.length > 0;

	if (!hasValidCurrentPlans && !hasValidFuturePlans) {
		return false;
	}

	return productDetail.mmaProductKey === baseSupporterPlus().mmaProductKey;
};

export const changeSubscriptionBillingFrequencyFetch = (
	isTestUser: boolean,
	subscriptionId: string,
	preview: boolean,
	targetBillingPeriod: 'Month' | 'Annual',
) =>
	fetch(`/api/product-switch/billing-frequency/${subscriptionId}`, {
		method: 'POST',
		body: JSON.stringify({
			preview,
			targetBillingPeriod,
		}),
		headers: {
			'Content-Type': 'application/json',
			[MDA_TEST_USER_HEADER]: `${isTestUser}`,
		},
	});

/**
 * Change plan modes:
 * - 'switchToBasePrice': Switch to the target product at its base/catalog price
 * - 'switchWithPriceOverride': Switch to the target product with a custom price (requires newAmount)
 * - 'save': Used for save/retention offers
 */
export type ChangePlanMode =
	| 'switchToBasePrice'
	| 'switchWithPriceOverride'
	| 'save';

/**
 * Target products for change plan:
 * - 'DigitalSubscription'
 * - 'SupporterPlus'
 */
export type ChangePlanTargetProduct = 'DigitalSubscription' | 'SupporterPlus';

export interface ChangePlanPayload {
	mode: ChangePlanMode;
	targetProduct: ChangePlanTargetProduct;
	newAmount?: number;
}

export interface ChangePlanOptions {
	subscriptionId: string;
	isTestUser: boolean;
	mode: ChangePlanMode;
	targetProduct: ChangePlanTargetProduct;
	preview?: boolean;
	newAmount?: number;
}

/**
 * Fetches change plan preview or executes the change plan.
 * This is the unified endpoint for product switches/upgrades.
 *
 * @param options - The change plan options
 * @returns Promise with the response
 *
 * @example
 * // Preview upgrade to Digital Subscription
 * await changePlanFetch({
 *   subscriptionId: 'A-S12345',
 *   isTestUser: false,
 *   mode: 'switchToBasePrice',
 *   targetProduct: 'DigitalSubscription',
 *   preview: true,
 * });
 *
 * @example
 * // Execute switch to Supporter Plus with custom amount
 * await changePlanFetch({
 *   subscriptionId: 'A-S12345',
 *   isTestUser: false,
 *   mode: 'switchWithPriceOverride',
 *   targetProduct: 'SupporterPlus',
 *   newAmount: 15,
 *   preview: false,
 * });
 */
export const changePlanFetch = ({
	subscriptionId,
	isTestUser,
	mode,
	targetProduct,
	preview = false,
	newAmount,
}: ChangePlanOptions) => {
	const endpoint = preview
		? `/api/subscriptions/${subscriptionId}/change-plan/preview`
		: `/api/subscriptions/${subscriptionId}/change-plan`;

	const payload: ChangePlanPayload = {
		mode,
		targetProduct,
		...(newAmount !== undefined && { newAmount }),
	};

	return fetch(endpoint, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
			[MDA_TEST_USER_HEADER]: `${isTestUser}`,
		},
		credentials: 'include',
	});
};

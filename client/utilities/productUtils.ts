import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../shared/identity';
import type {
	ProductDetail,
	SubscriptionPlan,
} from '../../shared/productResponse';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
	MDA_TEST_USER_HEADER,
} from '../../shared/productResponse';
import type {
	AllProductsProductTypeFilterString,
	ProductType,
	ProductTypeWithCancellationFlow,
	ProductTypeWithDeliveryRecordsProperties,
	ProductTypeWithHolidayStopsFlow,
} from '../../shared/productTypes';
import { nonServiceableCountries } from '../components/mma/shared/NonServiceableCountries';
import { fetchWithDefaultParameters } from './fetch';
import { getBenefitsThreshold } from './pricingConfig/supporterPlusPricing';

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

export const getOppositeBillingPeriod = (
	currentBillingPeriod: string | undefined,
): 'Month' | 'Annual' => {
	return currentBillingPeriod === 'month' ? 'Annual' : 'Month';
};

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

export const isReaderGivingAContribution = (
	mainPlan: SubscriptionPlan,
): boolean => {
	return (
		isPaidSubscriptionPlan(mainPlan) &&
		['month', 'year'].includes(mainPlan.billingPeriod) &&
		mainPlan.price / 100 >
			getBenefitsThreshold(
				mainPlan.currencyISO,
				mainPlan.billingPeriod as 'month' | 'year',
			)
	);
};

export const isSwitchBillingFrequencyFromMonthlyToAnnualPossible = (
	productDetail: ProductDetail,
): boolean => {
	return (
		isMonthlySubscription(productDetail) &&
		!isReaderGivingAContribution(getMainPlan(productDetail.subscription))
	);
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

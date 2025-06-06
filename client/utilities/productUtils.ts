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
) =>
	fetch(
		`/api/product-move/recurring-contribution-to-supporter-plus/${subscriptionId}`,
		{
			method: 'POST',
			body: JSON.stringify({ preview, applyDiscountIfAvailable }),
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

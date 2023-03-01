import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../shared/identity';
import type {
	AllProductsProductTypeFilterString,
	ProductType,
	ProductTypeWithCancellationFlow,
	ProductTypeWithDeliveryRecordsProperties,
	ProductTypeWithHolidayStopsFlow,
} from '../shared/productTypes';
import { fetchWithDefaultParameters } from './fetch';

export const shouldHaveHolidayStopsFlow = (
	productType: ProductType,
): productType is ProductTypeWithHolidayStopsFlow => !!productType.holidayStops;

export const createProductDetailFetcher =
	(
		productTypeFilter: AllProductsProductTypeFilterString,
		subscriptionName?: string,
	) =>
	() =>
		fetchWithDefaultParameters(
			'/api/me/mma' +
				(subscriptionName
					? `/${subscriptionName}`
					: `?productType=${productTypeFilter}`),
			{
				headers: {
					[X_GU_ID_FORWARDED_SCOPE]:
						getScopeFromRequestPathOrEmptyString(
							window.location.href,
						),
				},
			},
		);

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
	fetchWithDefaultParameters('/api/me/mma/one-off-contributions', {
		headers: {
			[X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
				window.location.href,
			),
		},
	});

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

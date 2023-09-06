import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../shared/identity';
import type { ProductDetail } from '../../shared/productResponse';
import type { ProductSwitchType } from '../../shared/productSwitchTypes';
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

export const productMoveFetch = (
	subscriptionId: string,
	chosenAmount: number,
	productSwitchType: ProductSwitchType,
	checkChargeAmountBeforeUpdate: boolean,
	preview: boolean,
) =>
	fetch(`/api/product-move/${productSwitchType}/${subscriptionId}`, {
		method: 'POST',
		body: JSON.stringify({
			price: chosenAmount,
			preview,
			checkChargeAmountBeforeUpdate,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

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

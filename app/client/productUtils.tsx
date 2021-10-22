import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../shared/identity";
import {
  ProductType,
  ProductTypeWithCancellationFlow,
  ProductTypeWithDeliveryRecordsProperties,
  ProductTypeWithHolidayStopsFlow
} from "../shared/productTypes";
import {fetchWithDefaultParameters} from "./fetch";
import {MembersDataApiItem} from "../shared/productResponse";
import {Action} from 'react-fetching-library';
import {defaultScopeHeader} from "./fetchClient";

export const shouldHaveHolidayStopsFlow = (
  productType: ProductType
): productType is ProductTypeWithHolidayStopsFlow => !!productType.holidayStops;

export const createProductDetailFetcher = (
  productType: ProductType,
  subscriptionName?: string
) => () =>
  fetchWithDefaultParameters(
    "/api/me/mma" +
    (subscriptionName
      ? `/${subscriptionName}`
      : `?productType=${productType.allProductsProductTypeFilterString}`),
    {
      headers: {
        [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
          window.location.href
        )
      }
    }
  );

export const createProductDetailEndpoint = (productType: ProductType, subscriptionName?: string): Action<MembersDataApiItem[]> => ({
  method: 'GET',
  endpoint: "/api/me/mma" +
    (subscriptionName
      ? `/${subscriptionName}`
      : `?productType=${productType.allProductsProductTypeFilterString}`),
  headers: {
    ...defaultScopeHeader
  }
})

export const allProductsDetailFetcher = () =>
  fetchWithDefaultParameters("/api/me/mma", {
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });

export const allProductsDetailEndpoint: Action<MembersDataApiItem[]> = {
  method: 'GET',
  endpoint: '/api/me/mma',
  headers: {
    [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
      window.location.href
    )
  },
};

export const hasCancellationFlow = (
  productType: ProductType
): productType is ProductTypeWithCancellationFlow =>
  productType.cancellation !== undefined;

export const hasDeliveryFlow = (productType: ProductType) =>
  productType.delivery?.showAddress;

export const hasDeliveryRecordsFlow = (
  productType: ProductType
): productType is ProductTypeWithDeliveryRecordsProperties =>
  !!productType.delivery?.records;

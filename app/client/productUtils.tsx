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

export const shouldHaveHolidayStopsFlow = (
  productType: ProductType
): productType is ProductTypeWithHolidayStopsFlow => !!productType.holidayStops;

export const createProductDetailFetcher = (
  productType: ProductType,
  subscriptionName?: string
) => () =>
  fetch(
    "/api/me/mma" +
      (subscriptionName
        ? `/${subscriptionName}`
        : `?productType=${productType.allProductsProductTypeFilterString}`),
    {
      credentials: "include",
      mode: "same-origin",
      headers: {
        [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
          window.location.href
        )
      }
    }
  );

export const allProductsDetailFetcher = () =>
  fetch("/api/me/mma", {
    credentials: "include",
    mode: "same-origin",
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });

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

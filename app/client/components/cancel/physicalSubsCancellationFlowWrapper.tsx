import moment from "moment";
import React, { ReactNode, ReactNodeArray } from "react";
import { DATE_INPUT_FORMAT, momentiseDateStr } from "../../../shared/dates";
import {
  MDA_TEST_USER_HEADER,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import AsyncLoader from "../asyncLoader";
import { DeliveryRecordsResponse } from "../delivery/records/deliveryRecordsApi";
import { OutstandingHolidayStopsResponse } from "../holiday/holidayStopApi";
import {
  cancellationEffectiveToday,
  CancellationOutstandingCreditsContext,
  CancellationPolicyContext
} from "./cancellationContexts";

type CombinedOutstandingCreditsResponse = [
  OutstandingHolidayStopsResponse | undefined,
  DeliveryRecordsResponse | undefined
];

export class OutstandingHolidayStopsAsyncLoader extends AsyncLoader<
  CombinedOutstandingCreditsResponse
> {}

export const getOutstandingCreditsFetcher = (
  productDetail: ProductDetail,
  productType: ProductType,
  cancellationPolicy: string | undefined
) => async () => {
  const effectiveCancellationDate =
    !productDetail.subscription.chargedThroughDate ||
    cancellationPolicy === cancellationEffectiveToday
      ? moment()
      : momentiseDateStr(productDetail.subscription.chargedThroughDate);

  const outstandingHolidayStopsPromise = fetch(
    `/api/holidays/${
      productDetail.subscription.subscriptionId
    }/cancel?effectiveCancellationDate=${effectiveCancellationDate.format(
      DATE_INPUT_FORMAT
    )}`,
    {
      headers: {
        [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
      }
    }
  );

  const optionalOutstandingDeliveryProblemCreditsPromise =
    productType.delivery?.records &&
    fetch(
      `/api/delivery-records/${
        productDetail.subscription.subscriptionId
      }/cancel?effectiveCancellationDate=${effectiveCancellationDate.format(
        DATE_INPUT_FORMAT
      )}`,
      {
        headers: {
          [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
        }
      }
    );

  return Promise.all([
    outstandingHolidayStopsPromise,
    ...(optionalOutstandingDeliveryProblemCreditsPromise
      ? [optionalOutstandingDeliveryProblemCreditsPromise]
      : [])
  ]);
};

export type RestOfCancellationFlow = ReactNode | ReactNodeArray;

const getContextualRestOfFlowRenderer = (
  restOfFlow: RestOfCancellationFlow
) => ([
  outstandingHolidayStops,
  outstandingDeliveryProblemCredits
]: CombinedOutstandingCreditsResponse) => (
  <CancellationOutstandingCreditsContext.Provider
    value={{
      holidayStops: outstandingHolidayStops?.publicationsToRefund,
      deliveryCredits: outstandingDeliveryProblemCredits?.results
    }}
  >
    {restOfFlow}
  </CancellationOutstandingCreditsContext.Provider>
);

export const physicalSubsCancellationFlowWrapper = (
  productDetail: ProductDetail,
  productType: ProductType
) => (restOfFlow: RestOfCancellationFlow) => (
  <CancellationPolicyContext.Consumer>
    {cancellationPolicy => (
      <OutstandingHolidayStopsAsyncLoader
        fetch={getOutstandingCreditsFetcher(
          productDetail,
          productType,
          cancellationPolicy
        )}
        render={getContextualRestOfFlowRenderer(restOfFlow)}
        loadingMessage="Checking for outstanding credits owed to you..."
      />
    )}
  </CancellationPolicyContext.Consumer>
);

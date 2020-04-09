import moment from "moment";
import React, { ReactNode, ReactNodeArray } from "react";
import { DATE_INPUT_FORMAT, momentiseDateStr } from "../../../shared/dates";
import {
  MDA_TEST_USER_HEADER,
  ProductDetail
} from "../../../shared/productResponse";
import AsyncLoader from "../asyncLoader";
import { OutstandingHolidayStopsResponse } from "../holiday/holidayStopApi";
import {
  cancellationEffectiveToday,
  CancellationOutstandingCreditsContext
} from "./cancellationContexts";

export class OutstandingHolidayStopsAsyncLoader extends AsyncLoader<
  OutstandingHolidayStopsResponse
> {}

export const getOutstandingHolidayStopsFetcher = (
  productDetail: ProductDetail,
  cancellationPolicy?: string
) => () => {
  const effectiveCancellationDate =
    !productDetail.subscription.chargedThroughDate ||
    cancellationPolicy === cancellationEffectiveToday
      ? moment()
      : momentiseDateStr(productDetail.subscription.chargedThroughDate);

  return fetch(
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
};

export type RestOfCancellationFlow = ReactNode | ReactNodeArray;

const getContextualRestOfFlowRenderer = (
  restOfFlow: RestOfCancellationFlow
) => (outstandingHolidayStops: OutstandingHolidayStopsResponse) => (
  <CancellationOutstandingCreditsContext.Provider
    value={{
      holidayStops: outstandingHolidayStops.publicationsToRefund
    }}
  >
    {restOfFlow}
  </CancellationOutstandingCreditsContext.Provider>
);

export const physicalSubsCancellationFlowWrapper = (
  productDetail: ProductDetail
) => (restOfFlow: RestOfCancellationFlow) => (
  <OutstandingHolidayStopsAsyncLoader
    fetch={getOutstandingHolidayStopsFetcher(productDetail)}
    render={getContextualRestOfFlowRenderer(restOfFlow)}
    loadingMessage="Checking for outstanding credits owed to you..."
  />
);

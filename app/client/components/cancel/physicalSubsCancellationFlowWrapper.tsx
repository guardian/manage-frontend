import React, { ReactNode, ReactNodeArray } from "react";
import {DATE_FNS_INPUT_FORMAT, parseDate, ParsedDate} from "../../../shared/dates";
import {
  MDA_TEST_USER_HEADER,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { DeliveryRecordsResponse } from "../delivery/records/deliveryRecordsApi";
import { OutstandingHolidayStopsResponse } from "../holiday/holidayStopApi";
import {
  cancellationEffectiveToday,
  CancellationOutstandingCreditsContext,
  CancellationPolicyContext
} from "./cancellationContexts";
import type {Action} from 'react-fetching-library';
import {useSuspenseQuery} from "react-fetching-library";
import DataFetcher from "../DataFetcher";

function getCancellationDate(productDetail: ProductDetail, cancellationPolicy: string | undefined): ParsedDate {
 return !productDetail.subscription.chargedThroughDate ||
 cancellationPolicy === cancellationEffectiveToday
   ? parseDate()
   : parseDate(productDetail.subscription.chargedThroughDate);
}

export function outstandingHolidayStopsEndpoint(productDetail: ProductDetail, cancellationPolicy: string | undefined): Action<OutstandingHolidayStopsResponse> {
  const effectiveCancellationDate = getCancellationDate(productDetail, cancellationPolicy);

  return {
    method: "GET",
    endpoint: `/api/holidays/${
      productDetail.subscription.subscriptionId
    }/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
      DATE_FNS_INPUT_FORMAT
    )}`,
    headers: {
      [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
    }
  }
}

export function optionalOutstandingDeliveryProblemCredits(productDetail: ProductDetail, cancellationPolicy: string | undefined): Action<DeliveryRecordsResponse> {
  const effectiveCancellationDate = getCancellationDate(productDetail, cancellationPolicy);

  return {
    method: "GET",
    endpoint: `/api/delivery-records/${
      productDetail.subscription.subscriptionId
    }/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
      DATE_FNS_INPUT_FORMAT
    )}`,
    headers: {
      [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
    }
  }
}

export type RestOfCancellationFlow = ReactNode | ReactNodeArray;

interface ContextualRestOfFlowRendererProps {
  restOfFlow: RestOfCancellationFlow;
  productDetail: ProductDetail;
  productType: ProductType;
  cancellationPolicy?: string | undefined;
}

const GetContextualRestOfFlowRenderer = (props: ContextualRestOfFlowRendererProps) => {
  const outstandingHolidayStops = useSuspenseQuery(outstandingHolidayStopsEndpoint(props.productDetail, props.cancellationPolicy)).payload as OutstandingHolidayStopsResponse;
  const outstandingDeliveryProblemCredits = useSuspenseQuery(props.productType.delivery?.records ? optionalOutstandingDeliveryProblemCredits(props.productDetail, props.cancellationPolicy) : null as unknown as Action<unknown>).payload;

  return (
  <CancellationOutstandingCreditsContext.Provider
    value={{
      holidayStops: outstandingHolidayStops.publicationsToRefund,
      deliveryCredits: outstandingDeliveryProblemCredits?.results
    }}
  >
    {props.restOfFlow}
  </CancellationOutstandingCreditsContext.Provider>
  )
}

export const physicalSubsCancellationFlowWrapper = (
  productDetail: ProductDetail,
  productType: ProductType
) => (restOfFlow: RestOfCancellationFlow) => (
  <CancellationPolicyContext.Consumer>
    {cancellationPolicy => (
      <DataFetcher loadingMessage="Checking for outstanding credits owed to you...">
        <GetContextualRestOfFlowRenderer restOfFlow={restOfFlow} productDetail={productDetail} productType={productType} cancellationPolicy={cancellationPolicy} />
      </DataFetcher>
    )}
  </CancellationPolicyContext.Consumer>
);

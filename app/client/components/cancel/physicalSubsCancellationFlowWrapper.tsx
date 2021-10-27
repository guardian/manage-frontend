import React, { ReactNode, ReactNodeArray } from "react";
import {
  DATE_FNS_INPUT_FORMAT,
  parseDate,
  ParsedDate
} from "../../../shared/dates";
import {
  MDA_TEST_USER_HEADER,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { OutstandingHolidayStopsResponse } from "../holiday/holidayStopApi";
import {
  cancellationEffectiveToday,
  CancellationOutstandingCreditsContext,
  CancellationPolicyContext
} from "./cancellationContexts";
import DataFetcher from "../DataFetcher";
import useSWR from "swr";
import serialize, { fetcher } from "../../fetchClient";

function getCancellationDate(
  productDetail: ProductDetail,
  cancellationPolicy: string | undefined
): ParsedDate {
  return !productDetail.subscription.chargedThroughDate ||
    cancellationPolicy === cancellationEffectiveToday
    ? parseDate()
    : parseDate(productDetail.subscription.chargedThroughDate);
}

export function outstandingHolidayStopsEndpoint(
  productDetail: ProductDetail,
  cancellationPolicy: string | undefined
) {
  const effectiveCancellationDate = getCancellationDate(
    productDetail,
    cancellationPolicy
  );

  return {
    endpoint: `/api/holidays/${
      productDetail.subscription.subscriptionId
    }/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
      DATE_FNS_INPUT_FORMAT
    )}`,
    config: {
      headers: {
        [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
      }
    }
  };
}

export function optionalOutstandingDeliveryProblemCredits(
  productDetail: ProductDetail,
  cancellationPolicy: string | undefined
) {
  const effectiveCancellationDate = getCancellationDate(
    productDetail,
    cancellationPolicy
  );

  return {
    endpoint: `/api/delivery-records/${
      productDetail.subscription.subscriptionId
    }/cancel?effectiveCancellationDate=${effectiveCancellationDate.dateStr(
      DATE_FNS_INPUT_FORMAT
    )}`,
    config: {
      headers: {
        [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
      }
    }
  };
}

export type RestOfCancellationFlow = ReactNode | ReactNodeArray;

interface ContextualRestOfFlowRendererProps {
  restOfFlow: RestOfCancellationFlow;
  productDetail: ProductDetail;
  productType: ProductType;
  cancellationPolicy?: string | undefined;
}

const GetContextualRestOfFlowRenderer = (
  props: ContextualRestOfFlowRendererProps
) => {
  const { endpoint, config } = outstandingHolidayStopsEndpoint(
    props.productDetail,
    props.cancellationPolicy
  );
  const credits = optionalOutstandingDeliveryProblemCredits(
    props.productDetail,
    props.cancellationPolicy
  );

  const outstandingHolidayStops = useSWR(
    props.productType.delivery?.records ? serialize(endpoint, config) : null,
    fetcher
  ).data as OutstandingHolidayStopsResponse;
  const outstandingDeliveryProblemCredits = useSWR(
    props.productType.delivery?.records
      ? serialize(credits.endpoint, credits.config)
      : null,
    fetcher
  ).data;

  if (outstandingHolidayStops) {
    return (
      <CancellationOutstandingCreditsContext.Provider
        value={{
          holidayStops: outstandingHolidayStops.publicationsToRefund,
          deliveryCredits: outstandingDeliveryProblemCredits?.results
        }}
      >
        {props.restOfFlow}
      </CancellationOutstandingCreditsContext.Provider>
    );
  } else {
    return <></>;
  }
};

export const physicalSubsCancellationFlowWrapper = (
  productDetail: ProductDetail,
  productType: ProductType
) => (restOfFlow: RestOfCancellationFlow) => (
  <CancellationPolicyContext.Consumer>
    {cancellationPolicy => (
      <DataFetcher loadingMessage="Checking for outstanding credits owed to you...">
        <GetContextualRestOfFlowRenderer
          restOfFlow={restOfFlow}
          productDetail={productDetail}
          productType={productType}
          cancellationPolicy={cancellationPolicy}
        />
      </DataFetcher>
    )}
  </CancellationPolicyContext.Consumer>
);

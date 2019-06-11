import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { Button } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";
import { navigate } from "@reach/router";
import {
  HolidayStopsLoader as HolidayStopsAsyncLoader,
  createGetHolidayStopsFetch as createGetHolidayStopsFetcher,
  GetHolidayStopsResponse,
  HolidayStopsResponseContext
} from "./holidayStopApi";

const renderHolidayStopsOverview = (
  productDetail: ProductDetail,
  routeableStepProps: RouteableStepProps
) => (holidayStopsResponse: GetHolidayStopsResponse) => (
  <HolidayStopsResponseContext.Provider value={holidayStopsResponse}>
    <WizardStep routeableStepProps={routeableStepProps}>
      <div>
        <h1>
          Suspensions Overview ({productDetail.subscription.subscriptionId})
        </h1>
        <pre>{JSON.stringify(holidayStopsResponse)}</pre>
        <Button
          text="Create suspension"
          right
          primary
          onClick={() => (routeableStepProps.navigate || navigate)("create")}
        />
      </div>
    </WizardStep>
  </HolidayStopsResponseContext.Provider>
);

export const HolidaysOverview = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Manage suspensions of"
    supportRefererSuffix="holiday_stop_flow"
    loadingMessagePrefix="Retrieving details of your"
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <MembersDataApiResponseContext.Provider value={productDetail}>
        <NavigateFnContext.Provider value={{ navigate: props.navigate }}>
          <HolidayStopsAsyncLoader
            fetch={createGetHolidayStopsFetcher(
              routeableStepProps.productType.urlPart,
              productDetail.subscription.subscriptionId
            )}
            render={renderHolidayStopsOverview(
              productDetail,
              routeableStepProps
            )}
            loadingMessage="Loading existing suspensions"
          />
        </NavigateFnContext.Provider>
      </MembersDataApiResponseContext.Provider>
    )}
  />
);

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

export const HolidaysOverview = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Manage holiday stops for"
    supportRefererSuffix="holiday_stop_flow"
    loadingMessagePrefix="Retrieving current holiday stops for your"
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <MembersDataApiResponseContext.Provider value={productDetail}>
        <NavigateFnContext.Provider value={{ navigate: props.navigate }}>
          <WizardStep routeableStepProps={routeableStepProps}>
            <div>
              <h1>
                Suspensions Overview ({
                  productDetail.subscription.subscriptionId
                })
              </h1>
              <Button
                text="New Suspension"
                right
                primary
                onClick={() => (routeableStepProps.navigate || navigate)("new")}
              />
            </div>
          </WizardStep>
        </NavigateFnContext.Provider>
      </MembersDataApiResponseContext.Provider>
    )}
  />
);

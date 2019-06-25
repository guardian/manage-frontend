import { NavigateFn } from "@reach/router";
import { DateRange } from "moment-range";
import React from "react";
import {
  hasProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiResponseContext
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { Button } from "../buttons";
import { CallCentreNumbers } from "../callCentreNumbers";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../wizardRouterAdapter";
import { SelectedHolidayRangeContext } from "./holidayDateChooser";
import {
  CreateHolidayStopsAsyncLoader,
  CreateHolidayStopsResponse,
  DATE_INPUT_FORMAT
} from "./holidayStopApi";

export function isDateRange(range: DateRange | {}): range is DateRange {
  return (
    !!range && range.hasOwnProperty("start") && range.hasOwnProperty("end")
  );
}

const getPerformCreation = (
  selectedRange: DateRange,
  subscriptionName: string,
  isTestUser: boolean,
  productType: ProductType
) => () =>
  fetch(`/api/holidays/${productType.urlPart}`, {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({
      start: selectedRange.start.format(DATE_INPUT_FORMAT),
      end: selectedRange.end.format(DATE_INPUT_FORMAT),
      subscriptionName
    }),
    headers: {
      "Content-Type": "application/json",
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  });

const getRenderCreationSuccess = (navigate: NavigateFn) => (
  response: CreateHolidayStopsResponse
) => {
  navigate("confirmed", { replace: true });
  return null;
};

const renderCreationError = () => (
  <div css={{ textAlign: "left", marginTop: "10px" }}>
    <h2>Sorry, the holiday suspension creation failed.</h2>
    <p>
      To try again please go back and re-enter your dates. Alternatively, please
      call to speak to one of our customer service specialists.
    </p>
    <CallCentreNumbers prefixText="To contact us" />
  </div>
);
export interface HolidayReviewState {
  isCreating: boolean;
}

export class HolidayReview extends React.Component<
  RouteableStepProps,
  HolidayReviewState
> {
  public state: HolidayReviewState = {
    isCreating: false
  };
  public render = () => (
    <MembersDataApiResponseContext.Consumer>
      {productDetail => (
        <SelectedHolidayRangeContext.Consumer>
          {selectedRange =>
            isDateRange(selectedRange) &&
            hasProduct(productDetail) &&
            this.props.navigate ? (
              <WizardStep routeableStepProps={this.props}>
                <div>
                  <h1>New Suspension Review</h1>
                  {selectedRange.start.toString()}{" "}
                  {selectedRange.end.toString()}
                  {this.state.isCreating ? (
                    <CreateHolidayStopsAsyncLoader
                      fetch={getPerformCreation(
                        selectedRange,
                        productDetail.subscription.subscriptionId,
                        productDetail.isTestUser,
                        this.props.productType
                      )}
                      render={getRenderCreationSuccess(this.props.navigate)}
                      errorRender={renderCreationError}
                      loadingMessage="Creating your suspension"
                      spinnerScale={0.7}
                      inline
                    />
                  ) : (
                    <Button
                      text="Confirm"
                      onClick={() => this.setState({ isCreating: true })}
                      right
                      primary
                    />
                  )}
                </div>
              </WizardStep>
            ) : (
              visuallyNavigateToParent(this.props)
            )
          }
        </SelectedHolidayRangeContext.Consumer>
      )}
    </MembersDataApiResponseContext.Consumer>
  );
}

import moment from "moment";
import { DateRange } from "moment-range";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { DatePicker } from "../datePicker";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";

export const labelHolidayStopStepProps: (
  routeableStepProps: RouteableStepProps
) => RouteableStepProps = (routeableStepProps: RouteableStepProps) => ({
  stepLabels: ["Select dates", "Summary", "Confirmation"],
  ...routeableStepProps
});

interface ManageHolidayStopStepProps {
  productDetail: ProductDetail;
  routeableStepProps: RouteableStepProps;
}

interface ManageHolidayStopStepState {
  selectedRange?: DateRange;
}

const DATE_INPUT_FORMAT = "YYYY-MM-DD";

const mockApiObject = {
  firstAvailableDate: "2019-06-11",
  existing: [
    {
      id: "",
      start: "2019-06-23",
      end: "2019-06-25",
      subscriptionName: "Guardian Weekly"
    },
    {
      id: "",
      start: "2019-07-15",
      end: "2019-07-22",
      subscriptionName: "Guardian Weekly"
    }
  ]
};

class ManageHolidayStopStep extends React.Component<
  ManageHolidayStopStepProps,
  ManageHolidayStopStepState
> {
  public state: ManageHolidayStopStepState = {};

  public render = () => (
    <MembersDataApiResponseContext.Provider value={this.props.productDetail}>
      <NavigateFnContext.Provider
        value={{ navigate: this.props.routeableStepProps.navigate }}
      >
        <WizardStep
          routeableStepProps={this.props.routeableStepProps}
          extraFooterComponents={<QuestionsFooter />}
          hideBackButton
        >
          <DatePicker
            // noticePeriod={noticePeriod}
            firstAvailableDate={moment(
              mockApiObject.firstAvailableDate,
              DATE_INPUT_FORMAT
            )}
            // existingHolidayStops={existingHolidayStops}
            existingHolidayStops={mockApiObject.existing.map(
              obj =>
                new DateRange(
                  moment(obj.start, DATE_INPUT_FORMAT),
                  moment(obj.end, DATE_INPUT_FORMAT)
                )
            )}
            selectedRange={this.state.selectedRange}
            onSelect={({ start, end }) =>
              this.setState({ selectedRange: new DateRange(start, end) })
            }
          />
        </WizardStep>
      </NavigateFnContext.Provider>
    </MembersDataApiResponseContext.Provider>
  );
}

export const HolidayStopFlow = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...labelHolidayStopStepProps(props)}
    headingPrefix="Manage holiday stops for"
    supportRefererSuffix="holiday_stop_flow"
    loadingMessagePrefix="Retrieving current holiday stops for your"
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <ManageHolidayStopStep
        routeableStepProps={routeableStepProps}
        productDetail={productDetail}
      />
    )}
  />
);

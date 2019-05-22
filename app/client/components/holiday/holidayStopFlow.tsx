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

const noticePeriod = new DateRange(moment(), moment().add(10, "days"));

const existingHolidayStops = [
  new DateRange(
    moment({
      year: 2019,
      month: 6,
      day: 9
    }),
    moment({
      year: 2019,
      month: 6,
      day: 11
    })
  ),
  new DateRange(
    moment().add(5, "weeks"),
    moment()
      .add(5, "weeks")
      .add(3, "days")
  )
];

class ManageHolidayStopStep extends React.Component<
  ManageHolidayStopStepProps,
  ManageHolidayStopStepState
> {
  public state: ManageHolidayStopStepState = {
    selectedRange: new DateRange(
      noticePeriod.clone().end,
      noticePeriod.clone().end
    )
  };

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
            noticePeriod={noticePeriod}
            existingHolidayStops={existingHolidayStops}
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

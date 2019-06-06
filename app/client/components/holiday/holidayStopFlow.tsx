import { NavigateFn } from "@reach/router";
import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";

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
  numberOfIssuesSelected?: number;
  numberOfIssuesRemaining: number;
}

const DATE_INPUT_FORMAT = "YYYY-MM-DD";

const DESPATCH_DAY_OF_WEEK = 2; // Sunday is 0

const MAX_ISSUES_PER_YEAR = 6; // Year starts from customer acquire date

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

// const navigate: NavigateFn;

const firstAvailableDateMoment = moment(
  mockApiObject.firstAvailableDate,
  DATE_INPUT_FORMAT
);

const createDespatchDateArray = () => {
  const firstDate = firstAvailableDateMoment.clone(); //change this to customer acquire date
  let despatchDateArray = [];
  const daysInYear = firstDate.isLeapYear() ? 366 : 365;
  for (let i = 0; i < daysInYear; i++) {
    const date = firstDate.clone().add(i, "days");
    if (date.day() === DESPATCH_DAY_OF_WEEK) {
      despatchDateArray.push(date);
    }
  }
  return despatchDateArray;
};

const despatchDateArray = createDespatchDateArray();

// for use later whend displaying despatch days on calendar
const despatchDateRangeArray = despatchDateArray.map(
  date => new DateRange(date, date)
);

const existingDates = mockApiObject.existing.map(
  obj =>
    new DateRange(
      moment(obj.start, DATE_INPUT_FORMAT),
      moment(obj.end, DATE_INPUT_FORMAT)
    )
);

const calculateNumberOfIssuesAffected = (
  datesArray: Moment[],
  range: DateRange
) => {
  return datesArray.filter(date => range.contains(date)).length;
};

const calculateIssuesRemaining = (
  datesArray: Moment[],
  existingRange: DateRange[]
) =>
  MAX_ISSUES_PER_YEAR -
  existingRange
    .map(range => calculateNumberOfIssuesAffected(datesArray, range))
    .reduce((prev, curr) => prev + curr);

const issuesRemaining = calculateIssuesRemaining(
  despatchDateArray,
  existingDates
);

class ManageHolidayStopStep extends React.Component<
  ManageHolidayStopStepProps,
  ManageHolidayStopStepState
> {
  public state: ManageHolidayStopStepState = {
    numberOfIssuesSelected: 0,
    numberOfIssuesRemaining: issuesRemaining
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
          <p>
            Choose the dates that you will be away. We will automatically
            calculate the number of issues you are going to miss (up to a
            maximum of 6 per year) and estimated credit you will get.
          </p>
          <p>
            The first available date is{" "}
            <strong>{firstAvailableDateMoment.format("dddd D MMMM")}</strong>{" "}
            due to printing and delivery schedules, and you can book up to one
            year ahead.
          </p>
          <p>
            You can select only one schedule at a time. You have{" "}
            <strong>{issuesRemaining}</strong> issues out of{" "}
            {MAX_ISSUES_PER_YEAR} available to suspend until{" "}
            {firstAvailableDateMoment
              .clone()
              .add(1, "year")
              .subtract(1, "day")
              .format("D MMMM YYYY")}
          </p>
          <DatePicker
            // noticePeriod={noticePeriod}
            firstAvailableDate={firstAvailableDateMoment}
            // existingHolidayStops={existingHolidayStops}
            existingDates={existingDates}
            selectedRange={this.state.selectedRange}
            onSelect={({ start, end }) => {
              const range = new DateRange(start, end);
              const issuesSelected = calculateNumberOfIssuesAffected(
                despatchDateArray,
                range
              );
              const allowedIssues =
                issuesSelected > issuesRemaining
                  ? issuesRemaining
                  : issuesSelected;
              this.setState({
                selectedRange: range,
                numberOfIssuesSelected: allowedIssues
              });
            }}
          />
          <p>
            {`You will miss ${this.state.numberOfIssuesSelected &&
              this.state.numberOfIssuesSelected} issue${
              this.state.numberOfIssuesSelected &&
              (this.state.numberOfIssuesSelected > 1 ||
                this.state.numberOfIssuesSelected < 1)
                ? "s"
                : ""
            }.`}
          </p>
          <div>
            <Button text="Cancel" left={true} disabled={false} />

            <Button
              text="Review details"
              right={true}
              disabled={this.state.selectedRange === undefined}
              // onClick={this.handleClick("confirm")}
              primary={true}
            />
          </div>
          <div css={{ height: "10px" }} />
          <ReturnToYourProductButton
            productType={this.props.routeableStepProps.productType}
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

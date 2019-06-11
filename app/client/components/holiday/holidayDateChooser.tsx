import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  HolidayStopsResponseContext,
  HolidayStopRequest,
  isHolidayStopsResponse
} from "./holidayStopApi";

interface HolidayDateChooserState {
  selectedRange?: DateRange;
  numberOfIssuesSelected?: number;
  numberOfIssuesRemaining: number;
}

const DATE_INPUT_FORMAT = "YYYY-MM-DD";

const DESPATCH_DAY_OF_WEEK = 2; // Sunday is 0

const MAX_ISSUES_PER_YEAR = 6; // Year starts from customer acquire date

const firstAvailableDateMoment = moment("2019-06-11", DATE_INPUT_FORMAT);

const createDespatchDateArray = () => {
  const firstDate = firstAvailableDateMoment.clone(); // change this to customer acquire date
  const despatchDateArray = [];
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

const transformStringDatesToMoments = (existing: HolidayStopRequest[]) =>
  existing.map(
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

const issuesRemaining = 4;

export class HolidayDateChooser extends React.Component<
  RouteableStepProps,
  HolidayDateChooserState
> {
  public state: HolidayDateChooserState = {
    numberOfIssuesSelected: 0,
    numberOfIssuesRemaining: issuesRemaining
  };

  public render = () => (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse => (
        <WizardStep
          routeableStepProps={this.props}
          extraFooterComponents={<QuestionsFooter />}
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
            issueDayOfWeek={6}
            existingDates={transformStringDatesToMoments(
              isHolidayStopsResponse(holidayStopsResponse)
                ? holidayStopsResponse.existing
                : []
            )}
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
            <Button
              text="Review details"
              right
              disabled={!!this.state.selectedRange}
              // onClick={this.handleClick("confirm")}
              primary
            />
          </div>
          <div css={{ height: "10px" }} />
        </WizardStep>
      )}
    </HolidayStopsResponseContext.Consumer>
  );
}

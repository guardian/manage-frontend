import { DateRange } from "moment-range";
import React from "react";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";
import {
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  calculateIssuesInRange
} from "./holidayStopApi";
import {
  MembersDataApiResponseContext,
  hasProduct
} from "../../../shared/productResponse";
import { GenericErrorScreen } from "../genericErrorScreen";

interface HolidayDateChooserState {
  selectedRange?: DateRange;
  numberOfIssuesSelected?: number;
  numberOfIssuesRemaining: number;
}

const issuesRemaining = 4; // TODO: replace with real data passed down via context

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
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiResponseContext.Consumer>
            {productDetail =>
              hasProduct(productDetail) ? (
                <WizardStep
                  routeableStepProps={this.props}
                  extraFooterComponents={<QuestionsFooter />}
                >
                  <p>
                    Choose the dates that you will be away. We will
                    automatically calculate the number of issues you are going
                    to miss (up to a maximum of 6 per year) and estimated credit
                    you will get.
                  </p>
                  <p>
                    The first available date is{" "}
                    <strong>
                      {holidayStopsResponse.productSpecifics.firstAvailableDate.format(
                        "dddd D MMMM"
                      )}
                    </strong>{" "}
                    due to printing and delivery schedules, and you can book up
                    to one year ahead.
                  </p>
                  <p>
                    You can select only one schedule at a time. You have{" "}
                    <strong>{issuesRemaining}</strong> issues out of{" "}
                    {holidayStopsResponse.productSpecifics.annualIssueLimit}{" "}
                    available to suspend until{" "}
                    {holidayStopsResponse.productSpecifics.firstAvailableDate
                      .clone()
                      .add(1, "year")
                      .subtract(1, "day")
                      .format("D MMMM YYYY")
                    // TODO: use {productDetail.subscription.renewalDate} instead here
                    }
                  </p>
                  <DatePicker
                    firstAvailableDate={
                      holidayStopsResponse.productSpecifics.firstAvailableDate
                    }
                    issueDayOfWeek={
                      holidayStopsResponse.productSpecifics.issueDayOfWeek
                    }
                    existingDates={holidayStopsResponse.existing.map(
                      hsr => hsr.dateRange
                    )}
                    selectedRange={this.state.selectedRange}
                    onSelect={({ start, end }) => {
                      const range = new DateRange(start, end);

                      const issuesAffectedBySelection = calculateIssuesInRange(
                        range,
                        productDetail.subscription.renewalDate,
                        holidayStopsResponse.productSpecifics.issueDayOfWeek
                      );
                      // const allowedIssues =
                      //   issuesAffectedBySelection > issuesRemaining
                      //     ? issuesRemaining
                      //     : issuesAffectedBySelection;
                      this.setState({
                        selectedRange: range
                        // numberOfIssuesSelected: allowedIssues
                      });
                    }}
                  />
                  <p>
                    {`You will miss ${this.state.numberOfIssuesSelected &&
                      this.state.numberOfIssuesSelected} issue${
                      this.state.numberOfIssuesSelected &&
                      this.state.numberOfIssuesSelected !== 1
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
              ) : (
                <GenericErrorScreen loggingMessage="No product detail for holiday stop date chooser" />
              )
            }
          </MembersDataApiResponseContext.Consumer>
        ) : (
          <GenericErrorScreen loggingMessage="No holiday stop response" />
        )
      }
    </HolidayStopsResponseContext.Consumer>
  );
}

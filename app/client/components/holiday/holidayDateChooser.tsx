import { DateRange } from "moment-range";
import React from "react";
import {
  hasProduct,
  MembersDataApiResponseContext
} from "../../../shared/productResponse";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../genericErrorScreen";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";
import { holidayQuestionsTopicString } from "./holidaysOverview";
import {
  issuesInRange,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  DATE_INPUT_FORMAT
} from "./holidayStopApi";
import moment from "moment";
import { sans } from "../../styles/fonts";
import { Link, navigate } from "@reach/router";

const issuesRemaining = 4; // TODO: replace with real data passed down via context

const infoCss = {
  fontFamily: sans,
  fontSize: "14px"
};

export const SelectedHolidayRangeContext: React.Context<
  DateRange | {}
> = React.createContext({});

interface HolidayDateChooserState {
  selectedRange?: DateRange;
  numberOfIssuesSelectedThisYear?: number;
  numberOfIssuesSelectedNextYear?: number;
  numberOfIssuesRemaining: number;
}
export class HolidayDateChooser extends React.Component<
  RouteableStepProps,
  HolidayDateChooserState
> {
  public state: HolidayDateChooserState = {
    // numberOfIssuesSelectedThisYear: 0,
    numberOfIssuesRemaining: issuesRemaining
  };

  public render = () => (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiResponseContext.Consumer>
            {productDetail =>
              hasProduct(productDetail) ? (
                <SelectedHolidayRangeContext.Provider
                  value={this.state.selectedRange || {}}
                >
                  <WizardStep
                    routeableStepProps={this.props}
                    extraFooterComponents={
                      <QuestionsFooter topic={holidayQuestionsTopicString} />
                    }
                    hideBackButton
                  >
                    <h2>Schedule your time away</h2>
                    <p>
                      Choose the dates you will be away. You will be credited
                      for the suspended issues on your future bill(s). The first
                      available date is{" "}
                      <strong>
                        {holidayStopsResponse.productSpecifics.firstAvailableDate.format(
                          "dddd D MMMM"
                        )}
                      </strong>{" "}
                      due to our printing and delivery schedule (notice period).
                    </p>
                    <p css={infoCss}>
                      You can schedule one suspension at a time.
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
                      selectionInfo={
                        <>
                          {this.state.numberOfIssuesSelectedThisYear ? (
                            <>
                              <div>Suspending</div>
                              <div css={{ fontSize: "16px" }}>
                                <strong>
                                  {this.state.numberOfIssuesSelectedThisYear &&
                                    this.state.numberOfIssuesSelectedThisYear}
                                  {" issue"}
                                  {this.state.numberOfIssuesSelectedThisYear !==
                                  1
                                    ? "s"
                                    : ""}
                                </strong>{" "}
                              </div>
                              <div>before </div>
                            </>
                          ) : (
                            <div>{issuesRemaining} issues remaining until </div>
                          )}
                          <div>
                            {moment(
                              productDetail.subscription.renewalDate,
                              DATE_INPUT_FORMAT
                            ).format("D/M/YYYY")}
                            <sup>*</sup>
                          </div>
                          {this.state.numberOfIssuesSelectedNextYear &&
                          this.state.numberOfIssuesSelectedNextYear > 0 ? (
                            <>
                              <div>and</div>
                              <div css={{ fontSize: "16px" }}>
                                <strong>
                                  {this.state.numberOfIssuesSelectedNextYear &&
                                    this.state.numberOfIssuesSelectedNextYear}
                                  {" issue"}
                                  {this.state.numberOfIssuesSelectedNextYear !==
                                  1
                                    ? "s"
                                    : ""}
                                </strong>
                              </div>
                              <div>the following year</div>{" "}
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      }
                      onSelect={({ start, end }) => {
                        const range = new DateRange(start, end);

                        const issuesAffectedBySelection = issuesInRange(
                          range,
                          productDetail.subscription.renewalDate,
                          holidayStopsResponse.productSpecifics.issueDayOfWeek
                        );
                        this.setState({
                          selectedRange: range,
                          numberOfIssuesSelectedThisYear:
                            issuesAffectedBySelection.issuesThisYear,
                          numberOfIssuesSelectedNextYear:
                            issuesAffectedBySelection.issuesNextYear
                        });
                      }}
                    />
                    <div css={{ ...infoCss, margin: "10px 0 10px 0" }}>
                      <sup>*</sup>This is the anniversary of your subscription.
                      The number of issues you can suspend per year is reset on
                      this date.
                    </div>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}
                    >
                      <Link
                        css={{
                          marginRight: "20px"
                        }}
                        to=".."
                        replace={true}
                      >
                        Back
                      </Link>
                      <div>
                        <Button
                          text="Review details"
                          right
                          disabled={!this.state.selectedRange}
                          onClick={() =>
                            (this.props.navigate || navigate)("review")
                          }
                          primary
                        />
                      </div>
                    </div>
                    <div css={{ height: "10px" }} />
                  </WizardStep>
                </SelectedHolidayRangeContext.Provider>
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

import { Link, navigate } from "@reach/router";
import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { OnSelectCallbackParam } from "react-daterange-picker";
import {
  hasProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiResponseContext
} from "../../../shared/productResponse";
import { sans } from "../../styles/fonts";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../genericErrorScreen";
import { Spinner } from "../spinner";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";
import { holidayQuestionsTopicString } from "./holidaysOverview";
import {
  calculateIssuesImpactedPerYear,
  DATE_INPUT_FORMAT,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  IssuesImpactedPerYear
} from "./holidayStopApi";
import palette from "../../colours";

const infoIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
      <circle
        cx="7"
        cy="7"
        r="7"
        stroke="#121212"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.4"
      />
      <path
        stroke="#121212"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.4"
        d="M7 9.8V7"
      />
      <circle cx="7" cy="4.2" r="1" fill="#121212" />
    </g>
  </svg>
);

const displayNumberOfIssuesAsText = (numberOfIssues: number) => {
  return (
    <div>
      <strong>
        {numberOfIssues} issue{numberOfIssues !== 1 ? "s" : ""}
      </strong>
    </div>
  );
};

export const SelectedHolidayRangeContext: React.Context<
  DateRange | {}
> = React.createContext({});

interface HolidayDateChooserState {
  selectedRange?: DateRange;
  issuesImpactedBySelection: IssuesImpactedPerYear | null;
}
export class HolidayDateChooser extends React.Component<
  RouteableStepProps,
  HolidayDateChooserState
> {
  public state: HolidayDateChooserState = {
    issuesImpactedBySelection: null
  };

  public render = () => (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiResponseContext.Consumer>
            {productDetail => {
              if (hasProduct(productDetail)) {
                const renewalDateMoment = moment(
                  productDetail.subscription.renewalDate,
                  DATE_INPUT_FORMAT
                );

                const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
                  holidayStopsResponse.existing
                    .map(existing => existing.publicationDatesToBeStopped)
                    .flat(),
                  renewalDateMoment
                );

                return (
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
                        for the suspended issues on your future bill(s). The
                        first available date is{" "}
                        <strong>
                          {holidayStopsResponse.productSpecifics.firstAvailableDate.format(
                            "dddd D MMMM"
                          )}
                        </strong>{" "}
                        due to our printing and delivery schedule (notice
                        period).
                      </p>
                      <div
                        css={{
                          fontFamily: sans,
                          fontSize: "14px",
                          marginBottom: "27px"
                        }}
                      >
                        <span>{infoIconSvg}</span>
                        You can schedule one suspension at a time.
                      </div>

                      <DatePicker
                        firstAvailableDate={
                          holidayStopsResponse.productSpecifics
                            .firstAvailableDate
                        }
                        issueDayOfWeek={
                          holidayStopsResponse.productSpecifics.issueDayOfWeek
                        }
                        existingDates={holidayStopsResponse.existing.map(
                          hsr => hsr.dateRange
                        )}
                        selectedRange={this.state.selectedRange}
                        selectionInfo={this.selectionInfo(
                          renewalDateMoment,
                          combinedIssuesImpactedPerYear,
                          holidayStopsResponse.productSpecifics.annualIssueLimit
                        )}
                        onSelect={this.onSelect(
                          renewalDateMoment,
                          productDetail.isTestUser
                        )}
                      />
                      <div
                        css={{
                          fontFamily: sans,
                          fontSize: "14px",
                          margin: "10px 0 10px 0"
                        }}
                      >
                        <sup>*</sup>This is the anniversary of your
                        subscription. The number of issues you can suspend per
                        year is reset on this date.
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
                            marginRight: "20px",
                            fontFamily: sans,
                            fontWeight: "bold",
                            textDecoration: "underline",
                            fontSize: "16px",
                            color: palette.neutral["2"]
                          }}
                          to=".."
                          replace={true}
                        >
                          Cancel
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
                );
              } else {
                return (
                  <GenericErrorScreen loggingMessage="No product detail for holiday stop date chooser" />
                );
              }
            }}
          </MembersDataApiResponseContext.Consumer>
        ) : (
          <GenericErrorScreen loggingMessage="No holiday stop response" />
        )
      }
    </HolidayStopsResponseContext.Consumer>
  );
  private onSelect = (renewalDateMoment: Moment, isTestUser: boolean) => ({
    start,
    end
  }: OnSelectCallbackParam) =>
    this.setState(
      {
        selectedRange: new DateRange(start, end),
        issuesImpactedBySelection: null
      },
      () =>
        fetch(
          `/api/holidays/${
            this.props.productType.urlPart
          }/potential?startDate=${start.format(
            DATE_INPUT_FORMAT
          )}&endDate=${end.format(DATE_INPUT_FORMAT)}`,
          {
            headers: {
              [MDA_TEST_USER_HEADER]: `${isTestUser}`
            }
          }
        )
          .then(response => response.json() as Promise<string[]>)
          .then(potentialIssuesImpacted =>
            this.setState({
              issuesImpactedBySelection: calculateIssuesImpactedPerYear(
                potentialIssuesImpacted.map(dateStr =>
                  moment(dateStr, DATE_INPUT_FORMAT)
                ),
                renewalDateMoment
              )
            })
          )
    );

  private selectionInfo = (
    renewalDateMoment: Moment,
    combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
    annualIssueLimit: number
  ) => {
    const issuesRemainingThisYear =
      annualIssueLimit -
      combinedIssuesImpactedPerYear.issueDatesThisYear.length;

    const issuesRemainingNextYear =
      annualIssueLimit -
      combinedIssuesImpactedPerYear.issueDatesNextYear.length;

    return (
      <>
        {this.state.selectedRange ? (
          this.state.issuesImpactedBySelection ? (
            <div>
              Suspending{" "}
              <div>
                {displayNumberOfIssuesAsText(
                  this.state.issuesImpactedBySelection.issueDatesThisYear.length
                )}
              </div>
            </div>
          ) : (
            <Spinner />
          )
        ) : (
          <>
            <div>
              {displayNumberOfIssuesAsText(issuesRemainingThisYear)} remaining
              until {renewalDateMoment.format("D/M/Y")}
              <sup>*</sup>
            </div>
            {issuesRemainingNextYear > 0 && (
              <div>
                and
                {displayNumberOfIssuesAsText(issuesRemainingNextYear)} the
                following year
              </div>
            )}
          </>
        )}

        {/* {this.state.numberOfIssuesSelectedThisYear ? (
          <>
            <div>Suspending</div>
            <div css={{ fontSize: "16px" }}>
              <strong>

                {this.state.numberOfIssuesSelectedThisYear &&
                  this.state.numberOfIssuesSelectedThisYear}
                {" issue"}
                {this.state.numberOfIssuesSelectedThisYear !== 1 ? "s" : ""}
              </strong>{" "}
            </div>
            <div>before </div>
          </>
        ) : (
          <div>TODO!!! issues remaining until </div>
        )}
        <div>
          {renewalDateMoment.format("D/M/YYYY")}
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
                {this.state.numberOfIssuesSelectedNextYear !== 1 ? "s" : ""}
              </strong>
            </div>
            <div>the following year</div>{" "}
          </>
        ) : (
          ""
        )} */}
      </>
    );
  };
}

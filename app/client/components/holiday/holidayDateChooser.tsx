import { Link, navigate } from "@reach/router";
import { FontWeightProperty } from "csstype";
import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { OnSelectCallbackParam } from "react-daterange-picker";
import {
  hasProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiResponseContext
} from "../../../shared/productResponse";
import palette from "../../colours";
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

const infoIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    css={{
      position: "relative",
      top: "2px",
      marginRight: "5px"
    }}
  >
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle
        cx="7"
        cy="7"
        r="7"
        stroke="#121212"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <path
        stroke="#121212"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M7 9.8V7"
      />
      <circle cx="7" cy="4.2" r="1" fill="#121212" />
    </g>
  </svg>
);

export const cancelLinkCss = {
  marginRight: "20px",
  fontFamily: sans,
  fontWeight: "bold" as FontWeightProperty,
  textDecoration: "underline",
  fontSize: "16px",
  color: palette.neutral["2"]
};

export const rightAlignedButtonsCss = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
};

const displayNumberOfIssuesAsText = (numberOfIssues: number) => {
  return (
    <div>
      <strong>
        {numberOfIssues} issue{numberOfIssues !== 1 ? "s" : ""}
      </strong>
    </div>
  );
};

export const HolidayDateChooserStateContext: React.Context<
  HolidayDateChooserState | {}
> = React.createContext({});

export function isHolidayDateChooserState(
  state: HolidayDateChooserState | {}
): state is HolidayDateChooserState {
  return (
    !!state &&
    state.hasOwnProperty("selectedRange") &&
    state.hasOwnProperty("issuesImpactedBySelection")
  );
}

interface SelectionValidationAndErrorMsg {
  isValid: boolean;
  errorMsg: string;
}

interface HolidayDateChooserState {
  selectedRange?: DateRange;
  issuesImpactedBySelection: IssuesImpactedPerYear | null;
  selectionIsValid: SelectionValidationAndErrorMsg;
}
export class HolidayDateChooser extends React.Component<
  RouteableStepProps,
  HolidayDateChooserState
> {
  public state: HolidayDateChooserState = {
    issuesImpactedBySelection: null,
    selectionIsValid: {
      isValid: false,
      errorMsg: ""
    }
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
                  <HolidayDateChooserStateContext.Provider
                    value={this.state || {}}
                  >
                    <WizardStep
                      routeableStepProps={this.props}
                      extraFooterComponents={
                        <QuestionsFooter topic={holidayQuestionsTopicString} />
                      }
                      hideBackButton
                    >
                      <h1>Schedule your time away</h1>
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
                          combinedIssuesImpactedPerYear,
                          holidayStopsResponse.productSpecifics
                            .annualIssueLimit,
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
                      <div css={rightAlignedButtonsCss}>
                        <Link css={cancelLinkCss} to=".." replace={true}>
                          Cancel
                        </Link>
                        <div>
                          <Button
                            text="Review details"
                            right
                            disabled={!this.state.selectionIsValid.isValid}
                            onClick={() =>
                              (this.props.navigate || navigate)("review")
                            }
                            primary
                          />
                        </div>
                      </div>
                      <div css={{ height: "10px" }} />
                    </WizardStep>
                  </HolidayDateChooserStateContext.Provider>
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
  private onSelect = (
    renewalDateMoment: Moment,
    combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
    annualIssueLimit: number,
    isTestUser: boolean
  ) => ({ start, end }: OnSelectCallbackParam) =>
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
          .then(potentialIssuesImpacted => {
            const issuesImpactedBySelection = calculateIssuesImpactedPerYear(
              potentialIssuesImpacted.map(dateStr =>
                moment(dateStr, DATE_INPUT_FORMAT)
              ),
              renewalDateMoment
            );

            const issuesRemainingThisYear =
              annualIssueLimit -
              combinedIssuesImpactedPerYear.issueDatesThisYear.length;

            const issuesRemainingNextYear =
              annualIssueLimit -
              combinedIssuesImpactedPerYear.issueDatesNextYear.length;

            const numPotentialIssuesThisYear =
              issuesImpactedBySelection.issueDatesThisYear.length;

            const numPotentialIssuesNextYear =
              issuesImpactedBySelection.issueDatesNextYear.length;

            const selectionIsValidWithErrorMsg = this.isValidNumberOfIssuesSelected(
              numPotentialIssuesThisYear,
              issuesRemainingThisYear,
              numPotentialIssuesNextYear,
              issuesRemainingNextYear
            );
            this.setState({
              issuesImpactedBySelection,
              selectionIsValid: selectionIsValidWithErrorMsg
            });
          })
    );

  private overLimit = (potential: number, remaining: number) =>
    potential > remaining;

  private isValidNumberOfIssuesSelected = (
    numPotentialIssuesThisYear: number,
    issuesRemainingThisYear: number,
    numPotentialIssuesNextYear: number,
    issuesRemainingNextYear: number
  ) => {
    if (this.overLimit(numPotentialIssuesThisYear, issuesRemainingThisYear)) {
      return {
        isValid: false,
        errorMsg:
          "Exceeded issue limit for this year - please choose fewer issues"
      };
    } else if (
      this.overLimit(numPotentialIssuesNextYear, issuesRemainingNextYear)
    ) {
      return {
        isValid: false,
        errorMsg:
          "Exceeded issue limit for next year - please choose fewer issues"
      };
    } else if (
      numPotentialIssuesThisYear < 1 &&
      numPotentialIssuesNextYear < 1
    ) {
      return { isValid: false, errorMsg: "No issues selected" };
    }
    return { isValid: true, errorMsg: "" };
  };

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

    const formattedRenewalDate = renewalDateMoment.format("D MMM Y");

    return (
      <>
        {this.state.selectedRange ? (
          this.state.issuesImpactedBySelection ? (
            this.state.selectionIsValid.isValid ? (
              <div>
                Suspending{" "}
                <div>
                  {displayNumberOfIssuesAsText(
                    this.state.issuesImpactedBySelection.issueDatesThisYear
                      .length
                  )}
                </div>
                <div>
                  before {formattedRenewalDate}
                  <sup>*</sup>
                </div>
                {this.state.issuesImpactedBySelection.issueDatesNextYear
                  .length > 0 && (
                  <>
                    <div>and</div>
                    <div>
                      {displayNumberOfIssuesAsText(
                        this.state.issuesImpactedBySelection.issueDatesNextYear
                          .length
                      )}
                    </div>
                    <div>the following year</div>
                  </>
                )}
              </div>
            ) : (
              <div
                css={{
                  color: palette.red.medium,
                  fontWeight: "bold"
                }}
              >
                {this.state.selectionIsValid.errorMsg}
              </div>
            )
          ) : (
            <Spinner />
          )
        ) : (
          <>
            <div>
              {displayNumberOfIssuesAsText(issuesRemainingThisYear)} remaining
              until {formattedRenewalDate}
              <sup>*</sup>
            </div>
            {issuesRemainingNextYear < annualIssueLimit && (
              <div>
                and
                {displayNumberOfIssuesAsText(issuesRemainingNextYear)} the
                following year
              </div>
            )}
          </>
        )}
      </>
    );
  };
}

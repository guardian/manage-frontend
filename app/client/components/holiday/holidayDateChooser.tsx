import { Link, navigate } from "@reach/router";
import { FontWeightProperty } from "csstype";
import { Moment } from "moment";
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
import { InfoIcon } from "../svgs/infoIcon";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";
import { holidayQuestionsTopicString } from "./holidaysOverview";
import {
  calculateIssuesImpactedPerYear,
  DATE_INPUT_FORMAT,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  IssuesImpactedPerYear,
  momentiseDateStr
} from "./holidayStopApi";

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
    <strong>
      {numberOfIssues}&nbsp;issue{numberOfIssues !== 1 ? "s" : ""}
    </strong>
  );
};

const anniversaryDateToElement = (renewalDateMoment: Moment) => (
  <>
    {renewalDateMoment.format("D")}&nbsp;
    {renewalDateMoment.format("MMMM")}&nbsp;
    {renewalDateMoment.format("Y")}*
  </>
);

export const HolidayDateChooserStateContext: React.Context<
  HolidayDateChooserState | {}
> = React.createContext({});

export function isSharedHolidayDateChooserState(
  state: any
): state is SharedHolidayDateChooserState {
  return (
    !!state && state.selectedRange && state.issuesImpactedPerYearBySelection
  );
}

interface HolidayDateChooserState {
  selectedRange?: DateRange;
  totalIssueCountImpactedBySelection?: number;
  issuesImpactedPerYearBySelection?: IssuesImpactedPerYear | null;
  validationErrorMessage: React.ReactNode | null;
}

export interface SharedHolidayDateChooserState {
  selectedRange: DateRange;
  issuesImpactedPerYearBySelection: IssuesImpactedPerYear;
}

export class HolidayDateChooser extends React.Component<
  RouteableStepProps,
  HolidayDateChooserState
> {
  public state: HolidayDateChooserState = {
    issuesImpactedPerYearBySelection: null,
    validationErrorMessage: null
  };

  public render = () => (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiResponseContext.Consumer>
            {productDetail => {
              if (hasProduct(productDetail)) {
                const renewalDateMoment = momentiseDateStr(
                  productDetail.subscription.renewalDate
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
                      <h1>Choose the dates you will be away</h1>
                      <p>
                        The first available date is{" "}
                        <strong>
                          {holidayStopsResponse.productSpecifics.firstAvailableDate.format(
                            "dddd D MMMM"
                          )}
                        </strong>{" "}
                        due to our printing and delivery schedule (notice
                        period). You will be credited for the suspended issues
                        on your future bill(s).
                      </p>
                      <div
                        css={{
                          fontFamily: sans,
                          fontSize: "14px",
                          marginBottom: "27px"
                        }}
                      >
                        <InfoIcon /> You can schedule one suspension at a time.
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
                        selectionInfo={this.getSelectionInfoElement(
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
                        dateToAsterisk={renewalDateMoment}
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
                            disabled={!!this.state.validationErrorMessage}
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
        issuesImpactedPerYearBySelection: null
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
            const issuesImpactedPerYearBySelection = calculateIssuesImpactedPerYear(
              potentialIssuesImpacted.map(momentiseDateStr),
              renewalDateMoment
            );

            const issuesRemainingThisYear =
              annualIssueLimit -
              combinedIssuesImpactedPerYear.issueDatesThisYear.length;

            const issuesRemainingNextYear =
              annualIssueLimit -
              combinedIssuesImpactedPerYear.issueDatesNextYear.length;

            const validationErrorMessage: React.ReactNode = this.validateIssuesSelected(
              renewalDateMoment,
              annualIssueLimit,
              issuesImpactedPerYearBySelection.issueDatesThisYear.length,
              issuesRemainingThisYear,
              issuesImpactedPerYearBySelection.issueDatesNextYear.length,
              issuesRemainingNextYear
            );
            this.setState({
              totalIssueCountImpactedBySelection:
                potentialIssuesImpacted.length,
              issuesImpactedPerYearBySelection,
              validationErrorMessage
            });
          })
    );

  private validateIssuesSelected = (
    renewalDateMoment: Moment,
    annualIssueLimit: number,
    numPotentialIssuesThisYear: number,
    issuesRemainingThisYear: number,
    numPotentialIssuesNextYear: number,
    issuesRemainingNextYear: number
  ) => {
    if (numPotentialIssuesThisYear > issuesRemainingThisYear) {
      return (
        <>
          Exceeded issue limit of {annualIssueLimit} before{" "}
          {anniversaryDateToElement(renewalDateMoment)}
          <br />
          Please choose fewer issues...
        </>
      );
    } else if (numPotentialIssuesNextYear > issuesRemainingNextYear) {
      return (
        <>
          Exceeded issue limit of {annualIssueLimit} between ${anniversaryDateToElement(
            renewalDateMoment
          )}{" "}
          and ${anniversaryDateToElement(
            renewalDateMoment.clone().add(1, "year")
          )}{" "}
          <br />
          Please choose fewer issues...
        </>
      );
    } else if (
      numPotentialIssuesThisYear < 1 &&
      numPotentialIssuesNextYear < 1
    ) {
      return "No issues occur during selected period";
    }
  };

  private getSelectionInfoElement = (
    renewalDateMoment: Moment,
    combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
    annualIssueLimit: number
  ) => {
    const issuesRemainingThisYear =
      annualIssueLimit -
      combinedIssuesImpactedPerYear.issueDatesThisYear.length -
      (this.state.issuesImpactedPerYearBySelection
        ? this.state.issuesImpactedPerYearBySelection.issueDatesThisYear.length
        : 0);

    const issuesRemainingNextYear =
      annualIssueLimit -
      combinedIssuesImpactedPerYear.issueDatesNextYear.length -
      (this.state.issuesImpactedPerYearBySelection
        ? this.state.issuesImpactedPerYearBySelection.issueDatesNextYear.length
        : 0);

    if (this.state.validationErrorMessage) {
      return (
        <div
          css={{
            color: palette.red.medium,
            fontWeight: "bold"
          }}
        >
          {this.state.validationErrorMessage}
        </div>
      );
    } else if (
      !this.state.selectedRange ||
      this.state.issuesImpactedPerYearBySelection
    ) {
      return (
        <>
          <div>
            Suspending{" "}
            {displayNumberOfIssuesAsText(
              this.state.totalIssueCountImpactedBySelection || 0
            )}
          </div>
          <hr />
          <div>
            Leaving you with{" "}
            {displayNumberOfIssuesAsText(issuesRemainingThisYear)} available to
            suspend before {anniversaryDateToElement(renewalDateMoment)}
            {this.state.issuesImpactedPerYearBySelection &&
              this.state.issuesImpactedPerYearBySelection.issueDatesNextYear
                .length > 0 && (
                <>
                  {" "}
                  and {displayNumberOfIssuesAsText(issuesRemainingNextYear)} the
                  following year
                </>
              )}
          </div>
        </>
      );
    } else {
      return <Spinner />;
    }
  };
}

import { Link, navigate } from "@reach/router";
import { FlexWrapProperty, FontWeightProperty } from "csstype";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import * as Raven from "raven-js";
import React from "react";
import { OnSelectCallbackParam } from "react-daterange-picker";
import {
  hasProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiResponseContext
} from "../../../shared/productResponse";
import palette from "../../colours";
import { maxWidth, minWidth, queries } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { trackEvent } from "../analytics";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { GenericErrorScreen } from "../genericErrorScreen";
import { Spinner } from "../spinner";
import { InfoIcon } from "../svgs/infoIcon";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";
import { HolidayAnniversaryDateExplainerModal } from "./holidayAnniversaryDateExplainerModal";
import {
  creditExplainerSentence,
  HolidayQuestionsModal
} from "./holidayQuestionsModal";
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

export const buttonBarCss = {
  display: "flex",
  alignItems: "center",
  marginTop: "40px",
  flexWrap: "wrap" as FlexWrapProperty
};

const fixedButtonFooterCss = {
  [maxWidth.mobileLandscape]: {
    justifyContent: "space-between"
  },
  [maxWidth.phablet]: {
    position: "fixed",
    zIndex: 998,
    bottom: 0,
    left: 0,
    right: 0,
    background: palette.white,
    padding: "10px",
    boxShadow: "0 0 5px" + palette.neutral["4"]
  }
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
                    <WizardStep routeableStepProps={this.props} hideBackButton>
                      <h1>Choose the dates you will be away</h1>
                      <p>
                        The first available date is{" "}
                        <strong>
                          {holidayStopsResponse.productSpecifics.firstAvailableDate.format(
                            "dddd D MMMM"
                          )}
                        </strong>{" "}
                        due to our printing and delivery schedule (notice
                        period).
                        <br />
                        {creditExplainerSentence}
                      </p>
                      <div
                        css={{
                          fontFamily: sans,
                          fontSize: "14px",
                          marginBottom: "27px"
                        }}
                      >
                        <div css={{ margin: "10px" }}>
                          <InfoIcon />You can schedule one suspension at a time.
                        </div>
                        <div
                          css={{
                            [minWidth.mobileLandscape]: { display: "none" }
                          }}
                        >
                          <HolidayQuestionsModal
                            annualIssueLimit={
                              holidayStopsResponse.productSpecifics
                                .annualIssueLimit
                            }
                          />
                        </div>
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
                          ...buttonBarCss,
                          justifyContent: "flex-end",
                          ...fixedButtonFooterCss
                        }}
                      >
                        <div
                          css={{
                            marginRight: "30px",
                            [maxWidth.mobileLandscape]: {
                              display: "none"
                            }
                          }}
                        >
                          <HolidayQuestionsModal
                            annualIssueLimit={
                              holidayStopsResponse.productSpecifics
                                .annualIssueLimit
                            }
                          />
                        </div>
                        <Link css={cancelLinkCss} to=".." replace={true}>
                          Cancel
                        </Link>
                        <div>
                          <Button
                            text="Review details"
                            right
                            disabled={
                              !!this.state.validationErrorMessage ||
                              !this.state.selectedRange ||
                              !this.state.issuesImpactedPerYearBySelection
                            }
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
          .then(response => {
            const locationHeader = response.headers.get("Location");
            if (
              response.status === 401 &&
              locationHeader &&
              window !== undefined
            ) {
              window.location.replace(locationHeader);
              return Promise.resolve([]);
            } else if (response.ok) {
              return response.json() as Promise<string[]>;
            }
            return Promise.reject(`${response.status} from holiday-stop-api`);
          })
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
          .catch(error => {
            this.setState({
              validationErrorMessage:
                "Failed to calculate issues impacted by selected dates. Please try again later..."
            });
            trackEvent({
              eventCategory: "holidayDateChooser",
              eventAction: "error",
              eventLabel: error ? error.toString() : undefined
            });
            Raven.captureException(error);
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
      const dateElement = anniversaryDateToElement(renewalDateMoment);
      return (
        <>
          Exceeded issue limit of {annualIssueLimit} before {dateElement}{" "}
          <HolidayAnniversaryDateExplainerModal dateElement={dateElement} />
          <br />
          Please choose fewer issues...
        </>
      );
    } else if (numPotentialIssuesNextYear > issuesRemainingNextYear) {
      const firstDateElement = anniversaryDateToElement(renewalDateMoment);
      return (
        <>
          Exceeded issue limit of {annualIssueLimit} between {firstDateElement}{" "}
          and{" "}
          {anniversaryDateToElement(renewalDateMoment.clone().add(1, "year"))}{" "}
          <HolidayAnniversaryDateExplainerModal
            dateElement={firstDateElement}
          />
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
    return null; // important don't remove
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
            fontWeight: "bold",
            marginTop: "10px"
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
          <div
            css={{
              marginTop: "10px",
              fontSize: "16px",
              [maxWidth.desktop]: {
                marginRight: "20px"
              }
            }}
          >
            Suspending{" "}
            {displayNumberOfIssuesAsText(
              this.state.totalIssueCountImpactedBySelection || 0
            )}
          </div>
          <div
            css={{
              [queries.maxHeight(600)]: {
                display: "none"
              },
              [maxWidth.desktop]: {
                marginTop: "10px"
              }
            }}
          >
            <hr css={{ [maxWidth.desktop]: { display: "none" } }} />
            Leaving you with{" "}
            {displayNumberOfIssuesAsText(issuesRemainingThisYear)} available to
            suspend before {anniversaryDateToElement(renewalDateMoment)}
            {this.state.issuesImpactedPerYearBySelection &&
              this.state.issuesImpactedPerYearBySelection.issueDatesNextYear
                .length > 0 && (
                <>
                  {" "}
                  and {displayNumberOfIssuesAsText(
                    issuesRemainingNextYear
                  )}{" "}
                  available the following year
                </>
              )}{" "}
            <HolidayAnniversaryDateExplainerModal
              dateElement={anniversaryDateToElement(renewalDateMoment)}
            />
          </div>
        </>
      );
    } else {
      return <Spinner />;
    }
  };
}

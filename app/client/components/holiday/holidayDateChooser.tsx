import { css } from "@emotion/react";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { Link, navigate } from "@reach/router";
import * as Sentry from "@sentry/browser";
import { Property } from "csstype";
import { startCase } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import * as React from "react";
import {
  DATE_FNS_LONG_OUTPUT_FORMAT,
  dateAddYears,
  DateRange,
  dateRange,
  dateString,
  parseDate,
} from "../../../shared/dates";
import {
  isProduct,
  MembersDataApiItemContext,
} from "../../../shared/productResponse";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { trackEvent } from "../analytics";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { GenericErrorScreen } from "../genericErrorScreen";
import { ProgressIndicator } from "../progressIndicator";
import { InfoIcon } from "../svgs/infoIcon";
import { visuallyNavigateToParent, WizardStep } from "../wizardRouterAdapter";
import { HolidayAnniversaryDateExplainerModal } from "./holidayAnniversaryDateExplainerModal";
import {
  creditExplainerSentence,
  HolidayQuestionsModal,
} from "./holidayQuestionsModal";
import { HolidaySelectionInfo } from "./holidaySelectionInfo";
import { HolidayStopsRouteableStepProps } from "./holidaysOverview";
import {
  calculateIssuesImpactedPerYear,
  convertRawPotentialHolidayStopDetail,
  getPotentialHolidayStopsFetcher,
  HolidayStopDetail,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  isNotBulkSuspension,
  isNotWithdrawn,
  IssuesImpactedPerYear,
  PotentialHolidayStopsResponse,
  ReloadableGetHolidayStopsResponse,
} from "./holidayStopApi";

export const cancelLinkCss = {
  marginRight: "20px",
  fontFamily: sans,
  fontWeight: "bold" as Property.FontWeight,
  textDecoration: "underline",
  fontSize: "16px",
  color: `${neutral["7"]}`,
};

export const buttonBarCss = {
  display: "flex",
  alignItems: "center",
  marginTop: "40px",
  flexWrap: "wrap" as Property.FlexWrap,
};

const oneAtATimeStyles = {
  fontFamily: sans,
  fontSize: "14px",
  marginBottom: "27px",
};

const fixedButtonFooterCss = {
  [maxWidth.mobileLandscape]: {
    justifyContent: "space-between",
  },
  [maxWidth.phablet]: {
    position: "fixed",
    zIndex: 998,
    bottom: 0,
    left: 0,
    right: 0,
    background: neutral[100],
    padding: "10px",
    boxShadow: "0 0 5px" + neutral[60],
  },
};

interface HolidayDateChooserProps extends HolidayStopsRouteableStepProps {
  requiresExistingHolidayStopToAmendInContext?: true;
}

export interface SharedHolidayDateChooserState {
  selectedRange: DateRange;
  publicationsImpacted: HolidayStopDetail[];
}

const extractMaybeLockedStartDate = (
  holidayStopsResponse: ReloadableGetHolidayStopsResponse
) =>
  !!holidayStopsResponse.existingHolidayStopToAmend &&
  holidayStopsResponse.existingHolidayStopToAmend.mutabilityFlags &&
  !holidayStopsResponse.existingHolidayStopToAmend.mutabilityFlags
    .isFullyMutable &&
  holidayStopsResponse.existingHolidayStopToAmend.mutabilityFlags
    .isEndDateEditable
    ? holidayStopsResponse.existingHolidayStopToAmend.dateRange.start
    : null;

export function isSharedHolidayDateChooserState(
  state: any
): state is SharedHolidayDateChooserState {
  return !!state && state.selectedRange && state.publicationsImpacted;
}

const validateIssuesSelected = (
  renewalDate: Date,
  annualIssueLimit: number,
  numPotentialIssuesThisYear: number,
  issuesRemainingThisYear: number,
  numPotentialIssuesNextYear: number,
  issuesRemainingNextYear: number,
  issueKeyword: string
): React.ReactNode => {
  const dateElement = (
    <>{dateString(renewalDate, DATE_FNS_LONG_OUTPUT_FORMAT)}*</>
  );
  if (numPotentialIssuesThisYear > issuesRemainingThisYear) {
    return (
      <>
        Exceeded {issueKeyword} limit of {annualIssueLimit} before {dateElement}{" "}
        <HolidayAnniversaryDateExplainerModal
          dateElement={dateElement}
          issueKeyword={issueKeyword}
        />
        <br />
        Please choose fewer/different days...
      </>
    );
  } else if (numPotentialIssuesNextYear > issuesRemainingNextYear) {
    return (
      <>
        Exceeded {issueKeyword} limit of {annualIssueLimit} between{" "}
        {dateElement} and{" "}
        {dateString(dateAddYears(renewalDate, 1), DATE_FNS_LONG_OUTPUT_FORMAT)}
        {"* "}
        <HolidayAnniversaryDateExplainerModal
          dateElement={dateElement}
          issueKeyword={issueKeyword}
        />
        <br />
        Please choose fewer/different days...
      </>
    );
  } else if (numPotentialIssuesThisYear < 1 && numPotentialIssuesNextYear < 1) {
    return `No ${issueKeyword}s occur during selected period`;
  }
  return null; // important don't remove
};

export const HolidayDateChooserStateContext = createContext<
  SharedHolidayDateChooserState | {}
>({});

export const HolidayDateChooser = (props: HolidayDateChooserProps) => {
  const holidayStopsResponse = useContext(
    HolidayStopsResponseContext
  ) as ReloadableGetHolidayStopsResponse;

  const productDetail = useContext(MembersDataApiItemContext);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [publicationsImpacted, setPublicationsImpacted] = useState<
    HolidayStopDetail[]
  >([]);
  const [
    issuesImpactedPerYearBySelection,
    setIssuesImpactedPerYearBySelection,
  ] = useState<IssuesImpactedPerYear | null>(null);
  const [validationErrorMessage, setValidationErrorMessage] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (
      isHolidayStopsResponse(holidayStopsResponse) &&
      holidayStopsResponse.existingHolidayStopToAmend
    ) {
      const maybeLockedStartDate =
        extractMaybeLockedStartDate(holidayStopsResponse);

      setSelectedRange(
        holidayStopsResponse.existingHolidayStopToAmend.dateRange
      );
      setValidationErrorMessage(
        `Please select your new ${
          maybeLockedStartDate
            ? "end date (the start date is locked because it is within notice period) "
            : "dates"
        }...`
      );
    }
  }, []);

  const onChange =
    (
      renewalDate: Date,
      subscriptionName: string,
      combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
      allIssuesImpactedPerYear: IssuesImpactedPerYear,
      annualIssueLimit: number,
      isTestUser: boolean
    ) =>
    ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
      setSelectedRange(dateRange(startDate, endDate));
      setIssuesImpactedPerYearBySelection(null);
      setValidationErrorMessage(null);

      getPotentialHolidayStopsFetcher(
        subscriptionName,
        startDate,
        endDate,
        isTestUser
      )()
        .then((response) => {
          const locationHeader = response.headers.get("Location");
          if (
            response.status === 401 &&
            locationHeader &&
            window !== undefined
          ) {
            window.location.replace(locationHeader);
            return Promise.resolve([]);
          } else if (response.ok) {
            return response.json();
          }
          return Promise.reject(`${response.status} from holiday-stop-api`);
        })
        .then(({ potentials }: PotentialHolidayStopsResponse) => {
          const updatePublicationsImpacted: HolidayStopDetail[] =
            potentials.map(convertRawPotentialHolidayStopDetail);

          const updateIssuesImpactedPerYearBySelection =
            calculateIssuesImpactedPerYear(
              updatePublicationsImpacted,
              renewalDate
            );

          const issuesRemainingThisYear =
            Math.max(
              annualIssueLimit,
              allIssuesImpactedPerYear.issuesThisYear.length
            ) - combinedIssuesImpactedPerYear.issuesThisYear.length;

          const issuesRemainingNextYear =
            Math.max(
              annualIssueLimit,
              allIssuesImpactedPerYear.issuesNextYear.length
            ) - combinedIssuesImpactedPerYear.issuesNextYear.length;

          setPublicationsImpacted(updatePublicationsImpacted);
          setIssuesImpactedPerYearBySelection(
            updateIssuesImpactedPerYearBySelection
          );
          setValidationErrorMessage(
            validateIssuesSelected(
              renewalDate,
              annualIssueLimit,
              updateIssuesImpactedPerYearBySelection.issuesThisYear.length,
              issuesRemainingThisYear,
              updateIssuesImpactedPerYearBySelection.issuesNextYear.length,
              issuesRemainingNextYear,
              props.productType.holidayStops.issueKeyword
            )
          );
        })
        .catch((error) => {
          setValidationErrorMessage(
            `Failed to calculate ${props.productType.holidayStops.issueKeyword}s impacted by selected dates. Please try again later...`
          );
          trackEvent({
            eventCategory: "holidayDateChooser",
            eventAction: "error",
            eventLabel: error ? error.toString() : undefined,
          });
          Sentry.captureException(error);
        });
    };

  const holidayStopResponseIsValid =
    isHolidayStopsResponse(holidayStopsResponse);

  if (holidayStopResponseIsValid) {
    if (isProduct(productDetail)) {
      const existingHolidayStopToAmendId =
        holidayStopsResponse?.existingHolidayStopToAmend?.id;

      const anniversaryDate = parseDate(
        productDetail.subscription.anniversaryDate
      ).date;

      const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
        holidayStopsResponse.existing
          .filter(isNotWithdrawn)
          .filter(isNotBulkSuspension)
          .filter((_) => _.id !== existingHolidayStopToAmendId)
          .flatMap((_) => _.publicationsImpacted),
        anniversaryDate
      );

      const allIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
        holidayStopsResponse.existing
          .filter(isNotWithdrawn)
          .filter(isNotBulkSuspension)
          .flatMap((_) => _.publicationsImpacted),
        anniversaryDate
      );

      return (
        <HolidayDateChooserStateContext.Provider
          value={{ selectedRange, publicationsImpacted }}
        >
          <WizardStep routeableStepProps={props}>
            <ProgressIndicator
              steps={[
                { title: "Choose dates", isCurrentStep: true },
                { title: "Review" },
                { title: "Confirmation" },
              ]}
              additionalCSS={css`
                margin: ${space[5]}px 0 ${space[12]}px;
              `}
            />
            {props.requiresExistingHolidayStopToAmendInContext &&
              !holidayStopsResponse.existingHolidayStopToAmend &&
              visuallyNavigateToParent(props)}

            <h1>Choose the dates you will be away</h1>
            <p>
              The first available date is{" "}
              <strong>
                {dateString(
                  holidayStopsResponse.productSpecifics.firstAvailableDate,
                  "cccc d MMMM"
                )}
              </strong>{" "}
              due to{" "}
              {props.productType.holidayStops.alternateNoticeString ? (
                <strong>
                  {props.productType.holidayStops.alternateNoticeString} period
                </strong>
              ) : (
                "our printing and delivery schedule (notice period)"
              )}
              .
              <br />
              {creditExplainerSentence(
                props.productType.holidayStops.issueKeyword
              )}
            </p>
            <div css={oneAtATimeStyles}>
              <div css={{ margin: "10px" }}>
                <InfoIcon />
                You can schedule one suspension at a time.
              </div>
              <div
                css={{
                  [minWidth.mobileLandscape]: { display: "none" },
                }}
              >
                <HolidayQuestionsModal
                  annualIssueLimit={holidayStopsResponse.annualIssueLimit}
                  holidayStopFlowProperties={props.productType.holidayStops}
                />
              </div>
            </div>
            <DatePicker
              firstAvailableDate={
                holidayStopsResponse.productSpecifics.firstAvailableDate
              }
              issueDaysOfWeek={
                holidayStopsResponse.productSpecifics.issueDaysOfWeek
              }
              issueKeyword={startCase(
                props.productType.holidayStops.issueKeyword
              )}
              existingDates={holidayStopsResponse.existing
                .filter(isNotWithdrawn)
                .filter(
                  (holidayStopRequest) =>
                    holidayStopRequest.id !== existingHolidayStopToAmendId
                )
                .map((hsr) => hsr.dateRange)}
              amendableDateRange={
                holidayStopsResponse.existingHolidayStopToAmend &&
                holidayStopsResponse.existingHolidayStopToAmend.dateRange
              }
              selectedRange={selectedRange}
              maybeLockedStartDate={extractMaybeLockedStartDate(
                holidayStopsResponse
              )}
              selectionInfo={
                <HolidaySelectionInfo
                  productType={props.productType}
                  renewalDate={anniversaryDate}
                  combinedIssuesImpactedPerYear={combinedIssuesImpactedPerYear}
                  annualIssueLimit={holidayStopsResponse.annualIssueLimit}
                  publicationsImpacted={publicationsImpacted}
                  issuesImpactedPerYearBySelection={
                    issuesImpactedPerYearBySelection
                  }
                  validationErrorMessage={validationErrorMessage}
                  selectedRange={selectedRange}
                />
              }
              onChange={onChange(
                anniversaryDate,
                productDetail.subscription.subscriptionId,
                combinedIssuesImpactedPerYear,
                allIssuesImpactedPerYear,
                holidayStopsResponse.annualIssueLimit,
                productDetail.isTestUser
              )}
              dateToAsterisk={anniversaryDate}
            />
            <div
              css={{
                ...buttonBarCss,
                justifyContent: "flex-end",
                ...fixedButtonFooterCss,
              }}
            >
              <div
                css={{
                  marginRight: "30px",
                  [maxWidth.mobileLandscape]: {
                    display: "none",
                  },
                }}
              >
                <HolidayQuestionsModal
                  annualIssueLimit={holidayStopsResponse.annualIssueLimit}
                  holidayStopFlowProperties={props.productType.holidayStops}
                />
              </div>
              <Link
                css={{
                  marginRight: "20px",
                  fontFamily: sans,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: "16px",
                  color: neutral[20],
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
                  disabled={
                    !!validationErrorMessage ||
                    !selectedRange ||
                    !issuesImpactedPerYearBySelection
                  }
                  onClick={() => (props.navigate || navigate)("review")}
                  primary
                />
              </div>
            </div>
            <div css={{ height: "10px" }} />
          </WizardStep>
        </HolidayDateChooserStateContext.Provider>
      );
    }
    return (
      <GenericErrorScreen loggingMessage="No product detail for holiday stop date chooser" />
    );
  }
  return <GenericErrorScreen loggingMessage="No holiday stop response" />;
};

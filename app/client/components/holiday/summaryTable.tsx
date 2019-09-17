import { BorderCollapseProperty, TextAlignProperty } from "csstype";
import { DateRange } from "moment-range";
import React from "react";
import {
  getMainPlan,
  isPaidSubscriptionPlan,
  Subscription
} from "../../../shared/productResponse";
import palette from "../../colours";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import {
  isSharedHolidayDateChooserState,
  SharedHolidayDateChooserState
} from "./holidayDateChooser";
import { HolidayStopDetail, HolidayStopRequest } from "./holidayStopApi";

const cellCss = {
  padding: "8px 16px 8px 16px",
  border: "1px solid " + palette.neutral["5"]
};

export interface SummaryTableProps {
  data: HolidayStopRequest[] | SharedHolidayDateChooserState;
  subscription: Subscription;
  alternateSuspendedColumnHeading?: string;
}

const friendlyDateFormatPrefix = "D MMMM";

const friendlyDateFormatSuffix = " YYYY";

const formatDateRangeAsFriendly = (range: DateRange) =>
  range.start.format(
    friendlyDateFormatPrefix +
      (range.start.year() !== range.end.year() ? friendlyDateFormatSuffix : "")
  ) +
  " - " +
  range.end.format(friendlyDateFormatPrefix + friendlyDateFormatSuffix);

interface SummaryTableRowProps {
  dateRange: DateRange;
  publicationsImpacted: HolidayStopDetail[];
  currency?: string;
  asTD?: true;
}

const formattedCreditIfAvailable = (
  detail: HolidayStopDetail,
  currency?: string
) => {
  const rawAmount = detail.actualPrice || detail.estimatedPrice;
  const amountTwoDecimalPlaces = rawAmount ? rawAmount.toFixed(2) : undefined;
  return currency && rawAmount
    ? ` (${currency}${amountTwoDecimalPlaces})`
    : undefined;
};

const SummaryTableRow = (props: SummaryTableRowProps) => {
  const dateRangeStr = formatDateRangeAsFriendly(props.dateRange);

  const detailPart = (
    <>
      <strong>
        {props.publicationsImpacted.length} issue{props.publicationsImpacted
          .length !== 1
          ? "s"
          : ""}
      </strong>
      {props.publicationsImpacted.map((detail, index) => (
        <div key={index}>
          -{" "}
          {detail.publicationDate.format(
            friendlyDateFormatPrefix + friendlyDateFormatSuffix
          )}
          {formattedCreditIfAvailable(detail, props.currency)}
        </div>
      ))}
    </>
  );

  return props.asTD ? (
    <tr>
      <td>{dateRangeStr}</td>
      <td>{detailPart}</td>
    </tr>
  ) : (
    <div css={{ marginBottom: "20px" }}>
      <div
        css={{
          ...cellCss,
          backgroundColor: palette.neutral["7"],
          borderBottom: 0
        }}
      >
        {dateRangeStr}
      </div>
      <div css={cellCss}>{detailPart}</div>
    </div>
  );
};

export const SummaryTable = (props: SummaryTableProps) => {
  const holidayStopRequestsList: SummaryTableRowProps[] = isSharedHolidayDateChooserState(
    props.data
  )
    ? [
        {
          dateRange: props.data.selectedRange,
          publicationsImpacted: [
            ...props.data.issuesImpactedPerYearBySelection.issueThisYear,
            ...props.data.issuesImpactedPerYearBySelection.issueNextYear
          ]
        }
      ]
    : props.data;

  const mainPlan = getMainPlan(props.subscription);
  const currency = isPaidSubscriptionPlan(mainPlan)
    ? mainPlan.currency
    : undefined;

  return (
    <div
      css={{
        fontFamily: sans,
        fontSize: "16px"
      }}
    >
      <table
        css={{
          width: "100%",
          borderCollapse: "collapse" as BorderCollapseProperty,
          tr: {
            textAlign: "left" as TextAlignProperty
          },
          th: {
            ...cellCss,
            backgroundColor: palette.neutral["7"],
            margin: 0
          },
          td: {
            ...cellCss
          },
          [maxWidth.tablet]: {
            display: "none"
          }
        }}
      >
        <tbody>
          <tr>
            <th>Duration</th>
            <th>{props.alternateSuspendedColumnHeading || "Suspended"}</th>
          </tr>
          {holidayStopRequestsList.map((holidayStopRequest, index) => (
            <SummaryTableRow
              asTD
              key={index}
              currency={currency}
              {...holidayStopRequest}
            />
          ))}
        </tbody>
      </table>
      <div
        css={{
          [minWidth.tablet]: {
            display: "none"
          }
        }}
      >
        {holidayStopRequestsList.map((holidayStopRequest, index) => (
          <SummaryTableRow
            key={index}
            currency={currency}
            {...holidayStopRequest}
          />
        ))}
      </div>
    </div>
  );
};

import { BorderCollapseProperty, TextAlignProperty } from "csstype";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import palette from "../../colours";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import {
  isSharedHolidayDateChooserState,
  SharedHolidayDateChooserState
} from "./holidayDateChooser";
import { HolidayStopRequest } from "./holidayStopApi";

const cellCss = {
  padding: "8px 16px 8px 16px",
  border: "1px solid " + palette.neutral["5"]
};

export interface SummaryTableProps {
  data: HolidayStopRequest[] | SharedHolidayDateChooserState;
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
  publicationDatesToBeStopped: Moment[];
  asTD?: true;
}

const SummaryTableRow = (props: SummaryTableRowProps) => {
  const dateRangeStr = formatDateRangeAsFriendly(props.dateRange);

  const detailPart = (
    <>
      <strong>
        {props.publicationDatesToBeStopped.length} issue{props
          .publicationDatesToBeStopped.length !== 1
          ? "s"
          : ""}
      </strong>
      {props.publicationDatesToBeStopped.map((date, index) => (
        <div key={index}>
          - {date.format(friendlyDateFormatPrefix + friendlyDateFormatSuffix)}
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
          publicationDatesToBeStopped: [
            ...props.data.issuesImpactedPerYearBySelection.issueDatesThisYear,
            ...props.data.issuesImpactedPerYearBySelection.issueDatesNextYear
          ]
        }
      ]
    : props.data;

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
            <SummaryTableRow asTD key={index} {...holidayStopRequest} />
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
          <SummaryTableRow key={index} {...holidayStopRequest} />
        ))}
      </div>
    </div>
  );
};

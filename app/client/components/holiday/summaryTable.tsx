import { BorderCollapseProperty, TextAlignProperty } from "csstype";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import palette from "../../colours";
import { sans } from "../../styles/fonts";
import {
  isSharedHolidayDateChooserState,
  SharedHolidayDateChooserState
} from "./holidayDateChooser";
import { HolidayStopRequest } from "./holidayStopApi";

export const MAX_WIDTH = "606px";

const tableCellCss = {
  padding: "8px 16px 8px 16px",
  borderBottom: "1px solid " + palette.neutral["5"]
};

const summaryTableCss = {
  width: "100%",
  fontFamily: sans,
  fontSize: "16px",
  border: "1px solid " + palette.neutral["5"],
  borderCollapse: "collapse" as BorderCollapseProperty,
  tr: {
    textAlign: "left" as TextAlignProperty
  },
  th: {
    ...tableCellCss,
    backgroundColor: palette.neutral["7"],
    margin: 0
  },
  td: {
    ...tableCellCss
  }
};

export interface SummaryTableProps {
  data: HolidayStopRequest[] | SharedHolidayDateChooserState;
  alternateSuspendedColumnHeading?: string;
}

const friendlyDateFormatPrefix = "D MMM";

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
}

const SummaryTableRow = (props: SummaryTableRowProps) => (
  <tr>
    <td>{formatDateRangeAsFriendly(props.dateRange)}</td>
    <td>
      {props.publicationDatesToBeStopped.length} issue{props
        .publicationDatesToBeStopped.length !== 1
        ? "s"
        : ""}{" "}
      {props.publicationDatesToBeStopped.map((date, index) => (
        <div key={index}>- {date.format(friendlyDateFormatPrefix)}</div>
      ))}
    </td>
  </tr>
);

export const SummaryTable = (props: SummaryTableProps) => (
  <table css={{ ...summaryTableCss, maxWidth: MAX_WIDTH }}>
    <tbody>
      <tr>
        <th>When</th>
        <th>{props.alternateSuspendedColumnHeading || "Suspended"}</th>
      </tr>
      {isSharedHolidayDateChooserState(props.data) ? (
        <SummaryTableRow
          publicationDatesToBeStopped={[
            ...props.data.issuesImpactedBySelection.issueDatesThisYear,
            ...props.data.issuesImpactedBySelection.issueDatesNextYear
          ]}
          dateRange={props.data.selectedRange}
        />
      ) : (
        props.data.map((holidayStopRequest, index) => (
          <SummaryTableRow key={index} {...holidayStopRequest} />
        ))
      )}
    </tbody>
  </table>
);

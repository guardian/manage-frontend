import { BorderCollapseProperty, TextAlignProperty } from "csstype";
import React from "react";
import {
  DATE_FNS_LONG_OUTPUT_FORMAT,
  DateRange,
  dateString
} from "../../../shared/dates";
import {
  getMainPlan,
  isPaidSubscriptionPlan,
  Subscription
} from "../../../shared/productResponse";
import palette from "../../colours";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { ReFetch } from "../asyncLoader";
import { ExpanderButton } from "../expanderButton";
import { CollatedCredits } from "./collatedCredits";
import { ExistingHolidayStopActions } from "./existingHolidayStopActions";
import {
  isSharedHolidayDateChooserState,
  SharedHolidayDateChooserState
} from "./holidayDateChooser";
import {
  HolidayStopDetail,
  HolidayStopRequest,
  MinimalHolidayStopRequest
} from "./holidayStopApi";

const cellCss = {
  padding: "8px 16px 8px 16px",
  border: "1px solid " + palette.neutral["5"]
};

interface SummaryTableProps {
  data: HolidayStopRequest[] | SharedHolidayDateChooserState;
  isTestUser: boolean;
  subscription: Subscription;
  issueKeyword: string;
  alternateSuspendedColumnHeading?: string;
  reloadParent?: ReFetch;
  setExistingHolidayStopToAmend?: (newValue: HolidayStopRequest | null) => void;
}

export const formatDateRangeAsFriendly = (range: DateRange) =>
  `${dateString(
    range.start,
    range.start.getFullYear() !== range.end.getFullYear()
      ? DATE_FNS_LONG_OUTPUT_FORMAT
      : "d MMMM"
  )} - ${dateString(range.end, DATE_FNS_LONG_OUTPUT_FORMAT)}`;

interface SummaryTableRowProps extends MinimalHolidayStopRequest {
  issueKeyword: string;
  isTestUser: boolean;
  isOperatingOnNewHolidayStop: boolean;
  reloadParent?: ReFetch;
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
    <ExpanderButton
      buttonLabel={
        <strong>
          {props.publicationsImpacted.length} {props.issueKeyword}
          {props.publicationsImpacted.length !== 1 ? "s" : ""}
        </strong>
      }
    >
      {props.publicationsImpacted.map((detail, index) => (
        <div key={index}>
          - {detail.publicationDate.dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)}
          {formattedCreditIfAvailable(detail, props.currency)}
        </div>
      ))}
    </ExpanderButton>
  );

  const withdrawnRelatedCSS = props.withdrawnDate
    ? { textDecoration: "line-through" }
    : {};

  return props.asTD ? (
    <tr>
      <td css={withdrawnRelatedCSS}>{dateRangeStr}</td>
      <td css={withdrawnRelatedCSS}>{detailPart}</td>
      <td>
        {props.isOperatingOnNewHolidayStop ? (
          <CollatedCredits {...props} />
        ) : (
          <ExistingHolidayStopActions {...props} />
        )}
      </td>
    </tr>
  ) : (
    <div css={{ marginBottom: "20px", ...withdrawnRelatedCSS }}>
      <div
        css={{
          ...cellCss,
          ...withdrawnRelatedCSS,
          backgroundColor: palette.neutral["7"],
          borderBottom: 0
        }}
      >
        {dateRangeStr}
      </div>
      <div css={{ ...cellCss, ...withdrawnRelatedCSS }}>{detailPart}</div>
      <div css={{ ...cellCss, borderTop: 0 }}>
        {props.isOperatingOnNewHolidayStop ? (
          <>
            <strong>Expected Credits</strong>
            <CollatedCredits {...props} withBullet />
          </>
        ) : (
          <ExistingHolidayStopActions {...props} />
        )}
      </div>
    </div>
  );
};

export const SummaryTable = (props: SummaryTableProps) => {
  const holidayStopRequestsList: MinimalHolidayStopRequest[] = isSharedHolidayDateChooserState(
    props.data
  )
    ? [
        {
          dateRange: props.data.selectedRange,
          publicationsImpacted: props.data.publicationsImpacted
        }
      ]
    : props.data;

  const mainPlan = getMainPlan(props.subscription);
  const currency = isPaidSubscriptionPlan(mainPlan)
    ? mainPlan.currency
    : undefined;

  const isOperatingOnNewHolidayStop = isSharedHolidayDateChooserState(
    props.data
  );

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
            <th css={{ minWidth: "225px" }}>Duration</th>
            <th css={{ minWidth: "225px" }}>
              {props.alternateSuspendedColumnHeading || "Suspended"}
            </th>
            {isOperatingOnNewHolidayStop ? (
              <th>Expected Credits</th>
            ) : (
              <th css={{ minWidth: "205px" }}>Actions</th>
            )}
          </tr>
          {holidayStopRequestsList.map((holidayStopRequest, index) => (
            <SummaryTableRow
              {...props}
              key={index}
              isOperatingOnNewHolidayStop={isOperatingOnNewHolidayStop}
              currency={currency}
              {...holidayStopRequest}
              asTD
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
            {...props}
            key={index}
            isOperatingOnNewHolidayStop={isOperatingOnNewHolidayStop}
            currency={currency}
            {...holidayStopRequest}
          />
        ))}
      </div>
    </div>
  );
};

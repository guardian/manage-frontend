import { css } from "@emotion/core";
import React from "react";
import { OnSelectCallbackParam } from "react-daterange-picker";
import {
  dateClone,
  dateIsSame,
  DateRange,
  dateRange
} from "../../shared/dates";
import palette from "../colours";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";
import { DateInput } from "./dateInput";
import { WrappedDateRangePicker } from "./hackedDateRangePicker";

const stateDefinitions = {
  available: {
    selectable: true,
    color: "white",
    label: ""
  },
  existing: {
    selectable: false,
    color: palette.labs.main,
    label: "Existing suspensions"
  },
  amend: {
    selectable: true,
    color: palette.orange.light,
    label: "Suspension you're amending"
  }
};

interface LegendItemProps {
  color?: string;
  label: string;
  extraCss?: string;
}

const legendItems = (
  issueKeyword: string,
  includeExisting: boolean,
  includeAmend: boolean
) => [
  {
    extraCss: `
  ::after {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: ${palette.blue.header};
    transform: rotate(45deg);
    top: -14px;
    left: -14px;
  }
  `,
    label: `${issueKeyword} day`
  },
  ...(includeExisting ? [stateDefinitions.existing] : []),
  ...(includeAmend ? [stateDefinitions.amend] : [])
];

const adjustDateRangeToOvercomeHalfDateStates = (range: DateRange) => {
  const startRangeCloneMinus1Day = dateClone(range.start);
  startRangeCloneMinus1Day.setDate(startRangeCloneMinus1Day.getDate() - 1);

  const endRangeClonePlus1Day = dateClone(range.end);
  endRangeClonePlus1Day.setDate(endRangeClonePlus1Day.getDate() + 1);

  return dateRange(startRangeCloneMinus1Day, endRangeClonePlus1Day);
};

const mergeAdjacentDateRanges = (
  accumulator: DateRange[],
  currentValue: DateRange
) => {
  if (accumulator.length > 0) {
    const indexOfLast = accumulator.length - 1;
    const allButTheLast = accumulator.slice(0, indexOfLast);
    const last = accumulator[indexOfLast];
    const lastEndDatePlus1Day = dateClone(last.end);
    lastEndDatePlus1Day.setDate(lastEndDatePlus1Day.getDate() + 1);
    if (dateIsSame(lastEndDatePlus1Day, currentValue.start)) {
      return [...allButTheLast, dateRange(last.start, currentValue.end)];
    } else {
      return [...accumulator, currentValue];
    }
  } else {
    return [currentValue];
  }
};

const LegendItem = (props: LegendItemProps) => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      marginBottom: "10px"
    }}
  >
    <div
      css={[
        {
          width: "24px",
          height: "24px",
          backgroundColor: props.color,
          display: "inline-block",
          marginRight: "10px",
          border: "0 !important"
        },
        css(props.extraCss)
      ]}
      className="DateRangePicker__Date"
    />
    <span
      css={{
        marginRight: "20px",
        fontFamily: sans,
        fontSize: "14px"
      }}
    >
      {props.label}
    </span>
  </div>
);

interface DatePickerProps {
  firstAvailableDate: Date;
  issueDaysOfWeek: number[];
  issueKeyword: string;
  existingDates: DateRange[];
  amendableDateRange?: DateRange;
  selectedRange?: DateRange;
  maybeLockedStartDate: Date | null;
  selectionInfo?: React.ReactElement;
  onSelect: (range: OnSelectCallbackParam) => void;
  dateToAsterisk?: Date;
}

export const DatePicker = (props: DatePickerProps) => (
  <>
    <div
      css={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {legendItems(
        props.issueKeyword,
        props.existingDates.length > 0,
        !!props.amendableDateRange
      ).map(itemProps => (
        <LegendItem key={itemProps.label} {...itemProps} />
      ))}
    </div>
    <div
      css={{
        display: "flex",
        [maxWidth.desktop]: {
          flexDirection: "column-reverse"
        }
      }}
    >
      <div css={{ flexGrow: 1 }}>
        {/*
        <WrappedDateRangePicker
          minimumDate={props.firstAvailableDate}
          maximumDate={dateAddDays(props.firstAvailableDate, daysInYear(props.firstAvailableDate))}
          value={props.selectedRange}
          maybeLockedStartDate={props.maybeLockedStartDate}
          onSelect={props.onSelect}
          singleDateRange={true}
          showLegend={false}
          stateDefinitions={stateDefinitions}
          dateStates={[
            ...props.existingDates
              .reduce(mergeAdjacentDateRanges, []) // TODO check if they need to be merged across different types of 'date state'
              .map(range => ({
                state: "existing",
                range: adjustDateRangeToOvercomeHalfDateStates(range)
              })),
            ...(props.amendableDateRange
              ? [
                  {
                    state: "amend",
                    range: adjustDateRangeToOvercomeHalfDateStates(
                      props.amendableDateRange
                    )
                  }
                ]
              : [])
          ].sort((a, b) => a.range.start.valueOf() - b.range.start.valueOf())}
          defaultState="available"
          firstOfWeek={1}
          daysOfWeekToIconify={props.issueDaysOfWeek}
          dateToAsterisk={props.dateToAsterisk}
        />
        */}
      </div>

      <div
        css={{
          marginLeft: "18px",
          width: "136px",
          display: "flex",
          flexDirection: "column",
          fontFamily: sans,
          fontSize: "14px",
          [maxWidth.desktop]: {
            position: "sticky",
            zIndex: 998,
            top: 0,
            left: 0,
            right: 0,
            width: "100vw",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            background: palette.white,
            padding: "10px",
            paddingTop: 0,
            marginBottom: "15px",
            marginLeft: "-20px",
            marginRight: "-20px",
            boxShadow: "0 3px 5px -3px " + palette.neutral["4"]
          }
        }}
      >
        <div
          css={{
            [maxWidth.desktop]: {
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              marginTop: "10px"
            }
          }}
        >
          <div>
            <DateInput
              selectedDate={props.selectedRange && props.selectedRange.start}
              defaultDate={props.firstAvailableDate}
              labelText="From"
              disabled={!!props.maybeLockedStartDate}
            />
          </div>
          <span
            css={{ margin: "0 5px", [minWidth.desktop]: { display: "none" } }}
          >
            to
          </span>
          <div css={{ [minWidth.desktop]: { marginTop: "8px" } }}>
            <DateInput
              selectedDate={props.selectedRange && props.selectedRange.end}
              defaultDate={props.firstAvailableDate}
              labelText="To"
            />
          </div>
        </div>
        {props.selectionInfo}
      </div>
    </div>
  </>
);

import { css } from "@emotion/core";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { OnSelectCallbackParam } from "react-daterange-picker";
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
    label: "Existing suspension"
  }
};

export interface LegendItemProps {
  color?: string;
  label: string;
  extraCss?: string;
}

const legendItems: LegendItemProps[] = [
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
    label: "Issue day"
  },
  stateDefinitions.existing
];

const adjustDateRangeToOvercomeHalfDateStates = (range: DateRange) =>
  new DateRange(
    range.start.clone().subtract(1, "day"),
    range.end.clone().add(1, "day")
  );

const mergeAdjacentDateRanges = (
  accumulator: DateRange[],
  currentValue: DateRange
) => {
  if (accumulator.length > 0) {
    const indexOfLast = accumulator.length - 1;
    const allButTheLast = accumulator.slice(0, indexOfLast);
    const last = accumulator[indexOfLast];
    if (
      last.end
        .clone()
        .add(1, "day")
        .isSame(currentValue.start) // i.e. they're adjacent
    ) {
      return [...allButTheLast, new DateRange(last.start, currentValue.end)];
    } else {
      return [...accumulator, currentValue];
    }
  } else {
    return [currentValue];
  }
};

const daysInYear = (firstDate: Moment) => (firstDate.isLeapYear() ? 366 : 365);

const LegendItem = (props: LegendItemProps) => (
  <>
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
  </>
);

export interface DatePickerProps {
  firstAvailableDate: Moment;
  issueDayOfWeek: number;
  existingDates: DateRange[];
  selectedRange?: DateRange;
  selectionInfo?: React.ReactElement;
  onSelect: (range: OnSelectCallbackParam) => void;
  dateToAsterisk?: Moment;
}

export const DatePicker = (props: DatePickerProps) => (
  <>
    <div
      css={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px"
      }}
    >
      {legendItems.map(itemProps => (
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
        <WrappedDateRangePicker
          minimumDate={props.firstAvailableDate.toDate()}
          maximumDate={props.firstAvailableDate
            .clone()
            .add(daysInYear(props.firstAvailableDate.clone()), "days")
            .toDate()}
          value={props.selectedRange}
          onSelect={props.onSelect}
          singleDateRange={true}
          showLegend={false}
          stateDefinitions={stateDefinitions}
          dateStates={props.existingDates
            .reduce(mergeAdjacentDateRanges, [])
            .map(range => ({
              state: "existing",
              range: adjustDateRangeToOvercomeHalfDateStates(range)
            }))}
          defaultState="available"
          firstOfWeek={1}
          dayOfWeekToIconify={props.issueDayOfWeek}
          dateToAsterisk={props.dateToAsterisk}
        />
      </div>

      <div
        css={{
          marginLeft: "18px",
          maxWidth: "136px",
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
            maxWidth: "100vw",
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

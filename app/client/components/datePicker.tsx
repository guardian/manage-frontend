import { css } from "@emotion/core";
import { FontWeightProperty } from "csstype";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { OnSelectCallbackParam } from "react-daterange-picker";
import palette from "../colours";
import { maxWidth } from "../styles/breakpoints";
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

export interface DatePickerProps {
  firstAvailableDate: Moment;
  issueDayOfWeek: number;
  existingDates: DateRange[];
  selectedRange?: DateRange;
  selectionInfo?: React.ReactElement;
  onSelect: (range: OnSelectCallbackParam) => void;
  dateToAsterisk?: Moment;
}

export interface DatePickerState {
  validationMessage?: string;
}

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

const validationMsgCss = {
  height: "2rem",
  paddingTop: "0.5rem",
  fontWeight: "bold" as FontWeightProperty
};

export class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  public state: DatePickerState = {
    validationMessage: ""
  };

  public render = () => (
    <>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px"
        }}
      >
        {legendItems.map(props => <LegendItem key={props.label} {...props} />)}
      </div>
      <div
        css={{
          display: "flex",
          flexFlow: "wrap",
          [maxWidth.mobile]: {
            flexDirection: "row-reverse"
          }
        }}
      >
        <WrappedDateRangePicker
          numberOfCalendars={2}
          minimumDate={this.props.firstAvailableDate.toDate()}
          maximumDate={this.props.firstAvailableDate
            .clone()
            .add(daysInYear(this.props.firstAvailableDate.clone()), "days")
            .toDate()}
          value={this.props.selectedRange}
          onSelect={this.props.onSelect}
          singleDateRange={true}
          showLegend={false}
          stateDefinitions={stateDefinitions}
          dateStates={this.props.existingDates
            .reduce(mergeAdjacentDateRanges, [])
            .map(range => ({
              state: "existing",
              range: adjustDateRangeToOvercomeHalfDateStates(range)
            }))}
          defaultState="available"
          firstOfWeek={1}
          dayOfWeekToIconify={this.props.issueDayOfWeek}
          dateToAsterisk={this.props.dateToAsterisk}
        />

        <div
          css={{
            marginLeft: "18px",
            maxWidth: "136px",
            flex: "1 1 136px"
          }}
        >
          <div>
            <div>
              <DateInput
                selectedDate={
                  this.props.selectedRange && this.props.selectedRange.start
                }
                defaultDate={this.props.firstAvailableDate}
                labelText="From"
              />
            </div>
            <div css={{ marginTop: "8px" }}>
              <DateInput
                selectedDate={
                  this.props.selectedRange && this.props.selectedRange.end
                }
                defaultDate={this.props.firstAvailableDate}
                labelText="To"
              />
            </div>
          </div>
          <div
            css={{
              marginTop: "18px",
              fontFamily: sans,
              fontSize: "14px"
            }}
          >
            {this.props.selectionInfo}
          </div>
        </div>
        <div id="validation-message" role="alert" css={validationMsgCss}>
          {this.state.validationMessage}
        </div>
      </div>
    </>
  );
}

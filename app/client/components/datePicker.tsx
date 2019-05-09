import { css, Global } from "@emotion/core";
import { DateRange } from "moment-range";
import moment from "moment";
import rawDateRangePickerCSS from "!!raw-loader!react-daterange-picker/dist/css/react-calendar.css";
import React from "react";
import DateRangePicker, { OnSelectCallbackParam } from "react-daterange-picker";

const stateDefinitions = {
  available: {
    color: "white",
    label: "Available"
  },
  unavailable: {
    selectable: false,
    color: "#78818b",
    label: "Unavailable"
  }
};

export interface DatePickerProps {
  unavailableDates: DateRange[];
  selectedRange?: DateRange;
  onSelect: (range: OnSelectCallbackParam) => void;
}

const DATE_INPUT_FORMAT = "YYYY-MM-DD";

export const DatePicker = (props: DatePickerProps) => (
  <>
    <DateRangePicker
      numberOfCalendars={2}
      minimumDate={new Date()}
      value={props.selectedRange}
      onSelect={props.onSelect}
      singleDateRange={true}
      showLegend={true}
      stateDefinitions={stateDefinitions}
      dateStates={props.unavailableDates
        .sort((range1, range2) => range1.start.unix() - range2.start.unix())
        .map(range => ({
          state: "unavailable",
          range
        }))}
      defaultState="available"
    />
    <div>
      FROM:{" "}
      <input
        type="date"
        value={
          props.selectedRange
            ? props.selectedRange.start.format(DATE_INPUT_FORMAT)
            : ""
        }
        onChange={event =>
          props.selectedRange &&
          props.onSelect({
            start: moment(event.target.value, DATE_INPUT_FORMAT),
            end: props.selectedRange.end
          })
        }
      />
    </div>
    <div>
      TO:{" "}
      <input
        type="date"
        value={
          props.selectedRange
            ? props.selectedRange.end.format(DATE_INPUT_FORMAT)
            : ""
        }
        onChange={event =>
          props.selectedRange &&
          props.onSelect({
            start: props.selectedRange.start,
            end: moment(event.target.value, DATE_INPUT_FORMAT)
          })
        }
      />
    </div>
    <Global styles={css(rawDateRangePickerCSS)} />
    <Global
      styles={css(`
        .DateRangePicker__HalfDateStates {
          transform: none;
          right: 0;
        }
      `)}
    />
  </>
);

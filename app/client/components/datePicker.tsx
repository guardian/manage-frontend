import rawDateRangePickerCSS from "!!raw-loader!react-daterange-picker/dist/css/react-calendar.css";
import { css, Global } from "@emotion/core";
import moment from "moment";
import { DateRange } from "moment-range";
import React from "react";
import DateRangePicker, { OnSelectCallbackParam } from "react-daterange-picker";
import { DateInput, DateInputState } from "./dateInput";

const stateDefinitions = {
  available: {
    selectable: true,
    color: "white",
    label: ""
  },
  notice: {
    selectable: false,
    color: "#999999",
    label: "Notice period"
  },
  existing: {
    selectable: false,
    color: "#c70000",
    label: "Existing holiday stops"
  }
};

export interface DatePickerProps {
  noticePeriod: DateRange;
  existingHolidayStops: DateRange[];
  selectedRange?: DateRange;
  onSelect: (range: OnSelectCallbackParam) => void;
}

export interface DatePickerState {
  validationMessage?: string;
}

const DATE_INPUT_FORMAT = "YYYY-MM-DD";

const adjustDateRangeToDisplayProperly = (range: DateRange) =>
  new DateRange(
    range.start.clone().subtract(1, "day"),
    range.end.clone().add(1, "day")
  );

export class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  public state: DatePickerState = {
    validationMessage: ""
  };

  public validationMsgCss = {
    height: "2rem",
    paddingTop: "0.5rem",
    fontWeight: "bold"
  };

  public render = () => (
    <>
      <DateRangePicker
        numberOfCalendars={2}
        minimumDate={new Date()}
        value={this.props.selectedRange}
        onSelect={this.props.onSelect}
        singleDateRange={true}
        showLegend={true}
        stateDefinitions={stateDefinitions}
        dateStates={[
          {
            state: "notice",
            range: adjustDateRangeToDisplayProperly(this.props.noticePeriod)
          },
          ...this.props.existingHolidayStops.map(range => ({
            state: "existing",
            range: adjustDateRangeToDisplayProperly(range)
          }))
        ].sort((a, b) => a.range.start.unix() - b.range.start.unix())}
        defaultState="available"
      />

      <div>
        <span>
          Your holiday starts on:{" "}
          <DateInput
            selectedDate={
              this.props.selectedRange && this.props.selectedRange.start
            }
            defaultDate={this.props.noticePeriod.end.clone().add(1, "day")}
            onChange={this.dateInputChangeHandler(true)}
          />
        </span>
        <span>
          {" "}
          and ends on:{" "}
          <DateInput
            selectedDate={
              this.props.selectedRange && this.props.selectedRange.end
            }
            defaultDate={this.props.noticePeriod.end.clone().add(1, "days")}
            onChange={this.dateInputChangeHandler(false)}
          />
        </span>
      </div>
      <div id="validation-message" role="alert" css={this.validationMsgCss}>
        {this.state.validationMessage}
      </div>

      <Global styles={css(rawDateRangePickerCSS)} />
      <Global
        styles={css(`
        .DateRangePicker {
          --green: #3db540;
        }
        .DateRangePicker__HalfDateStates {
          transform: none;
          right: 0;
          left: 50px;
          // width: 0;
          top: 0;
        }        
        .DateRangePicker__selection {
          background-color: var(--green);
        }       
        .DateRangePicker__CalendarSelection {
          background-color: var(--green);
          border: 3px solid darken(var(--green), 5);        
        }
        .DateRangePicker--is-pending {
          background-color: rgba(var(--green), .75);
        }
        .DateRangePicker__CalendarHighlight.DateRangePicker__CalendarHighlight--single {
          border: 1px solid var(--green);
        }
        .DateRangePicker__LegendItemColor--selection {
          background-color: var(--green);
        }
        .DateRangePicker__DateLabel {
          border: 1px solid darken(var(--green), 5);
        }
      `)}
      />
    </>
  );

  private setValidationMessage = (message: string) =>
    this.setState({ validationMessage: message });

  private dateInputChangeHandler = (isStartDate: boolean) => (
    newValue: DateInputState
  ) => {
    const potentialDate = moment(
      `${newValue.year}-${newValue.month}-${newValue.day}`,
      DATE_INPUT_FORMAT
    );
    if (potentialDate.isValid()) {
      if (potentialDate.isSameOrBefore(this.props.noticePeriod.end)) {
        return this.setValidationMessage(
          `Please choose a ${
            isStartDate ? "start" : "end"
          } date after the notice period`
        );
      } else if (this.props.selectedRange) {
        const potentialRange = isStartDate
          ? new DateRange(potentialDate, this.props.selectedRange.end)
          : new DateRange(this.props.selectedRange.start, potentialDate);
        if (potentialRange.start > potentialRange.end) {
          return this.setValidationMessage(
            `Please choose a${isStartDate ? " start" : "n end"} date ${
              isStartDate ? "before" : "after"
            } the ${isStartDate ? "end" : "start"} date`
          );
        } else {
          const overlaps = this.props.existingHolidayStops.filter(range =>
            potentialRange.overlaps(range)
          );
          if (overlaps.length) {
            return this.setValidationMessage(
              `Please choose dates that do not overlap your existing holiday stop${
                overlaps.length > 1 ? "s" : ""
              }`
            );
          } else {
            this.setValidationMessage("");
            return this.props.onSelect(potentialRange);
          }
        }
      } else {
        return this.setValidationMessage(
          `Please choose a valid ${isStartDate ? "end" : "start"} date`
        );
      }
    } else {
      return this.setValidationMessage(
        `Please choose a valid ${isStartDate ? "start" : "end"} date`
      );
    }
  };
}

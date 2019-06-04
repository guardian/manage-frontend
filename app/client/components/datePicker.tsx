import rawDateRangePickerCSS from "!!raw-loader!react-daterange-picker/dist/css/react-calendar.css";
import { css, Global } from "@emotion/core";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import DateRangePicker, { OnSelectCallbackParam } from "react-daterange-picker";
import { DateInput, DateInputState } from "./dateInput";
import { Button } from "./buttons";

const stateDefinitions = {
  available: {
    selectable: true,
    color: "white",
    label: ""
  },
  // despatch: {
  //   selectable: true,
  //   color: "#f1f8fc",
  //   label: "Issue despatch"
  // },
  existing: {
    selectable: false,
    color: "#dcdcdc",
    label: "Existing holiday stops"
  }
};

export interface DatePickerProps {
  firstAvailableDate: Moment;
  existingHolidayStops: DateRange[];
  selectedRange?: DateRange;
  onSelect: (range: OnSelectCallbackParam) => void;
}

export interface DatePickerState {
  validationMessage?: string;
}

const adjustDateRangeToDisplayProperly = (range: DateRange) =>
  new DateRange(
    range.start.clone().subtract(1, "day"),
    range.end.clone().add(1, "day")
  );

// const createDespatchDateRangeArray = (firstDate: Moment) => {
//   console.log("firstDate", firstDate, typeof firstDate, firstDate.year());
//   let despatchDateRangeArray = [];
//   const daysInYear = firstDate.isLeapYear() ? 366 : 365;
//   console.log("days in year", daysInYear);
//   for (let i = 0; i < daysInYear; i++) {
//     const date = firstDate.clone().add(i, "days");
//     console.log("date after add", date.year(), date.month(), date.day());
//     console.log("weekday", date.day());
//     if (date.day() === 3) {
//       despatchDateRangeArray.push(new DateRange(date, date));
//     }
//   }
//   console.log("despatchDateRangeArray", despatchDateRangeArray);
//   return despatchDateRangeArray;
// };

const daysInYear = (firstDate: Moment) => (firstDate.isLeapYear() ? 366 : 365);

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
      <p>
        Choose the dates that you will be away. We will automatically calculate
        the number of issues you are going to miss and estimated credit you will
        get.
      </p>
      <p>
        The first available date is{" "}
        <strong>
          {this.props.firstAvailableDate.day()} /{" "}
          {this.props.firstAvailableDate.month()} /{" "}
          {this.props.firstAvailableDate.year()}
        </strong>{" "}
        due to printing and delivery schedules, and you can book up to one year
        ahead.
      </p>
      <p>You can select only one schedule at a time.</p>
      <DateRangePicker
        numberOfCalendars={2}
        minimumDate={this.props.firstAvailableDate.toDate()}
        maximumDate={this.props.firstAvailableDate
          .clone()
          .add(daysInYear(this.props.firstAvailableDate.clone()), "days")
          .toDate()}
        value={this.props.selectedRange}
        onSelect={this.props.onSelect}
        singleDateRange={true}
        showLegend={true}
        stateDefinitions={stateDefinitions}
        dateStates={[
          ...this.props.existingHolidayStops.map(range => ({
            state: "existing",
            range: adjustDateRangeToDisplayProperly(range)
          }))
        ].sort((a, b) => a.range.start.unix() - b.range.start.unix())}
        defaultState="available"
      />

      <div>
        <span>
          From:{" "}
          <DateInput
            selectedDate={
              this.props.selectedRange && this.props.selectedRange.start
            }
            defaultDate={this.props.firstAvailableDate}
          />
        </span>
        <span>
          {" "}
          To:{" "}
          <DateInput
            selectedDate={
              this.props.selectedRange && this.props.selectedRange.end
            }
            defaultDate={this.props.firstAvailableDate}
          />
        </span>
      </div>
      <div id="validation-message" role="alert" css={this.validationMsgCss}>
        {this.state.validationMessage}
      </div>
      <Button
        text="Review details"
        right={true}
        disabled={false}
        primary={true}
      />

      <Global styles={css(rawDateRangePickerCSS)} />
      <Global
        styles={css(`
        .DateRangePicker {
          --selectedColour: #3db540;
          --grey: #f4f5f6;
        }
        .DateRangePicker__HalfDateStates {
          transform: none;
          right: 0;
          left: 50px;
          top: 0;
        }        
        .DateRangePicker__selection {
          background-color: var(--selectedColour);
        }       
        .DateRangePicker__CalendarSelection {
          background-color: var(--selectedColour);
          border: 3px solid darken(var(--selectedColour), 5);        
        }
        .DateRangePicker--is-pending {
          background-color: rgba(var(--selectedColour), .75);
        }
        .DateRangePicker__CalendarHighlight.DateRangePicker__CalendarHighlight--single {
          border: 1px solid var(--selectedColour);
        }
        .DateRangePicker__LegendItemColor--selection {
          background-color: var(--selectedColour);
        }
        .DateRangePicker__DateLabel {
          border: 1px solid darken(var(--selectedColour), 5);
        }
        td.DateRangePicker__Date {
          border-left-color: var(--grey);
          border-right-color: var(--grey);
        }
        .DateRangePicker__Date.DateRangePicker__Date--weekend {
          background-color: transparent;
        }
      `)}
      />
    </>
  );
  //       );
  //     } else if (this.props.selectedRange) {
  //       const potentialRange = isStartDate
  //         ? new DateRange(potentialDate, this.props.selectedRange.end)
  //         : new DateRange(this.props.selectedRange.start, potentialDate);
  //       if (potentialRange.start > potentialRange.end) {
  //         return this.setValidationMessage(
  //           `Please choose a${isStartDate ? " start" : "n end"} date ${
  //             isStartDate ? "before" : "after"
  //           } the ${isStartDate ? "end" : "start"} date`
  //         );
  //       } else {
  //         const overlaps = this.props.existingHolidayStops.filter(range =>
  //           potentialRange.overlaps(range)
  //         );
  //         if (overlaps.length) {
  //           return this.setValidationMessage(
  //             `Please choose dates that do not overlap your existing holiday stop${
  //               overlaps.length > 1 ? "s" : ""
  //             }`
  //           );
  //         } else {
  //           this.setValidationMessage("");
  //           return this.props.onSelect(potentialRange);
  //         }
  //       }
  //     } else {
  //       return this.setValidationMessage(
  //         `Please choose a valid ${isStartDate ? "end" : "start"} date`
  //       );
  //     }
  //   } else {
  //     return this.setValidationMessage(
  //       `Please choose a valid ${isStartDate ? "start" : "end"} date`
  //     );
  //   }
  // };
}

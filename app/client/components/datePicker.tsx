import rawDateRangePickerCSS from "!!raw-loader!react-daterange-picker/dist/css/react-calendar.css";
import { css, Global } from "@emotion/core";
import { Moment } from "moment";
import moment from "moment";
import { DateRange } from "moment-range";
import React from "react";
import DateRangePicker, { OnSelectCallbackParam } from "react-daterange-picker";
import palette from "../colours";
import { maxWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";
import { DateInput } from "./dateInput";
import { Button } from "./buttons";

const issueDayAfterSuffixCss = `
::after {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: ${palette.blue.dark};
  transform: rotate(45deg);
  top: -7px;
  left: -7px;
}
`;

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
  },
  notice: {
    selectable: false,
    color: palette.neutral["5"],
    label: "Notice period"
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
  stateDefinitions.notice,
  stateDefinitions.existing
];

export interface DatePickerProps {
  firstAvailableDate: Moment;
  issueDayOfWeek: number;
  existingDates: DateRange[];
  selectedRange?: DateRange;
  selectionInfo?: React.ReactFragment;
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

export interface CustomArrowProps {
  disabled: boolean;
  onTrigger: () => void;
  direction: "next" | "previous";
}

const CustomArrow = (props: CustomArrowProps) => (
  <div
    css={{
      zIndex: 999,
      position: "absolute",
      top: 0,
      ...(props.direction === "previous"
        ? {
            left: "20px"
          }
        : {
            right: 0
          })
    }}
  >
    <Button
      text=""
      left={props.direction === "previous" ? true : undefined}
      right={props.direction === "next" ? true : undefined}
      disabled={props.disabled}
      onClick={props.onTrigger}
      forceCircle
    />
  </div>
);

const gridBorderCssValue = `1px solid ${palette.neutral["5"]} !important;`;

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
        <DateRangePicker
          numberOfCalendars={2}
          minimumDate={new Date()}
          maximumDate={this.props.firstAvailableDate
            .clone()
            .add(daysInYear(this.props.firstAvailableDate.clone()), "days")
            .toDate()}
          value={this.props.selectedRange}
          onSelect={this.props.onSelect}
          singleDateRange={true}
          showLegend={false}
          stateDefinitions={stateDefinitions}
          dateStates={[
            {
              state: "notice",
              range: adjustDateRangeToDisplayProperly(
                new DateRange(
                  moment(),
                  this.props.firstAvailableDate.clone().subtract(1, "day")
                )
              )
            },
            ...this.props.existingDates.map(range => ({
              state: "existing",
              range: adjustDateRangeToDisplayProperly(range)
            }))
          ].sort((a, b) => a.range.start.unix() - b.range.start.unix())}
          defaultState="available"
          firstOfWeek={1}
          paginationArrowComponent={CustomArrow}
        />

        <div
          css={{
            marginLeft: "20px",
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
            <div>
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
              marginTop: "24px",
              fontFamily: sans,
              fontSize: "14px"
            }}
          >
            {this.props.selectionInfo ? this.props.selectionInfo : undefined}
          </div>
        </div>
        <div id="validation-message" role="alert" css={this.validationMsgCss}>
          {this.state.validationMessage}
        </div>
      </div>

      <Global styles={css(rawDateRangePickerCSS)} />
      <Global
        styles={css(`
        .DateRangePicker {
          --selectedBackgroundColour: ${palette.yellow.medium};
          --selectedTextColour: #333;
          margin-left: -20px;
          margin-right: 0;
        }
        .DateRangePicker__HalfDateStates {
          transform: none;
          right: 0;
          left: 50px;
          top: 0;
        }        
        .DateRangePicker__Date--is-selected {
          color: var(--selectedTextColour);
        }
        .DateRangePicker__selection {
          background-color: var(--selectedBackgroundColour);
          // color: var(--selectedTextColour);
        }       
        .DateRangePicker__CalendarSelection {
          background-color: var(--selectedBackgroundColour);
          border: 3px solid darken(var(--selectedBackgroundColour), 5); 
          // color: var(--selectedTextColour);       
        }
        .DateRangePicker--is-pending {
          background-color: rgba(var(--selectedBackgroundColour), .75);
        }
        .DateRangePicker__CalendarHighlight.DateRangePicker__CalendarHighlight--single {
          border: 1px solid var(--selectedBackgroundColour);
          // color: var(--selectedTextColour);
        }
        // .DateRangePicker__LegendItemColor--selection {
        //   background-color: var(--selectedBackgroundColour);

        // }
        .DateRangePicker__DateLabel {
          border: 1px solid darken(var(--selectedBackgroundColour), 5);
        }
        .DateRangePicker__WeekdayHeading {
          border-bottom: ${gridBorderCssValue}
        }
        .DateRangePicker__Date {
          border: ${gridBorderCssValue}
          font-family: ${sans};
          font-size: 16px;
          line-height: 1.5;
        }
        .DateRangePicker__Date.DateRangePicker__Date--weekend {
          background-color: transparent;
        }
        .DateRangePicker__Week .DateRangePicker__Date:nth-of-type(${
          this.props.issueDayOfWeek
        })${issueDayAfterSuffixCss}
        .DateRangePicker__MonthDates {
          border-collapse: collapse;
        }
        .DateRangePicker__Month {
          margin-right: 0;
          width: 371px;
        }
        .DateRangePicker__MonthHeader {
          font-size: 16px;
        }
        .DateRangePicker__Weekend {
          font-size: 16px;
        }
        // .DateRangePicker__CalendarDatePeriod
        .DateRangePicker__CalendarDatePeriod--am {
          // background-color: #fff;
          width: 0;
        }
        // .DateRangePicker__PaginationArrow {
        //   width: 40px;
        //   height: 40px;
        //   border: 1px solid red;
        //   border-radius: 50%;
        // }
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

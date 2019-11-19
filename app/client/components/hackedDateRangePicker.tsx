import rawDateRangePickerCSS from "!!raw-loader!react-daterange-picker/dist/css/react-calendar.css";
import { css, Global } from "@emotion/core";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import DateRangePicker, {
  PaginationArrowProps,
  Props
} from "react-daterange-picker";
import palette from "../colours";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";
import { Button } from "./buttons";

const gridBorderCssValue = `1px solid ${palette.neutral["5"]} !important;`;

// this forces Babel to polyfill Number.isInteger (which is used in onefinestay/react-daterange-picker")
Number.isInteger(1);

const iconDayPseudoAfterCss = (dayOfWeek: number) => `
.DateRangePicker__Week .DateRangePicker__Date:nth-of-type(${dayOfWeek})::after {
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

const CustomArrow = (props: PaginationArrowProps) => (
  <div
    css={{
      zIndex: 998,
      position: "absolute",
      padding: "8px",
      top: 0,
      ...(props.direction === "previous"
        ? {
            left: 0
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

const classNameForAddingAsterisk = "day-asterisk";

const elementsByClass = (className: string, searchWithin?: Element) =>
  Array.from((searchWithin || document).getElementsByClassName(className));

// this is a bit nasty but is necessary to bold today's date. works on the assumption minimum date will always be
// after today and so can safely just find all the disabled days and bold the one matching today's day of the month
const emboldenTodaysDate = () =>
  elementsByClass("DateRangePicker__Date--is-disabled")
    .filter(dayCell => dayCell.textContent === `${new Date().getDate()}`)
    .forEach(dayCell => dayCell.setAttribute("style", "font-weight:900"));

const asteriskDate = (dateToAsterisk: Moment | undefined) =>
  dateToAsterisk &&
  elementsByClass("DateRangePicker__Month")
    .filter(monthDiv =>
      elementsByClass(
        "DateRangePicker__MonthHeaderLabel--month",
        monthDiv
      ).find(
        monthLabel =>
          !!monthLabel.textContent &&
          monthLabel.textContent.startsWith(dateToAsterisk.format("MMMM"))
      )
    )
    .forEach(monthDiv =>
      elementsByClass("DateRangePicker__DateLabel", monthDiv)
        .filter(dayCell => dayCell.textContent === dateToAsterisk.format("D"))
        .forEach(dayCell => dayCell.classList.add(classNameForAddingAsterisk))
    );

const afterRenderActions = (props: WrappedDateRangePickerProps) => {
  emboldenTodaysDate();
  asteriskDate(props.dateToAsterisk);
};

class HackedDateRangePicker extends DateRangePicker {
  constructor(props: Props) {
    super(props);
    if (this.props.numberOfCalendars && this.props.numberOfCalendars > 12) {
      // this prevents jumping to the selection when in 'infinite mode' (i.e. loads of vertically stacked cals)
      // @ts-ignore - required because this function is internal and typescript doesn't know about it
      super.isStartOrEndVisible = () => true;
    }

    // this casting is required because this class extends 'DateRangePicker' from a library so the 'props' type is fixed
    // however, the 'maybeLockedStartDate' prop IS being passed in, so with a cast we can retrieve it without compilation error
    const lockedStartDate = (this.props as WrappedDateRangePickerProps)
      .maybeLockedStartDate;
    if (lockedStartDate) {
      // overriding https://github.com/onefinestay/react-daterange-picker/blob/c73c9/src/DateRangePicker.jsx#L269-L288
      // @ts-ignore - required because these functions are internal and typescript doesn't know about them
      super.onSelectDate = (endDate: Moment) => {
        // @ts-ignore
        if (!this.isDateDisabled(endDate) && this.isDateSelectable(endDate)) {
          // @ts-ignore
          this.highlightRange(new DateRange(lockedStartDate, endDate));
          // @ts-ignore
          this.completeRangeSelection();
        }
      };
    }
  }

  public componentDidMount(): void {
    if (super.componentDidMount) {
      super.componentDidMount();
    }
    afterRenderActions(this.props as WrappedDateRangePickerProps);
    // this prevents jumping to the selection when returning from review stage in 'infinite mode'
    if (this.props.numberOfCalendars && this.props.numberOfCalendars > 12) {
      const today = new Date();
      this.setState({
        year: today.getFullYear(),
        month: today.getMonth()
      });
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<Props<DateRangePicker>>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState, snapshot);
    }
    afterRenderActions(this.props as WrappedDateRangePickerProps);
  }
}

export interface WrappedDateRangePickerProps extends Props {
  dateToAsterisk?: Moment;
  daysOfWeekToIconify: number[];
  maybeLockedStartDate: Moment | null;
}

export const WrappedDateRangePicker = (props: WrappedDateRangePickerProps) => (
  <>
    <div css={{ [maxWidth.phablet]: { display: "none" } }}>
      <HackedDateRangePicker
        {...props}
        numberOfCalendars={2}
        paginationArrowComponent={CustomArrow}
        ref={undefined /* hushes type warning */}
      />
    </div>
    <div
      css={{ [minWidth.phablet]: { display: "none" } }}
      onTouchStartCapture={e => e.stopPropagation()}
    >
      <HackedDateRangePicker
        {...props}
        numberOfCalendars={13}
        paginationArrowComponent={() => null}
        disableNavigation={true}
        ref={undefined /* hushes type warning */}
      />
    </div>
    <Global styles={css(rawDateRangePickerCSS)} />
    <Global
      styles={css(`
    
        .${classNameForAddingAsterisk}::after {
          content: "*";
          display: inline-block;
          position: absolute;
          top: -3px;
          padding-left: 2px;
          font-weight: bold;
        }
    
        .DateRangePicker {
          --selectedBackgroundColour: ${palette.yellow.medium};
          --selectedTextColour: #333;
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .DateRangePicker__HalfDateStates {
          display: none; /* Safe to hide half dates, because we already adjust the dates - see adjustDateRangeToOvercomeHalfDateStates function */
        }        
        .DateRangePicker__Date--is-selected {
          color: var(--selectedTextColour);
        }
        .DateRangePicker__selection {
          background-color: var(--selectedBackgroundColour);
        }       
        .DateRangePicker__CalendarSelection {
          background-color: var(--selectedBackgroundColour);
          border: 3px solid darken(var(--selectedBackgroundColour), 5); 
        }
        .DateRangePicker--is-pending {
          background-color: rgba(var(--selectedBackgroundColour), .75);
        }
        .DateRangePicker__CalendarHighlight.DateRangePicker__CalendarHighlight--single {
          border: 1px solid var(--selectedBackgroundColour);
        }
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
        ${props.daysOfWeekToIconify.map(iconDayPseudoAfterCss).join("\n")}
        .DateRangePicker__MonthDates {
          border-collapse: collapse;
        }
        .DateRangePicker__Month {
          margin: 0;
        }
        ${minWidth.phablet} { 
          .DateRangePicker__Month {
            width: calc(50% - 10px);
          }
        }
        ${maxWidth.phablet} { 
          .DateRangePicker__Month {
            width: 100%;
            margin-bottom: 10px;
          }
        }
        .DateRangePicker__MonthHeader {
          font-size: 16px;
        }
        .DateRangePicker__Weekend {
          font-size: 16px;
        }
        .DateRangePicker__Weekdays {
          border-left: ${gridBorderCssValue}
          border-right: ${gridBorderCssValue}
        }
        .DateRangePicker__MonthHeader {
          border-top: ${gridBorderCssValue}
          border-left: ${gridBorderCssValue}
          border-right: ${gridBorderCssValue}
          height: auto;
          padding-top: 8px;
          padding-bottom: 5px;
        }
      `)}
    />
  </>
);

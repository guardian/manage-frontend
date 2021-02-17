import React, {useState} from "react";
import { dateAddDays, DateRange } from "../../shared/dates";
import palette from "../colours";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";
import {css} from "@emotion/core";
const gridBorderCssValue = `1px solid ${palette.neutral["5"]} !important;`;

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

const classNameForAddingAsterisk = "day-asterisk";

/*
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
*/

interface WrappedDateRangePickerProps {
  minimumDate: Date;
  maximumDate:Date;
  value?: DateRange;
  dateToAsterisk?: Date;
  daysOfWeekToIconify: number[];
  maybeLockedStartDate: Date | null;
  onChange: (range: {startDate: Date, endDate:Date}) => void;
  singleDateRange?: true;
  showLegend: boolean;
  stateDefinitions: any;
  dateStates: any;
  defaultState: string;
  firstOfWeek: number;
}


export const WrappedDateRangePicker = (props: WrappedDateRangePickerProps) => (
  <>
    <div css={{ [maxWidth.phablet]: { display: "none" }}}>
      <DateRangePicker numberOfCalendars={2} direction="horizontal" />
    </div>
    <div
      css={{ [minWidth.phablet]: { display: "none" } }}
      onTouchStartCapture={e => e.stopPropagation()}
    >
      <DateRangePicker numberOfCalendars={11} direction="vertical" />
    </div>
  </>
);


interface DateRangePickerProps {
    numberOfCalendars: number;
    direction: "vertical" | "horizontal";
}
const DateRangePicker = (props:DateRangePickerProps) => {
  const [calendars, setCalendars] = useState<number[]>(Array.from({length: props.numberOfCalendars}, (_, i) => i + 1));
  return (<div css={css`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between
    `}>
    {calendars.map(calendarMonth => (
      <div css={css`
        width: ${props.direction === "horizontal" ? "calc(50% - 12px)" : "100%"};
        height: 100px;
        background-color: red;
        `}>{calendarMonth}</div>
    ))}
  </div>);
};

/*
export const WrappedDateRangePicker = (props: WrappedDateRangePickerProps) => (
  <>
    <div css={{ [maxWidth.phablet]: { display: "none" } }}>
      <DateRangePicker
        onChange={item => console.log("date range changed", item)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={testRange}
        direction="horizontal"
      />;
      {
      <HackedDateRangePicker
        {...props}
        numberOfCalendars={2}
        paginationArrowComponent={CustomArrow}
        ref={undefined}
      />
      }
    </div>
    <div
      css={{ [minWidth.phablet]: { display: "none" } }}
      onTouchStartCapture={e => e.stopPropagation()}
    >
      {
      <HackedDateRangePicker
        {...props}
        numberOfCalendars={13}
        paginationArrowComponent={() => null}
        disableNavigation={true}
        ref={undefined}
      />
      }
    </div>
);
*/


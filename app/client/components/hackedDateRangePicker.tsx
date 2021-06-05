import { css } from "@emotion/core";
import { neutral, space } from "@guardian/src-foundations";
import React, { useState } from "react";
import {
  dateAddDays,
  dateAddMonths,
  dateIsSameOrAfter,
  dateIsSameOrBefore,
  DateRange,
  DateStates
} from "../../shared/dates";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { CalendarTable, CalendarTableDate } from "./holiday/calendarTable";
import { SelectHeaderInput } from "./holiday/selectHeaderInput";

interface WrappedDateRangePickerProps {
  minimumDate: Date;
  maximumDate: Date;
  value?: DateRange;
  dateToAsterisk?: Date;
  daysOfWeekToIconify: number[];
  maybeLockedStartDate: Date | null;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
  singleDateRange?: true;
  showLegend: boolean;
  stateDefinitions: any;
  dateStates: DateStates[];
  defaultState: string;
  firstOfWeek: number;
}

export const WrappedDateRangePicker = (props: WrappedDateRangePickerProps) => (
  <>
    <div css={{ [maxWidth.phablet]: { display: "none" } }}>
      <DateRangePicker
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
        daysOfWeekToIconify={props.daysOfWeekToIconify}
        numberOfVisibleCalendars={2}
        direction="horizontal"
        onChange={props.onChange}
        dateStates={props.dateStates}
        {...(props.maybeLockedStartDate && {
          startDate: props.maybeLockedStartDate
        })}
      />
    </div>
    <div
      css={{ [minWidth.phablet]: { display: "none" } }}
      onTouchStartCapture={e => e.stopPropagation()}
    >
      <DateRangePicker
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
        daysOfWeekToIconify={props.daysOfWeekToIconify}
        numberOfVisibleCalendars={11}
        direction="vertical"
        onChange={props.onChange}
        dateStates={props.dateStates}
        {...(props.maybeLockedStartDate && {
          maybeLockedStartDate: props.maybeLockedStartDate
        })}
      />
    </div>
  </>
);

interface DateRangePickerProps {
  numberOfVisibleCalendars: number;
  direction: "vertical" | "horizontal";
  minimumDate: Date;
  maximumDate: Date;
  daysOfWeekToIconify: number[];
  onChange: (range: { startDate: Date; endDate: Date }) => void;
  dateStates?: DateStates[];
  maybeLockedStartDate?: Date;
}
interface CalendarsState {
  calendarMonth: Date;
  minimumDate: Date;
  maximumDate: Date;
}
const DateRangePicker = (props: DateRangePickerProps) => {
  const startOfMonthOfMinDate = new Date(
    props.minimumDate.getFullYear(),
    props.minimumDate.getMonth(),
    1
  );

  const monthsBetweenMimAndMax =
    (props.maximumDate.getFullYear() - props.minimumDate.getFullYear()) * 12 -
    props.minimumDate.getMonth() +
    props.maximumDate.getMonth() +
    1;

  const [calendar, setCalendar] = useState<CalendarsState[]>(
    Array.from({ length: monthsBetweenMimAndMax }, (_, i) => {
      const calendarMonth = dateAddMonths(startOfMonthOfMinDate, i);
      return {
        calendarMonth,
        minimumDate: props.minimumDate,
        maximumDate: props.maximumDate
      };
    })
  );

  const onStartSelectingDates = (selectionStartDate: Date) => {
    setSelectedStartDate(selectionStartDate);
  };

  const onSelectingDates = (
    calendarDates: CalendarTableDate[],
    currentlySelectedDate: CalendarTableDate
  ) => {
    if (selectedStartDate) {
      const calendarSelectedDates = calendarDates.filter(
        calendarDate => calendarDate.isSelected
      );
      const latestCalendarSelectedDate =
        calendarSelectedDates[calendarSelectedDates.length - 1].date;
      const earliestCalendarSelectedDate = calendarSelectedDates[0].date;
      const additionalSelectedDatesToMark: CalendarTableDate[] = [];
      // check if currentlySelectedDate day is not adjacent to the start of the end of the selected range, if not we need to fill in the blanks
      if (
        currentlySelectedDate.date > dateAddDays(latestCalendarSelectedDate, 1)
      ) {
        const from =
          calendarSelectedDates[calendarSelectedDates.length - 1].date;
        const to = currentlySelectedDate.date;
        for (const day = from; day <= to; day.setDate(day.getDate() + 1)) {
          // is this day already an existing holiday stop?
          const isDayExistingHolidayStop = props.dateStates?.some(
            dateState =>
              day >= dateState.range.start &&
              day <= dateState.range.end &&
              dateState.state === "existing"
          );
          if (isDayExistingHolidayStop) {
            break;
          }
          additionalSelectedDatesToMark.push({
            date: new Date(day),
            isActive:
              dateIsSameOrAfter(day, props.minimumDate) &&
              dateIsSameOrBefore(day, props.maximumDate),
            isDeliveryDay: !!props.daysOfWeekToIconify?.some(
              iconDay => iconDay === (day.getDay() || 7)
            ),
            isSelected: true,
            isExisting: false
          });
        }
      } else if (
        currentlySelectedDate.date <
        dateAddDays(earliestCalendarSelectedDate, -1)
      ) {
        const from = calendarSelectedDates[0].date;
        const to = currentlySelectedDate.date;
        for (const day = from; day >= to; day.setDate(day.getDate() - 1)) {
          // is this day already an existing holiday stop?
          const isDayExistingHolidayStop = props.dateStates?.some(
            dateState =>
              day >= dateState.range.start &&
              day <= dateState.range.end &&
              dateState.state === "existing"
          );
          if (isDayExistingHolidayStop) {
            break;
          }
          additionalSelectedDatesToMark.push({
            date: new Date(day),
            isActive:
              dateIsSameOrAfter(day, props.minimumDate) &&
              dateIsSameOrBefore(day, props.maximumDate),
            isDeliveryDay: !!props.daysOfWeekToIconify?.some(
              iconDay => iconDay === (day.getDay() || 7)
            ),
            isSelected: true,
            isExisting: false
          });
        }
      }
      setSelectedDates([
        ...calendarSelectedDates,
        ...additionalSelectedDatesToMark
      ]);
    }
  };

  const onFinishedSelectingDates = (selectionEndDate: Date) => {
    setSelectedEndDate(selectionEndDate);
  };

  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [selectedDates, setSelectedDates] = useState<CalendarTableDate[]>([]);

  const [monthsInFocus, setMonthsInFocus] = useState<number[]>([
    ...Array(props.numberOfVisibleCalendars).keys()
  ]);
  const selectableMonths = [...new Array(monthsBetweenMimAndMax)].map(
    (_, monthIndex) => {
      const month = dateAddMonths(startOfMonthOfMinDate, monthIndex);
      return `${month.toLocaleString("default", {
        month: "long"
      })} ${month.getFullYear()}`;
    }
  );

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      `}
    >
      {monthsInFocus.map((focussedMonthIndex, focussedCalendarMonthIndex) => (
        <div
          css={css`
            width: ${props.direction === "horizontal"
              ? `calc(50% - ${space[5] / 2}px)`
              : "100%"};
          `}
          key={`calendar${focussedCalendarMonthIndex}`}
        >
          <div
            css={css`
              display: flex;
              justify-content: center;
              border: 1px solid ${neutral[86]};
              border-bottom: none;
              padding: ${space[2]}px 0 ${space[1]}px;
            `}
          >
            <SelectHeaderInput
              options={selectableMonths}
              preSelectedOption={`${calendar[
                focussedMonthIndex
              ].calendarMonth.toLocaleString("default", {
                month: "long"
              })} ${calendar[focussedMonthIndex].calendarMonth.getFullYear()}`}
              onChangeHandler={((whichCalendar: number) => (
                e: React.ChangeEvent<HTMLSelectElement>
              ) => {
                const newMonthIndex = e.target.selectedIndex;

                let monthOffset = 0;
                if (whichCalendar > 0) {
                  monthOffset =
                    newMonthIndex < whichCalendar
                      ? whichCalendar - newMonthIndex
                      : -whichCalendar;
                } else if (
                  newMonthIndex >
                  e.target.options.length - props.numberOfVisibleCalendars
                ) {
                  monthOffset = -(e.target.options.length - newMonthIndex);
                }

                const newFocussedMonths = Array.from(
                  { length: props.numberOfVisibleCalendars },
                  (_, i) => i + newMonthIndex + monthOffset
                );
                setMonthsInFocus(newFocussedMonths);
              })(focussedCalendarMonthIndex)}
            />
          </div>
          <CalendarTable
            key={`${monthsInFocus.toString()}-${focussedCalendarMonthIndex}`}
            selectedMonth={calendar[focussedMonthIndex].calendarMonth}
            daysOfWeekToIconify={props.daysOfWeekToIconify}
            minimumDate={props.minimumDate}
            maximumDate={props.maximumDate}
            dateStates={props.dateStates}
            startSelectingDatesHandler={onStartSelectingDates}
            upOnHighSelectionStartDate={selectedStartDate}
            finishedSelectingDatesHandler={onFinishedSelectingDates}
            upOnHighSelectionFinishedDate={selectedEndDate}
            selectingDatesHandler={onSelectingDates}
            upOnHighSelectingDates={selectedDates}
          />
        </div>
      ))}
    </div>
  );
};

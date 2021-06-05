import { css } from "@emotion/core";
import {
  brand,
  brandAlt,
  labs,
  neutral,
  space
} from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useEffect, useState } from "react";
import {
  dateAddDays,
  dateIsBefore,
  dateIsSameOrAfter,
  dateIsSameOrBefore,
  DateRange,
  dateRange,
  DateStates,
  getWeekDay,
  isDateBetweenRange,
  numberOfDaysInMonth
} from "../../../shared/dates";

interface CalendarTableProps {
  selectedMonth: Date;
  minimumDate: Date;
  maximumDate: Date;
  daysOfWeekToIconify?: number[];
  selectedDates?: Date[];
  existingDates?: Date[];
  dateStates?: DateStates[];
  startSelectingDatesHandler?: (selectionStartDate: Date) => void;
  upOnHighSelectionStartDate?: Date;
  finishedSelectingDatesHandler?: (selectionFinishDate: Date) => void;
  upOnHighSelectionFinishedDate?: Date;
  selectingDatesHandler?: (
    calendarDates: CalendarTableDate[],
    currentlySelectedDate: CalendarTableDate
  ) => void;
  upOnHighSelectingDates?: CalendarTableDate[];
}

export interface CalendarTableDate {
  date: Date;
  isActive: boolean;
  isDeliveryDay: boolean;
  isSelected: boolean;
  isExisting: boolean;
}

export const CalendarTable = (props: CalendarTableProps) => {
  const thCss = css`
    flex-grow: 1;
    width: 14.2%;
    text-align: center;
    padding: 0 0 ${space[3]}px;
    ${textSans.medium({ fontWeight: "bold" })};
    &:last-of-type {
      border-right: 1px solid ${neutral[86]};
    }
  `;

  const tdCss = (
    isActive: boolean,
    isDeliveryDay: boolean,
    isSelected: boolean,
    isExisting: boolean
  ) => css`
    flex-grow: 1;
    width: 14.2%;
    text-align: center;
    position: relative;
    border-top: 1px ${isActive ? "solid" : "dashed"} ${neutral[86]};
    border-right: 1px ${isActive ? "solid" : "dashed"} ${neutral[86]};
    padding: ${space[3]}px 0;
    ${textSans.medium()};
    color: ${neutral[7]};
    opacity: ${isActive ? "1" : "0.5"};
    cursor: ${isActive ? "pointer" : "default"};
    ${isDeliveryDay
      ? `
        &:before {
          content: '';
          display: block;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid ${brand[400]};
          position: absolute;
          top: 0;
          left: -4px;
          rotate: -45deg;
          opacity: ${isActive ? "1" : "0.5"};
        }
      `
      : ""}
    ${isSelected || isExisting
      ? `
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 4px;
          background-color: ${isSelected ? brandAlt[400] : labs[400]};
          z-index: -1;
        }
      `
      : ""}

        :hover {
      outline: 2px solid ${brandAlt[400]};
      outline-offset: -8px;
    }
  `;

  const days: Array<{ day: string; abbr: string }> = [
    { day: "Monday", abbr: "Mon" },
    { day: "Tuesday", abbr: "Tue" },
    { day: "Wednesday", abbr: "Wed" },
    { day: "Thursday", abbr: "Thu" },
    { day: "Friday", abbr: "Fri" },
    { day: "Saturday", abbr: "Sat" },
    { day: "Sunday", abbr: "Sun" }
  ];

  const firstDayOfSelectedMonth = getWeekDay(props.selectedMonth);
  const firstDayOfSelectedMonthNum = days.findIndex(
    day => day.day === firstDayOfSelectedMonth
  );
  const totalDaysInSelectedMonth = numberOfDaysInMonth(props.selectedMonth);

  const isDateDeliveryDay = (date: Date) =>
    !!props.daysOfWeekToIconify?.some(day => day === (date.getDay() || 7));

  const prependDatesPadding = [...new Array(firstDayOfSelectedMonthNum)]
    .map((_, dateIndex) => {
      const date = dateAddDays(props.selectedMonth, -(dateIndex + 1));
      const isSelected =
        props.dateStates
          ?.filter(dateState => dateState.state === "amend")
          .some(dateState =>
            isDateBetweenRange(date, dateState.range.start, dateState.range.end)
          ) || false;
      const isExisting =
        props.dateStates
          ?.filter(dateState => dateState.state === "existing")
          .some(dateState =>
            isDateBetweenRange(date, dateState.range.start, dateState.range.end)
          ) || false;
      return {
        date,
        isActive: false,
        isDeliveryDay: isDateDeliveryDay(date),
        isSelected,
        isExisting
      };
    })
    .reverse();

  const selectedMonthDates = [...new Array(totalDaysInSelectedMonth)].map(
    (_, dateIndex) => {
      const date = dateAddDays(props.selectedMonth, dateIndex);
      const isSelected =
        props.dateStates
          ?.filter(dateState => dateState.state === "amend")
          .some(dateState =>
            isDateBetweenRange(date, dateState.range.start, dateState.range.end)
          ) || false;
      const isExisting =
        props.dateStates
          ?.filter(dateState => dateState.state === "existing")
          .some(dateState =>
            isDateBetweenRange(date, dateState.range.start, dateState.range.end)
          ) || false;
      return {
        date,
        isActive:
          dateIsSameOrAfter(date, props.minimumDate) &&
          dateIsSameOrBefore(date, props.maximumDate),
        isDeliveryDay: isDateDeliveryDay(date),
        isSelected,
        isExisting
      };
    }
  );

  const lastDayOfSelectedMonth =
    selectedMonthDates[selectedMonthDates.length - 1].date;

  const numberOfExtraDayToAppend =
    firstDayOfSelectedMonthNum + totalDaysInSelectedMonth > 35
      ? 42 - (firstDayOfSelectedMonthNum + totalDaysInSelectedMonth)
      : 35 - (firstDayOfSelectedMonthNum + totalDaysInSelectedMonth);

  const appendDatesPadding = [...new Array(numberOfExtraDayToAppend)].map(
    (_, dateIndex) => {
      const date = dateAddDays(lastDayOfSelectedMonth, dateIndex + 1);
      const isSelected =
        props.dateStates
          ?.filter(dateState => dateState.state === "amend")
          .some(dateState =>
            isDateBetweenRange(date, dateState.range.start, dateState.range.end)
          ) || false;
      const isExisting =
        props.dateStates
          ?.filter(dateState => dateState.state === "existing")
          .some(dateState =>
            isDateBetweenRange(date, dateState.range.start, dateState.range.end)
          ) || false;
      return {
        date,
        isActive: false,
        isDeliveryDay: isDateDeliveryDay(date),
        isSelected,
        isExisting
      };
    }
  );

  const [dates, setDates] = useState<CalendarTableDate[]>([
    ...prependDatesPadding,
    ...selectedMonthDates,
    ...appendDatesPadding
  ]);

  const [selectionInProgress, setSelectionInProgress] = useState<boolean>(
    false
  );
  const [firstSelectedDate, setFirstSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (
      props.upOnHighSelectionStartDate &&
      firstSelectedDate !== props.upOnHighSelectionStartDate
    ) {
      setFirstSelectedDate(props.upOnHighSelectionStartDate);
      setSelectionInProgress(true);
    }
  }, [props.upOnHighSelectionStartDate]);

  useEffect(() => {
    if (props.upOnHighSelectionFinishedDate) {
      setSelectionInProgress(false);
    }
  }, [props.upOnHighSelectionFinishedDate]);

  useEffect(() => {
    if (props.upOnHighSelectingDates) {
      const matchingExternalDates = props.upOnHighSelectingDates.filter(
        upOnHighDate =>
          dates.some(
            internalDate =>
              internalDate.date.valueOf() === upOnHighDate.date.valueOf()
          )
      );
      if (matchingExternalDates.length) {
        setDates(
          dates.map(
            date =>
              matchingExternalDates.find(
                upOnHighDate =>
                  upOnHighDate.date.valueOf() === date.date.valueOf()
              ) || date
          )
        );
      }
    }
  }, [props.upOnHighSelectingDates]);

  const selectDate = (dateIndex: number, isInitialSelection?: boolean) => {
    const dateTime = dates[dateIndex].date.getTime();
    setDates(
      dates.map(date =>
        date.date.getTime() === dateTime
          ? { ...date, isSelected: true }
          : {
              ...date,
              isSelected: isInitialSelection ? false : date.isSelected
            }
      )
    );
  };

  const handleDateMouseDown = (dateIndex: number) => () => {
    const targetDate = dates[dateIndex];
    if (
      targetDate.isActive &&
      targetDate.isDeliveryDay &&
      !targetDate.isSelected &&
      !targetDate.isExisting &&
      !selectionInProgress
    ) {
      setFirstSelectedDate(targetDate.date);
      selectDate(dateIndex, true);
      setSelectionInProgress(true);
      props.startSelectingDatesHandler?.(targetDate.date);
    } else if (
      selectionInProgress &&
      targetDate.date.valueOf() === firstSelectedDate?.valueOf()
    ) {
      setSelectionInProgress(false);
    }
  };

  const handleDateMouseUp = (dateIndex: number) => () => {
    const targetDate = dates[dateIndex];
    if (targetDate.date.valueOf() !== firstSelectedDate?.valueOf()) {
      setSelectionInProgress(false);
      props.finishedSelectingDatesHandler?.(targetDate.date);
    }
  };

  const handleDateMouseEnter = (dateIndex: number) => () => {
    const targetDate = dates[dateIndex];
    if (selectionInProgress && firstSelectedDate) {
      // calculate all the dates that should be selected!
      const areWeSelectingBackwards = dateIsBefore(
        targetDate.date,
        firstSelectedDate
      );
      const unavailableDatesBetweenRange: number[] = [];
      // TODO: can the following be optimised?
      const existingEntryRanges = props.dateStates
        ? props.dateStates.filter(dateState => dateState.state === "existing")
        : [];
      existingEntryRanges.map(existingEntryRange => {
        let n = existingEntryRange.range.start.valueOf();
        while (n <= existingEntryRange.range.end.valueOf()) {
          // find if n is within the selected date range, if so add it to the unavailableDatesBetweenRange array
          const selectedDateRangeMin = Math.min(
            firstSelectedDate.valueOf(),
            targetDate.date.valueOf()
          );
          const selectedDateRangeMax = Math.max(
            firstSelectedDate.valueOf(),
            targetDate.date.valueOf()
          );
          if (n >= selectedDateRangeMin && n <= selectedDateRangeMax) {
            unavailableDatesBetweenRange.push(
              dates.findIndex(date => date.date.valueOf() === n)
            );
          }

          n = dateAddDays(new Date(n), 1).valueOf();
        }
      });

      const forwardStart = firstSelectedDate.valueOf();

      const forwardEnd = unavailableDatesBetweenRange.length
        ? dateAddDays(
            dates[Math.min(...unavailableDatesBetweenRange)].date,
            -1
          ).valueOf()
        : targetDate.date.valueOf();

      const backwardStart = unavailableDatesBetweenRange.length
        ? dateAddDays(
            dates[Math.max(...unavailableDatesBetweenRange)].date,
            1
          ).valueOf()
        : targetDate.date.valueOf();
      const backwardEnd = firstSelectedDate.valueOf();

      const validSelectedRange: DateRange = areWeSelectingBackwards
        ? dateRange(new Date(backwardStart), new Date(backwardEnd))
        : dateRange(new Date(forwardStart), new Date(forwardEnd));

      const updatedDates = dates.map(date => {
        return {
          ...date,
          isSelected:
            date.date.valueOf() >= validSelectedRange.start.valueOf() &&
            date.date.valueOf() <= validSelectedRange.end.valueOf()
        };
      });

      setDates(updatedDates);
      props.selectingDatesHandler?.(updatedDates, targetDate);
      console.log("updatedDates = ", updatedDates);
    }
  };

  return (
    <div
      css={css`
        border-left: 1px solid ${neutral[86]};
        border-bottom: 1px solid ${neutral[86]};
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      `}
    >
      {days.map(day => (
        <abbr title={day.day} css={thCss} key={day.day}>
          {day.abbr}
        </abbr>
      ))}
      {dates.map((date, dateIndex) => (
        <div
          css={tdCss(
            date.isActive,
            date.isDeliveryDay,
            date.isSelected,
            date.isExisting
          )}
          key={date.date.getTime()}
          onMouseDown={handleDateMouseDown(dateIndex)}
          onTouchStart={() => true}
          onMouseEnter={handleDateMouseEnter(dateIndex)}
          onMouseLeave={() => true}
          onMouseUp={handleDateMouseUp(dateIndex)}
          onTouchEnd={() => true}
        >
          {date.date.getDate()}
        </div>
      ))}
    </div>
  );
};

import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import {
  brand,
  brandAlt,
  labs,
  neutral
} from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import {
  dateAddDays,
  getWeekDay,
  numberOfDaysInMonth
} from "../../../shared/dates";
import { minWidth } from "../../styles/breakpoints";
import { CalendarTableDate } from "./holidayCalendarTables";

interface HolidayCalendarTableProps {
  holidayDates: CalendarTableDate[];
  targetMonthStartDate: Date;
  handleDayMouseDown: (day: Date) => void;
  handleDayMouseUp: () => void;
  handleDayMouseEnter: (day: Date) => void;
  hideAtDesktop: boolean;
  daysOfWeekToIconify?: number[];
}

const days: Array<{ day: string; abbr: string }> = [
  { day: "Monday", abbr: "Mon" },
  { day: "Tuesday", abbr: "Tue" },
  { day: "Wednesday", abbr: "Wed" },
  { day: "Thursday", abbr: "Thu" },
  { day: "Friday", abbr: "Fri" },
  { day: "Saturday", abbr: "Sat" },
  { day: "Sunday", abbr: "Sun" }
];

export const HolidayCalendarTable = (props: HolidayCalendarTableProps) => {
  const holderCss = css`
    ${minWidth.tablet} {
      width: calc(50% - ${space[2]}px);
      display: ${props.hideAtDesktop ? "none" : "block"};
    }
  `;
  const tableHolderCss = css`
    border-left: 1px solid ${neutral[86]};
    border-bottom: 1px solid ${neutral[86]};
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `;

  const monthTitleCss = css`
    ${textSans.medium({ fontWeight: "bold" })};
    line-height: 35px;
    text-align: center;
    display: block;
    padding: ${space[2]}px 0 5px;
    border: 1px solid ${neutral[86]};
    border-bottom: 0;
  `;

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

  const firstDayOfSelectedMonth = getWeekDay(props.targetMonthStartDate);
  const firstDayOfSelectedMonthNum = days.findIndex(
    day => day.day === firstDayOfSelectedMonth
  );
  const totalDaysInSelectedMonth = numberOfDaysInMonth(
    props.targetMonthStartDate
  );

  const prependDatesPadding = [...new Array(firstDayOfSelectedMonthNum)]
    .map((_, dateIndex) => {
      return dateAddDays(props.targetMonthStartDate, -(dateIndex + 1));
    })
    .reverse();

  const selectedMonthDates = [...new Array(totalDaysInSelectedMonth)].map(
    (_, dateIndex) => {
      return dateAddDays(props.targetMonthStartDate, dateIndex);
    }
  );

  const lastDayOfSelectedMonth =
    selectedMonthDates[selectedMonthDates.length - 1];

  const numberOfExtraDayToAppend =
    firstDayOfSelectedMonthNum + totalDaysInSelectedMonth > 35
      ? 42 - (firstDayOfSelectedMonthNum + totalDaysInSelectedMonth)
      : 35 - (firstDayOfSelectedMonthNum + totalDaysInSelectedMonth);

  const appendDatesPadding = [...new Array(numberOfExtraDayToAppend)].map(
    (_, dateIndex) => {
      return dateAddDays(lastDayOfSelectedMonth, dateIndex + 1);
    }
  );

  const calendarDates: Date[] = [
    ...prependDatesPadding,
    ...selectedMonthDates,
    ...appendDatesPadding
  ];

  return (
    <div css={holderCss}>
      <span css={monthTitleCss}>
        {props.targetMonthStartDate.toLocaleString("default", {
          month: "long"
        })}{" "}
        {props.targetMonthStartDate.getFullYear()}
      </span>
      <div css={tableHolderCss}>
        {days.map(day => (
          <abbr title={day.day} css={thCss} key={day.day}>
            {day.abbr}
          </abbr>
        ))}
        {calendarDates.map(date => {
          const matchingDate = props.holidayDates.find(
            holidayDate => holidayDate.date.valueOf() === date.valueOf()
          );
          return (
            <div
              css={tdCss(
                (matchingDate?.isActive &&
                  date.getMonth() === props.targetMonthStartDate.getMonth()) ||
                  false,
                matchingDate?.isDeliveryDay || false,
                matchingDate?.isSelected || false,
                matchingDate?.isExisting || false
              )}
              key={date.getTime()}
              onMouseDown={((targetDate: Date) => () =>
                props.handleDayMouseDown(targetDate))(date)}
              onMouseUp={() => props.handleDayMouseUp()}
              onTouchStart={() => true}
              onMouseEnter={((targetDate: Date) => () =>
                props.handleDayMouseEnter(targetDate))(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { css } from '@emotion/react';
import {
	space,
	brand,
	brandAlt,
	labs,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import {
	dateAddDays,
	getWeekDay,
	numberOfDaysInMonth,
} from '../../../shared/dates';
import { minWidth } from '../../styles/breakpoints';
import { CalendarTableDate } from './holidayCalendarTables';

interface HolidayCalendarTableProps {
	holidayDates: CalendarTableDate[];
	targetMonthStartDate: Date;
	handleDayMouseDown: (day: Date) => void;
	handleDayMouseUp: (day: Date) => void;
	handleTouchStart: (day: Date) => void;
	handleDayMouseEnter: (day: Date) => void;
	hideAtDesktop: boolean;
	daysOfWeekToIconify?: number[];
}

const days: Array<{ day: string; abbr: string }> = [
	{ day: 'Monday', abbr: 'Mon' },
	{ day: 'Tuesday', abbr: 'Tue' },
	{ day: 'Wednesday', abbr: 'Wed' },
	{ day: 'Thursday', abbr: 'Thu' },
	{ day: 'Friday', abbr: 'Fri' },
	{ day: 'Saturday', abbr: 'Sat' },
	{ day: 'Sunday', abbr: 'Sun' },
];

export const HolidayCalendarTable = (props: HolidayCalendarTableProps) => {
	const holderCss = css`
		& + div {
			margin-top: ${space[3]}px;
		}
		${minWidth.tablet} {
			width: calc(50% - ${space[2]}px);
			display: ${props.hideAtDesktop ? 'none' : 'block'};
			& + div {
				margin-top: 0;
			}
		}
	`;

	const tableHolderCss = css`
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	`;

	const monthTitleCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
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
		${textSans.medium({ fontWeight: 'bold' })};
		text-decoration: none;
		&:first-of-type {
			border-left: 1px solid ${neutral[86]};
		}
		&:last-of-type {
			border-right: 1px solid ${neutral[86]};
		}
	`;

	const tdCss = (
		isActive: boolean,
		isDeliveryDay: boolean,
		isSelected: boolean,
		isExisting: boolean,
		dateIndex: number,
		finalDateIndex: number,
	) => {
		const cellRowNumber = dateIndex / 7;
		const isCellAtBeginningOfRow =
			cellRowNumber === Math.round(cellRowNumber);
		const isCellOnLastRow =
			Math.floor(finalDateIndex / 7) === Math.floor(cellRowNumber);
		const borderTopColor = isActive ? neutral[86] : neutral[93];
		const borderRightColor = isActive ? neutral[86] : neutral[93];
		const borderLeftColor = isActive ? neutral[86] : neutral[93];
		const borderBottomColor = isActive ? neutral[86] : neutral[93];
		return css`
			flex-grow: 1;
			width: 14.2%;
			text-align: center;
			position: relative;
			border-top: 1px solid ${borderTopColor};
			border-right: 1px solid ${borderRightColor};
			border-left: 1px solid
				${isCellAtBeginningOfRow ? borderLeftColor : 'none'};
			border-bottom: ${isCellOnLastRow
				? `1px solid ${borderBottomColor}`
				: 'none'};
			padding: ${space[3]}px 0;
			${textSans.medium()};
			color: ${neutral[7]};
			opacity: ${isActive ? '1' : '0.5'};
			cursor: ${isActive ? 'pointer' : 'default'};
			user-select: none;
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
          transform: rotate(-45deg);
          opacity: ${isActive ? '1' : '0.5'};
        }
      `
				: ''}
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
				: ''}
      & sup {
				vertical-align: top;
			}
			&:hover {
				outline: 2px solid ${brandAlt[400]};
				outline-offset: -8px;
			}
		`;
	};

	const firstDayOfSelectedMonth = getWeekDay(props.targetMonthStartDate);
	const firstDayOfSelectedMonthNum = days.findIndex(
		(day) => day.day === firstDayOfSelectedMonth,
	);
	const totalDaysInSelectedMonth = numberOfDaysInMonth(
		props.targetMonthStartDate,
	);

	const prependDatesPadding = [...new Array(firstDayOfSelectedMonthNum)]
		.map((_, dateIndex) => {
			return dateAddDays(props.targetMonthStartDate, -(dateIndex + 1));
		})
		.reverse();

	const selectedMonthDates = [...new Array(totalDaysInSelectedMonth)].map(
		(_, dateIndex) => {
			return dateAddDays(props.targetMonthStartDate, dateIndex);
		},
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
		},
	);

	const calendarDates: Date[] = [
		...prependDatesPadding,
		...selectedMonthDates,
		...appendDatesPadding,
	];

	return (
		<div css={holderCss}>
			<span css={monthTitleCss}>
				{props.targetMonthStartDate.toLocaleString('default', {
					month: 'long',
				})}{' '}
				{props.targetMonthStartDate.getFullYear()}
			</span>
			<div data-cy="date-picker" css={tableHolderCss}>
				{days.map((day) => (
					<abbr title={day.day} css={thCss} key={day.day}>
						{day.abbr}
					</abbr>
				))}
				{calendarDates.map((date, dateIndex) => {
					const matchingDate = props.holidayDates.find(
						(holidayDate) =>
							holidayDate.date.valueOf() === date.valueOf(),
					);
					return (
						<div
							css={tdCss(
								(matchingDate?.isActive &&
									date.getMonth() ===
										props.targetMonthStartDate.getMonth()) ||
									false,
								matchingDate?.isDeliveryDay || false,
								matchingDate?.isSelected || false,
								matchingDate?.isExisting || false,
								dateIndex,
								calendarDates.length - 1,
							)}
							key={date.getTime()}
							onMouseDown={(
								(targetDate: Date) => () =>
									props.handleDayMouseDown(targetDate)
							)(date)}
							onMouseUp={(
								(targetDate: Date) => () =>
									props.handleDayMouseUp(targetDate)
							)(date)}
							onTouchStart={(
								(targetDate: Date) => () =>
									props.handleTouchStart(targetDate)
							)(date)}
							onMouseEnter={(
								(targetDate: Date) => () =>
									props.handleDayMouseEnter(targetDate)
							)(date)}
						>
							{date.getDate()}
							{matchingDate?.showAsterisk ? <sup>*</sup> : ''}
						</div>
					);
				})}
			</div>
		</div>
	);
};

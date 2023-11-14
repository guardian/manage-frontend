import { css } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';
import {
	Button,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import { flushSync } from 'react-dom';
import type { DateStates } from '../../../../shared/dates';
import {
	dateAddDays,
	dateAddMonths,
	dateIsSameOrAfter,
	dateIsSameOrBefore,
} from '../../../../shared/dates';
import { HolidayCalendarTable } from './HolidayCalendarTable';
import type { SharedHolidayDateChooserState } from './HolidayDateChooser';
import { HolidayDateChooserStateContext } from './HolidayDateChooser';

interface HolidayCalendarTablesProps {
	minimumDate: Date;
	maximumDate: Date;
	maybeLockedStartDate: Date | null;
	dateStates: DateStates[];
	handleRangeChoosen: (range: { startDate: Date; endDate: Date }) => void;
	daysOfWeekToIconify?: number[];
	dateToAsterisk?: Date;
}

export interface CalendarTableDate {
	date: Date;
	isActive: boolean;
	isDeliveryDay: boolean;
	isSelected: boolean;
	isExisting: boolean;
	showAsterisk: boolean;
}

export const selectDatesFromRange = (
	allDates: CalendarTableDate[],
	selectionStartIndex: number,
	selectionEndIndex: number,
) => {
	if (selectionStartIndex === selectionEndIndex) {
		return [selectionStartIndex];
	}
	const lowestRangeNum = Math.min(selectionStartIndex, selectionEndIndex);
	const highestRangeNum = Math.max(selectionStartIndex, selectionEndIndex);
	let wholeRangeSlice = allDates
		.slice(lowestRangeNum, highestRangeNum + 1)
		.map(
			(_, calendarTableDateIndex) =>
				calendarTableDateIndex + lowestRangeNum,
		);
	if (selectionEndIndex < selectionStartIndex) {
		wholeRangeSlice = wholeRangeSlice.reverse();
	}
	const firstNonSelectableDate = wholeRangeSlice.findIndex(
		(calendarDateIndex) => allDates[calendarDateIndex].isExisting,
	);
	const onlySelectableDates =
		firstNonSelectableDate > -1
			? wholeRangeSlice.slice(0, firstNonSelectableDate)
			: [...wholeRangeSlice];
	return selectionEndIndex < selectionStartIndex
		? onlySelectableDates.reverse()
		: onlySelectableDates;
};

export const HolidayCalendarTables = (props: HolidayCalendarTablesProps) => {
	const calendarHoldersCss = css`
		${from.tablet} {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			position: relative;
		}
	`;

	const holidayDateChooserStateContext = useContext(
		HolidayDateChooserStateContext,
	) as SharedHolidayDateChooserState;

	const returnHolidayDateState = (date: Date): CalendarTableDate => ({
		date,
		isActive:
			dateIsSameOrAfter(
				date,
				props.maybeLockedStartDate || props.minimumDate,
			) && dateIsSameOrBefore(date, props.maximumDate),
		isDeliveryDay: !!props.daysOfWeekToIconify?.some(
			(iconDay) => iconDay === (date.getDay() || 7),
		),
		isSelected: holidayDateChooserStateContext.selectedRange
			? date >= holidayDateChooserStateContext.selectedRange.start &&
			  date <= holidayDateChooserStateContext.selectedRange.end
			: props.dateStates?.some(
					(dateState) =>
						date >= dateState.range.start &&
						date <= dateState.range.end &&
						dateState.state === 'amend',
			  ),
		isExisting: props.dateStates?.some(
			(dateState) =>
				date >= dateState.range.start &&
				date <= dateState.range.end &&
				dateState.state === 'existing',
		),
		showAsterisk: date.valueOf() === props.dateToAsterisk?.valueOf(),
	});

	const holidayDatesInitFill: CalendarTableDate[] = [];
	if (props.maximumDate.valueOf() > props.minimumDate.valueOf()) {
		let holidayDate: Date = new Date(props.minimumDate.valueOf());
		while (holidayDate <= props.maximumDate) {
			holidayDatesInitFill.push(returnHolidayDateState(holidayDate));
			holidayDate = dateAddDays(holidayDate, 1);
		}
	}

	const [holidayDates, setHolidayDates] =
		useState<CalendarTableDate[]>(holidayDatesInitFill);

	const [inSelectionMode, setSelectionModeTo] = useState<boolean>(false);

	const [startOfSelectionDateIndex, setStartOfSelectionDateIndex] =
		useState<number>(-1);

	const [mouseDownStartDate, setMouseDownStartDate] = useState<Date | null>(
		null,
	);

	const [visableMonths, setVisableMonths] = useState<number[]>([0, 1]);

	const startOfMonthOfMinDate = new Date(
		props.minimumDate.getFullYear(),
		props.minimumDate.getMonth(),
		1,
	);

	const monthsBetweenMinAndMax =
		(props.maximumDate.getFullYear() - props.minimumDate.getFullYear()) *
			12 -
		props.minimumDate.getMonth() +
		props.maximumDate.getMonth() +
		1;

	const calendarsMonthStartDate: Date[] = Array.from(
		{ length: monthsBetweenMinAndMax },
		(_, i) => {
			return dateAddMonths(startOfMonthOfMinDate, i);
		},
	);

	const dayMouseDown = (day: Date) => {
		flushSync(() => {
			const targetStateDayIndex = holidayDates.findIndex(
				(holidayDate) => holidayDate.date.valueOf() === day.valueOf(),
			);
			if (
				!inSelectionMode &&
				targetStateDayIndex > -1 &&
				holidayDates[targetStateDayIndex].isActive &&
				!holidayDates[targetStateDayIndex].isExisting
			) {
				setStartOfSelectionDateIndex(targetStateDayIndex);
				setHolidayDates(
					holidayDates.map((holidayDate, holidayDateIndex) => ({
						...holidayDate,
						isSelected:
							holidayDateIndex === targetStateDayIndex
								? true
								: false,
					})),
				);
				setSelectionModeTo(true);
			} else if (inSelectionMode) {
				setSelectionModeTo(false);
			}

			setMouseDownStartDate(day);
		});
	};

	const dayMouseEnter = (day: Date) => {
		flushSync(() => {
			if (
				inSelectionMode &&
				dateIsSameOrAfter(
					day,
					props.maybeLockedStartDate || props.minimumDate,
				) &&
				dateIsSameOrBefore(day, props.maximumDate)
			) {
				const targetStateDayIndex = holidayDates.findIndex(
					(holidayDate) =>
						holidayDate.date.valueOf() === day.valueOf(),
				);
				if (
					targetStateDayIndex > -1 &&
					startOfSelectionDateIndex > -1
				) {
					const dateIndexesThatShouldBeSelected =
						selectDatesFromRange(
							holidayDates,
							startOfSelectionDateIndex,
							targetStateDayIndex,
						);
					setHolidayDates(
						holidayDates.map((holidayDate, holidayDateIndex) => ({
							...holidayDate,
							isSelected: dateIndexesThatShouldBeSelected.some(
								(selectedIndex) =>
									selectedIndex === holidayDateIndex,
							),
						})),
					);
				}
			}
		});
	};

	const dayTouchStart = (day: Date) => {
		dayMouseEnter(day);
	};

	const dayMouseUp = (day: Date) => {
		flushSync(() => {
			const inDraggingMode =
				!!mouseDownStartDate &&
				mouseDownStartDate.valueOf() !== day.valueOf();
			if (!inSelectionMode || inDraggingMode) {
				const selectedDatesRange = holidayDates.filter(
					(holidayDate) => holidayDate.isSelected,
				);
				if (selectedDatesRange.length > 0) {
					const selecteRangeStartDate = selectedDatesRange[0].date;
					const selecteRangeEndDate =
						selectedDatesRange[selectedDatesRange.length - 1].date;

					props.handleRangeChoosen({
						startDate: selecteRangeStartDate,
						endDate: selecteRangeEndDate,
					});
				}
			}
			if (inDraggingMode) {
				setSelectionModeTo(false);
				setMouseDownStartDate(null);
			}
		});
	};

	return (
		<div css={calendarHoldersCss}>
			<Button
				icon={<SvgArrowLeftStraight />}
				hideLabel={true}
				size="small"
				cssOverrides={css`
					position: absolute;
					top: ${space[3]}px;
					left: ${space[3]}px;
					z-index: 2;
					overflow: hidden;
					${visableMonths[0] === 0
						? 'opacity: 0.4; pointer-events: none; cursor: not-allowed'
						: ''}
				`}
				onClick={() =>
					setVisableMonths(
						visableMonths.map(
							(visableMonthIndex) => visableMonthIndex - 1,
						),
					)
				}
			>
				Go back a month
			</Button>
			<Button
				icon={<SvgArrowRightStraight />}
				hideLabel={true}
				size="small"
				cssOverrides={css`
					position: absolute;
					top: ${space[3]}px;
					right: ${space[3]}px;
					z-index: 2;
					overflow: hidden;
					${visableMonths[1] === calendarsMonthStartDate.length - 1
						? 'opacity: 0.4; pointer-events: none; cursor: not-allowed'
						: ''}
				`}
				onClick={() =>
					setVisableMonths(
						visableMonths.map(
							(visableMonthIndex) => visableMonthIndex + 1,
						),
					)
				}
			>
				Go forward a month
			</Button>
			{calendarsMonthStartDate.map((monthStartDate, monthIndex) => (
				<HolidayCalendarTable
					key={monthStartDate.valueOf()}
					holidayDates={holidayDates}
					targetMonthStartDate={monthStartDate}
					handleDayMouseDown={dayMouseDown}
					handleDayMouseUp={dayMouseUp}
					handleTouchStart={dayTouchStart}
					handleDayMouseEnter={dayMouseEnter}
					hideAtDesktop={
						!visableMonths.some(
							(visibleDesktopMonthIndex) =>
								visibleDesktopMonthIndex === monthIndex,
						)
					}
				/>
			))}
		</div>
	);
};

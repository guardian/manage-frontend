import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans14,
	until,
} from '@guardian/source/foundations';
import type * as React from 'react';
import type { DateRange } from '../../../../shared/dates';
import {
	dateAddDays,
	dateClone,
	dateIsLeapYear,
	dateIsSame,
	dateRange,
} from '../../../../shared/dates';
import { HolidayCalendarTables } from '../holiday/HolidayCalendarTables';
import { DateInput } from './DateInput';

const stateDefinitions = {
	available: {
		selectable: true,
		color: palette.neutral[100],
		label: '',
	},
	existing: {
		selectable: false,
		color: palette.labs[400],
		label: 'Existing suspensions',
	},
	amend: {
		selectable: true,
		color: palette.brandAlt[400],
		label: "Suspension you're amending",
	},
};

interface LegendItemProps {
	color?: string;
	label: string;
	extraCss?: string;
}

const legendItems = (
	issueKeyword: string,
	includeExisting: boolean,
	includeAmend: boolean,
) => [
	{
		extraCss: `
  ::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 14px 14px 14px;
    border-color: transparent transparent ${palette.brand[400]} transparent;
    transform: rotate(-45deg);
  }
  `,
		label: `${issueKeyword} day`,
	},
	...(includeExisting ? [stateDefinitions.existing] : []),
	...(includeAmend ? [stateDefinitions.amend] : []),
];

const mergeAdjacentDateRanges = (
	accumulator: DateRange[],
	currentValue: DateRange,
) => {
	if (accumulator.length > 0) {
		const indexOfLast = accumulator.length - 1;
		const allButTheLast = accumulator.slice(0, indexOfLast);
		const last = accumulator[indexOfLast];
		const lastEndDatePlus1Day = dateClone(last.end);
		lastEndDatePlus1Day.setDate(lastEndDatePlus1Day.getDate() + 1);
		if (dateIsSame(lastEndDatePlus1Day, currentValue.start)) {
			return [...allButTheLast, dateRange(last.start, currentValue.end)];
		} else {
			return [...accumulator, currentValue];
		}
	} else {
		return [currentValue];
	}
};

const LegendItem = (props: LegendItemProps) => (
	<div
		css={css`
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		`}
	>
		<div
			css={[
				{
					width: '24px',
					height: '24px',
					backgroundColor: props.color,
					display: 'inline-block',
					marginRight: '10px',
					border: '0 !important',
				},
				css(props.extraCss),
			]}
			className="DateRangePicker__Date"
		/>
		<span
			css={css`
				margin-right: ${space[5]}px;
				${textSans14};
			`}
		>
			{props.label}
		</span>
	</div>
);

export interface DatePickerProps {
	firstAvailableDate: Date;
	issueDaysOfWeek: number[];
	issueKeyword: string;
	existingDates: DateRange[];
	amendableDateRange?: DateRange;
	selectedRange?: DateRange;
	maybeLockedStartDate: Date | null;
	selectionInfo?: React.ReactElement;
	onChange: (range: { startDate: Date; endDate: Date }) => void;
	dateToAsterisk?: Date;
}

export const DatePicker = (props: DatePickerProps) => (
	<>
		<div
			css={css`
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			`}
		>
			{legendItems(
				props.issueKeyword,
				props.existingDates.length > 0,
				!!props.amendableDateRange,
			).map((itemProps) => (
				<LegendItem key={itemProps.label} {...itemProps} />
			))}
		</div>
		<div
			css={css`
				display: flex;
				${until.desktop} {
					flex-direction: column-reverse;
				},
			`}
		>
			<div
				css={css`
					flex-grow: 1;
				`}
			>
				<HolidayCalendarTables
					minimumDate={props.firstAvailableDate}
					maximumDate={dateAddDays(
						props.firstAvailableDate,
						dateIsLeapYear(props.firstAvailableDate) ? 366 : 365,
					)}
					daysOfWeekToIconify={props.issueDaysOfWeek}
					dateToAsterisk={props.dateToAsterisk}
					maybeLockedStartDate={props.maybeLockedStartDate}
					dateStates={[
						...props.existingDates
							.reduce(mergeAdjacentDateRanges, []) // TODO check if they need to be merged across different types of 'date state'
							.map((range) => ({
								state: 'existing',
								range,
							})),
						...(props.amendableDateRange
							? [
									{
										state: 'amend',
										range: props.amendableDateRange,
									},
							  ]
							: []),
					].sort(
						(a, b) =>
							a.range.start.valueOf() - b.range.start.valueOf(),
					)}
					handleRangeChoosen={props.onChange}
				/>
			</div>

			<div
				css={css`
					margin-left: 18px;
					width: 136px;
					display: flex;
					flex-direction: column;
					${textSans14};
					${until.desktop} {
						position: sticky;
						zindex: 998;
						top: 0;
						left: 0;
						right: 0;
						width: 100vw;
						flex-direction: row;
						flex-wrap: wrap;
						align-items: center;
						background: ${palette.neutral[100]};
						padding: 10px;
						padding-top: 0;
						margin-bottom: 15px;
						margin-left: -20px;
						margin-right: -20px;
						box-shadow: 0 3px 5px -3px ${palette.neutral[60]};
					}
				`}
			>
				<div
					css={css`
						${until.desktop} {
							display: flex;
							align-items: center;
							margin-right: 10px;
							margin-top: 10px;
						}
					`}
				>
					<div>
						<DateInput
							date={
								props.selectedRange
									? props.selectedRange.start
									: props.firstAvailableDate
							}
							labelText="From"
							disabled={!!props.maybeLockedStartDate}
						/>
					</div>
					<span
						css={css`
							margin: 0 5px;
							${from.desktop} {
								display: none;
							}
						`}
					>
						to
					</span>
					<div
						css={css`
							${from.desktop} {
								margin-top: ${space[2]}px;
							}
						`}
					>
						<DateInput
							date={
								props.selectedRange
									? props.selectedRange.end
									: props.firstAvailableDate
							}
							labelText="To"
						/>
					</div>
				</div>
				{props.selectionInfo}
			</div>
		</div>
	</>
);

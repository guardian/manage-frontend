import { format, parse } from 'date-fns';
import { appendCorrectPluralisation } from './generalTypes';
import { number2words } from './numberUtils';

export type SingularTimePeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';
export type MonthsOrYears = `month${'s' | ''}` | `year${'s' | ''}`;
type TimePeriodsEquivalence = Partial<
	Record<SingularTimePeriod, Partial<Record<SingularTimePeriod, number>>>
>;

export const DATE_FNS_INPUT_FORMAT = 'yyyy-MM-dd'; // example: 1969-07-16

export const DATE_FNS_LONG_OUTPUT_FORMAT = 'd MMMM yyyy'; // example: 1 July 2021
export const DATE_FNS_SHORT_OUTPUT_FORMAT = 'd MMM yyyy'; // example: 5 Jan 2019

export const cancellationFormatDate = (
	cancellationEffectiveDate?: string,
	outputFormat: string = DATE_FNS_SHORT_OUTPUT_FORMAT,
) =>
	cancellationEffectiveDate === undefined
		? 'today'
		: parseDate(cancellationEffectiveDate).dateStr(outputFormat);

export interface ParsedDate {
	date: Date;
	dateStr: (outputFormat?: string) => string;
	isBefore: (comparisonDate: Date) => boolean;
	isSameOrAfter: (comparisonDate: Date) => boolean;
	isSame: (comparisonDate: Date) => boolean;
	isLeapYear: boolean;
}

export const parseDate = (
	inputDateStr?: string,
	dateInputFormat: string = DATE_FNS_INPUT_FORMAT,
): ParsedDate => {
	const dateObject = inputDateStr
		? parse(inputDateStr, dateInputFormat, new Date())
		: new Date();
	return {
		date: dateObject,
		dateStr: (outputFormat = DATE_FNS_SHORT_OUTPUT_FORMAT) =>
			dateString(dateObject, outputFormat),
		isBefore: (comparisonDate) => dateIsBefore(dateObject, comparisonDate),
		isSameOrAfter: (comparisonDate) =>
			dateIsSameOrAfter(dateObject, comparisonDate),
		isSame: (comparisonDate) => dateIsSame(dateObject, comparisonDate),
		isLeapYear: dateIsLeapYear(dateObject),
	};
};

export const dateString = (
	inputDate: Date,
	outputFormat: string = DATE_FNS_SHORT_OUTPUT_FORMAT,
) => format(inputDate, outputFormat);

export const dateIsBefore = (inputDate: Date, comparisonDate: Date) =>
	inputDate.valueOf() < comparisonDate.valueOf();

export const dateIsSameOrBefore = (inputDate: Date, comparisonDate: Date) =>
	inputDate.valueOf() <= comparisonDate.valueOf();

export const dateIsAfter = (inputDate: Date, comparisonDate: Date) =>
	inputDate.valueOf() > comparisonDate.valueOf();

export const dateIsSameOrAfter = (inputDate: Date, comparisonDate: Date) =>
	inputDate.valueOf() >= comparisonDate.valueOf();

export const dateIsSame = (inputDate: Date, comparisonDate: Date) =>
	inputDate.valueOf() === comparisonDate.valueOf();

export const dateClone = (inputDate: Date) => new Date(inputDate.valueOf());

export const dateIsLeapYear = (inputDate: Date) => {
	const year = inputDate.getFullYear();
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const dateAddDays = (inputDate: Date, daysModifier: number) => {
	const modifiedDate = new Date(inputDate.valueOf());
	modifiedDate.setDate(modifiedDate.getDate() + daysModifier);
	return modifiedDate;
};

export const dateAddMonths = (inputDate: Date, monthsModifier: number) => {
	const modifiedDate = new Date(inputDate.valueOf());
	modifiedDate.setMonth(modifiedDate.getMonth() + monthsModifier);
	return modifiedDate;
};

export const dateAddYears = (inputDate: Date, yearsModifier: number) => {
	const modifiedDate = new Date(inputDate.valueOf());
	modifiedDate.setFullYear(modifiedDate.getFullYear() + yearsModifier);
	return modifiedDate;
};

export const numberOfDaysInMonth = (inputDate: Date) =>
	new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0).getDate();

export const getWeekDay = (inputDate: Date) =>
	new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(inputDate);

export interface DateRange {
	start: Date;
	end: Date;
}
export const dateRange = (
	startDate: string | Date,
	endDate: string | Date,
	dateInputFormat: string = DATE_FNS_INPUT_FORMAT,
): DateRange => {
	const start =
		startDate instanceof Date
			? startDate
			: parse(startDate, dateInputFormat, new Date());
	const end =
		endDate instanceof Date
			? endDate
			: parse(endDate, dateInputFormat, new Date());
	return {
		start,
		end,
	};
};

export interface DateStates {
	state: string;
	range: DateRange;
}

export const isDateBetweenRange = (
	date: Date,
	rangeStart: Date,
	rangeEnd: Date,
) =>
	date.valueOf() >= rangeStart.valueOf() &&
	date.valueOf() <= rangeEnd.valueOf();

export const getOldestDate = (dates: Date[]) =>
	dates.reduce((dateA: Date, dateB: Date) =>
		dateA.valueOf() <= dateB.valueOf() ? dateA : dateB,
	);

export function convertTimestampToDate(timestamp: number): string {
	return dateString(new Date(timestamp), DATE_FNS_LONG_OUTPUT_FORMAT);
}

interface OrderdTimePeriod {
	periodName: SingularTimePeriod;
	higherPeriod?: string;
	unitsToSingularHigherPeriod?: number;
}

export const getAppropriateReadableTimePeriod = (
	unit: number,
	periodType: MonthsOrYears,
	additionalOptions?: {
		preferredPeriodType: MonthsOrYears;
		minPreferenceValue?: number;
		maxPreferenceValue?: number;
		preferNumberedOutput?: boolean;
	},
) => {
	const timePeriodsEquivalence: TimePeriodsEquivalence = {
		year: {
			quarter: 4,
			month: 12,
			week: 52,
			day: 365,
		},
		quarter: {
			year: 0.25,
			month: 3,
			//week isn't standard
			//day isn't standard
		},
		month: {
			year: 0.08333333333333333,
			quarter: 0.3333333333333333,
			//week isn't standard
			//day isn't standard
		},
	};
	const orderdTimePeriods: OrderdTimePeriod[] = [
		{ periodName: 'year' },
		{
			periodName: 'quarter',
			higherPeriod: 'year',
			unitsToSingularHigherPeriod: 4,
		},
		{
			periodName: 'month',
			higherPeriod: 'year',
			unitsToSingularHigherPeriod: 12,
		},
		{
			periodName: 'week',
			higherPeriod: 'month',
			unitsToSingularHigherPeriod: 4,
		},
		{
			periodName: 'day',
			higherPeriod: 'week',
			unitsToSingularHigherPeriod: 7,
		},
	];
	const periodTypeSingularLowerCase = periodTypeToSingular(
		periodType,
	).toLowerCase() as SingularTimePeriod;
	const periodTypeInComparisonTimePeriods = orderdTimePeriods.find(
		(element) => element.periodName === periodTypeSingularLowerCase,
	);
	if (!periodTypeInComparisonTimePeriods) {
		const numberOrWord = additionalOptions?.preferNumberedOutput
			? unit
			: number2words(unit);
		return `${numberOrWord} ${periodType}`;
	}
	// Do we have a perfered output period type? eg months
	// if so try and show the period in this time period
	// type so long as the value is within the provided
	// bounds and is a whole number/value
	if (additionalOptions?.preferredPeriodType) {
		const preferedPeriodTypeSingularLowerCase = periodTypeToSingular(
			additionalOptions.preferredPeriodType,
		).toLowerCase() as SingularTimePeriod;
		const preferedPeriodUnitsMultiplier =
			timePeriodsEquivalence?.[periodTypeSingularLowerCase]?.[
				preferedPeriodTypeSingularLowerCase
			];
		if (preferedPeriodUnitsMultiplier) {
			const preferedPeriodUnits = unit * preferedPeriodUnitsMultiplier;
			if (preferedPeriodUnits % 1 === 0) {
				const numberOrWord = additionalOptions?.preferNumberedOutput
					? preferedPeriodUnits
					: number2words(preferedPeriodUnits);
				return `${numberOrWord} ${appendCorrectPluralisation(
					additionalOptions.preferredPeriodType,
					preferedPeriodUnits,
				)}`;
			}
		}
	}

	// is there a higher applicable time period eg week instead of day
	// and is the unit a multiple of the number of units it takes to make
	// a singular unit of the higher time period
	if (
		periodTypeInComparisonTimePeriods.higherPeriod &&
		periodTypeInComparisonTimePeriods.unitsToSingularHigherPeriod &&
		unit % periodTypeInComparisonTimePeriods.unitsToSingularHigherPeriod ===
			0
	) {
		const numberOfHigherPeriods =
			unit /
			periodTypeInComparisonTimePeriods.unitsToSingularHigherPeriod;
		const numberOrWord = additionalOptions?.preferNumberedOutput
			? numberOfHigherPeriods
			: number2words(numberOfHigherPeriods);
		return `${numberOrWord} ${appendCorrectPluralisation(
			periodTypeInComparisonTimePeriods.higherPeriod,
			numberOfHigherPeriods,
		)}`;
	} else {
		const numberOrWord = additionalOptions?.preferNumberedOutput
			? unit
			: number2words(unit);
		return `${numberOrWord} ${periodType}`;
	}
};

export const periodTypeToSingular = (periodType: string) => {
	return periodType.endsWith('s')
		? periodType.substring(0, periodType.length - 1)
		: periodType;
};

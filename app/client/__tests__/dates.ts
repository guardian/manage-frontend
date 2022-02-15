import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateAddDays,
	dateAddMonths,
	dateAddYears,
	dateClone,
	dateIsAfter,
	dateIsBefore,
	dateIsLeapYear,
	dateIsSame,
	dateIsSameOrAfter,
	dateIsSameOrBefore,
	dateRange,
	dateString,
	getOldestDate,
	getWeekDay,
	isDateBetweenRange,
	numberOfDaysInMonth,
	parseDate,
} from '../../shared/dates';

// formatting date-fns strings documentation here:
// https://date-fns.org/v2.17.0/docs/format

const judgementDay = new Date('1997-08-29');
const backToTheFutureDay = new Date('1985-10-26');

const localiseDate = (date: Date) =>
	new Intl.DateTimeFormat('en-GB').format(date);

describe('parseDate', () => {
	it('parses date strings correctly', () => {
		const pd = parseDate('2020-11-30');
		expect(pd.date.getTime()).toBeGreaterThan(1);
	});
	it('formats date to long friendly string', () => {
		const pd = parseDate('2020-11-30');
		expect(pd.dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)).toEqual(
			'30 November 2020',
		);
	});
	it('formats date to short friendly string', () => {
		expect(parseDate('2020-11-30').dateStr()).toEqual('30 Nov 2020');
	});
	it('formats date to custom string', () => {
		expect(parseDate('2020-11-30').dateStr('qqqq yyyy GGGG')).toEqual(
			'4th quarter 2020 Anno Domini',
		);
	});
});

describe('dateString', () => {
	it('outputs a string from an input date (with default output format)', () => {
		const inputDate = parseDate('2020-11-30').date;
		expect(dateString(inputDate)).toEqual('30 Nov 2020');
	});
	it('outputs a string from an input date (with custom output format)', () => {
		const inputDate = parseDate('2020-11-30').date;
		expect(dateString(inputDate, 'd MMMM yyyy')).toEqual(
			'30 November 2020',
		);
	});
});

describe('dateIsBefore', () => {
	const inputDate = judgementDay;
	const comparisonDate = judgementDay;
	it('returns true if input date is before comparison date', () => {
		expect(dateIsBefore(inputDate, new Date())).toBeTruthy();
	});
	it('returns false if input date is after comparison date', () => {
		comparisonDate.setMinutes(comparisonDate.getMinutes() - 10);
		expect(dateIsBefore(inputDate, comparisonDate)).toBeFalsy();
	});
	it('returns false if input date is the same as comparison date', () => {
		comparisonDate.setMinutes(inputDate.getMinutes());
		expect(dateIsBefore(inputDate, comparisonDate)).toBeFalsy();
	});
});

describe('dateIsSameOrBefore', () => {
	it('returns true if date is the same as comparison date', () => {
		const inputDate = judgementDay;
		const comparisonDate = judgementDay;
		expect(dateIsSameOrBefore(inputDate, comparisonDate)).toBe(true);
	});
	it('returns true if date is the before comparison date', () => {
		const inputDate = backToTheFutureDay;
		const comparisonDate = new Date();
		expect(dateIsSameOrBefore(inputDate, comparisonDate)).toBe(true);
	});
	it('returns false if date is the after comparison date', () => {
		const inputDate = new Date();
		const comparisonDate = backToTheFutureDay;
		expect(dateIsSameOrBefore(inputDate, comparisonDate)).toBe(false);
	});
});

describe('dateIsAfter', () => {
	it('returns true if date is after comparison date', () => {
		const inputDate = new Date();
		const comparisonDate = backToTheFutureDay;
		expect(dateIsAfter(inputDate, comparisonDate)).toBe(true);
	});
	it('returns false if date is not after comparison date', () => {
		const inputDate = judgementDay;
		const comparisonDate = judgementDay;
		expect(dateIsAfter(inputDate, comparisonDate)).toBe(false);
	});
});

describe('dateIsSameOrAfter', () => {
	it('returns true if dates match', () => {
		expect(dateIsSameOrAfter(judgementDay, judgementDay)).toBeTruthy();
	});
	it('returns true if input date is after comparison date', () => {
		const futureInputDate = new Date();
		futureInputDate.setMinutes(futureInputDate.getMinutes() + 20);
		expect(dateIsSameOrAfter(futureInputDate, new Date())).toBeTruthy();
	});
	it('returns false if comparison date is after input date', () => {
		const futureComparisonDate = new Date();
		futureComparisonDate.setMinutes(futureComparisonDate.getMinutes() + 20);
		expect(dateIsSameOrAfter(new Date(), futureComparisonDate)).toBeFalsy();
	});
});

describe('dateIsSame', () => {
	it('returns true if 2 dates match', () => {
		expect(dateIsSame(judgementDay, judgementDay)).toBeTruthy();
	});
	it('returns false if the 2 dates do not match', () => {
		expect(dateIsSame(new Date(), new Date('1969-07-16'))).toBeFalsy();
	});
});

describe('dateClone', () => {
	it('returns a clone of the input date', () => {
		const inputDate = new Date();
		const clonedDate = dateClone(inputDate);
		expect(inputDate.valueOf()).toEqual(clonedDate.valueOf());
	});
});

describe('dateIsLeapYear', () => {
	it('returns true for leap years in the past and future', () => {
		const confirmedLeapYears = [
			new Date('1952-01-01'),
			new Date('1956-01-01'),
			new Date('1976-01-01'),
			new Date('1980-01-01'),
			new Date('1984-01-01'),
			new Date('2008-01-01'),
			new Date('2016-01-01'),
			new Date('2024-01-01'),
			new Date('2028-01-01'),
			new Date('2032-01-01'),
			new Date('2036-01-01'),
			new Date('2040-01-01'),
			new Date('2228-01-01'),
			new Date('2636-01-01'),
		];
		expect(
			confirmedLeapYears.every((date) => dateIsLeapYear(date)),
		).toBeTruthy();
	});
	it('returns false for non-leap years in the past and future', () => {
		const confirmedNONLeapYears = [
			new Date('1953-01-01'),
			new Date('1957-01-01'),
			new Date('1977-01-01'),
			new Date('1981-01-01'),
			new Date('1985-01-01'),
			new Date('2009-01-01'),
			new Date('2017-01-01'),
			new Date('2025-01-01'),
			new Date('2029-01-01'),
			new Date('2033-01-01'),
			new Date('2037-01-01'),
			new Date('2041-01-01'),
			new Date('2229-01-01'),
			new Date('2637-01-01'),
		];
		const result = confirmedNONLeapYears.every(
			(date) => !dateIsLeapYear(date),
		);
		expect(result).toBeTruthy();
	});
});

describe('dateAddDays', () => {
	it('returns modified date with the additional days subtracted from it', () => {
		const inputDate = backToTheFutureDay;
		const outputDate = dateAddDays(inputDate, -10941);
		expect(localiseDate(outputDate)).toEqual('12/11/1955');
	});
	it('returns modified date with the additional days added to it', () => {
		const inputDate = backToTheFutureDay;
		const outputDate = dateAddDays(inputDate, 10952);
		expect(localiseDate(outputDate)).toEqual('21/10/2015');
	});
});

describe('dateAddMonths', () => {
	it('returns modified date with months subtracted from it', () => {
		const inputDate = backToTheFutureDay;
		const outputDate = dateAddMonths(inputDate, -1);
		expect(localiseDate(outputDate)).toEqual('26/09/1985');
	});
	it('returns modified date with months added to it', () => {
		const inputDate = backToTheFutureDay;
		const outputDate = dateAddMonths(inputDate, 1);
		expect(localiseDate(outputDate)).toEqual('26/11/1985');
	});
});

describe('dateAddYears', () => {
	it('returns modified date with years subtracted from it', () => {
		const inputDate = backToTheFutureDay;
		const outputDate = dateAddYears(inputDate, -1);
		expect(localiseDate(outputDate)).toEqual('26/10/1984');
	});
	it('returns modified date with years added to it', () => {
		const inputDate = backToTheFutureDay;
		const outputDate = dateAddYears(inputDate, 1);
		expect(localiseDate(outputDate)).toEqual('26/10/1986');
	});
	it('returns modified date with years added to it (even in sneaky leap year)', () => {
		const inputDate = new Date('2020-02-29');
		const outputDate = dateAddYears(inputDate, 1);
		expect(localiseDate(outputDate)).toEqual('01/03/2021');
	});
});

describe('numberOfDaysInMonth', () => {
	it('returns the number of days in a month from an input date', () => {
		expect(numberOfDaysInMonth(new Date('2020-01-01'))).toEqual(31);
	});
	it('returns the number of days in a month in a Feburary leap year', () => {
		expect(numberOfDaysInMonth(new Date('2020-02-01'))).toEqual(29);
	});
});

describe('getWeekDay', () => {
	it('returns the weekday in long string form from an input date', () => {
		// Saturday 26th Oct 1985
		expect(getWeekDay(backToTheFutureDay)).toEqual('Saturday');
	});
});

describe('dateRange', () => {
	it('returns a date range object given date strings as input', () => {
		const inputStartDate = '1969-07-16';
		const inputEndDate = '1969-08-16';
		const dateRangeObj = dateRange(inputStartDate, inputEndDate);
		expect(
			dateRangeObj.start.toString() + dateRangeObj.end.toString(),
		).toEqual(
			'Wed Jul 16 1969 00:00:00 GMT+0100 (British Summer Time)Sat Aug 16 1969 00:00:00 GMT+0100 (British Summer Time)',
		);
	});
});

describe('isDateBetweenRange', () => {
	it('returns true if input date is between input date range', () => {
		expect(
			isDateBetweenRange(
				new Date('1985-10-26'),
				new Date('1985-10-25'),
				new Date('1985-10-27'),
			),
		).toEqual(true);
	});
	it('returns false if input date is between input date range', () => {
		expect(
			isDateBetweenRange(
				new Date('1985-10-20'),
				new Date('1985-10-25'),
				new Date('1985-10-27'),
			),
		).toEqual(false);
	});
});

describe('getOldestDate', () => {
	it('returns oldest date from array of dates', () => {
		const todaysDate = new Date();
		const date5DaysAgo = new Date();
		date5DaysAgo.setDate(todaysDate.getDate() - 5);
		const dates = [todaysDate, date5DaysAgo];
		expect(getOldestDate(dates)).toEqual(date5DaysAgo);
	});
});

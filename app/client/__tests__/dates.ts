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
  parseDate
} from "../../shared/dates";

// formatting date-fns strings documentation here:
// https://date-fns.org/v2.17.0/docs/format

describe("parseDate", () => {
  it("parses date strings correctly", () => {
    const pd = parseDate("2020-11-30");
    expect(pd.date.getTime()).toBeGreaterThan(1);
  });
  it("formats date to long friendly string", () => {
    const pd = parseDate("2020-11-30");
    expect(pd.dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)).toEqual("30 November 2020");
  });
  it("formats date to short friendly string", () => {
    expect(parseDate("2020-11-30").dateStr()).toEqual("30 Nov 2020");
  });
  it("formats date to custom string", () => {
    expect(parseDate("2020-11-30").dateStr("qqqq yyyy GGGG")).toEqual(
      "4th quarter 2020 Anno Domini"
    );
  });
});

describe("dateString", () => {
  it("outputs a string from an input date (with default output format)", () => {
    const inputDate = parseDate("2020-11-30").date;
    expect(dateString(inputDate)).toEqual("30 Nov 2020");
  });
  it("outputs a string from an input date (with custom output format)", () => {
    const inputDate = parseDate("2020-11-30").date;
    expect(dateString(inputDate, "d MMMM yyyy")).toEqual("30 November 2020");
  });
});

describe("dateIsBefore", () => {
  const inputDate = new Date(1997, 7, 29);
  const comparisonDate = new Date(1997, 7, 29);
  it("returns true if input date is before comparison date", () => {
    comparisonDate.setMinutes(comparisonDate.getMinutes() + 5);
    expect(dateIsBefore(inputDate, comparisonDate)).toBeTruthy();
  });
  it("returns false if input date is after comparison date", () => {
    comparisonDate.setMinutes(comparisonDate.getMinutes() - 10);
    expect(dateIsBefore(inputDate, comparisonDate)).toBeFalsy();
  });
  it("returns false if input date is the same as comparison date", () => {
    comparisonDate.setMinutes(inputDate.getMinutes());
    expect(dateIsBefore(inputDate, comparisonDate)).toBeFalsy();
  });
});

describe("dateIsSameOrBefore", () => {
  it("returns true if date is the same as comparison date", () => {
    const inputDate = new Date(1997, 7, 29);
    const comparisonDate = new Date(1997, 7, 29);
    expect(dateIsSameOrBefore(inputDate, comparisonDate)).toBe(true);
  });
  it("returns true if date is the before comparison date", () => {
    const inputDate = new Date(1985, 9, 26);
    const comparisonDate = new Date();
    expect(dateIsSameOrBefore(inputDate, comparisonDate)).toBe(true);
  });
  it("returns false if date is the after comparison date", () => {
    const inputDate = new Date();
    const comparisonDate = new Date(1985, 9, 26);
    expect(dateIsSameOrBefore(inputDate, comparisonDate)).toBe(false);
  });
});

describe("dateIsAfter", () => {
  it("returns true if date is after comparison date", () => {
    const inputDate = new Date();
    const comparisonDate = new Date(1985, 9, 26);
    expect(dateIsAfter(inputDate, comparisonDate)).toBe(true);
  });
  it("returns false if date is not after comparison date", () => {
    const inputDate = new Date(1997, 7, 29);
    const comparisonDate = new Date(1997, 7, 29);
    expect(dateIsAfter(inputDate, comparisonDate)).toBe(false);
  });
});

describe("dateIsSameOrAfter", () => {
  it("returns true if dates match", () => {
    expect(
      dateIsSameOrAfter(new Date(1997, 7, 29), new Date(1997, 7, 29))
    ).toBeTruthy();
  });
  it("returns true if input date is after comparison date", () => {
    const futureInputDate = new Date();
    futureInputDate.setMinutes(futureInputDate.getMinutes() + 20);
    expect(dateIsSameOrAfter(futureInputDate, new Date())).toBeTruthy();
  });
  it("returns false if comparison date is after input date", () => {
    const futureComparisonDate = new Date();
    futureComparisonDate.setMinutes(futureComparisonDate.getMinutes() + 20);
    expect(dateIsSameOrAfter(new Date(), futureComparisonDate)).toBeFalsy();
  });
});

describe("dateIsSame", () => {
  it("returns true if 2 dates match", () => {
    expect(
      dateIsSame(new Date(1997, 7, 29), new Date(1997, 7, 29))
    ).toBeTruthy();
  });
  it("returns false if the 2 dates do not match", () => {
    expect(dateIsSame(new Date(), new Date(1969, 6, 16))).toBeFalsy();
  });
});

describe("dateClone", () => {
  it("returns a clone of the input date", () => {
    const inputDate = new Date();
    const clonedDate = dateClone(inputDate);
    expect(inputDate.valueOf()).toEqual(clonedDate.valueOf());
  });
});

describe("dateIsLeapYear", () => {
  it("returns true for leap years in the past and future", () => {
    const confirmedLeapYears = [
      new Date(1952, 2),
      new Date(1956, 2),
      new Date(1976, 2),
      new Date(1980, 2),
      new Date(1984, 2),
      new Date(2008, 2),
      new Date(2016, 2),
      new Date(2024, 2),
      new Date(2028, 2),
      new Date(2032, 2),
      new Date(2036, 2),
      new Date(2040, 2),
      new Date(2228, 2),
      new Date(2636, 2)
    ];
    expect(confirmedLeapYears.every(date => dateIsLeapYear(date))).toBeTruthy();
  });
  it("returns false for non-leap years in the past and future", () => {
    const confirmedNONLeapYears = [
      new Date(1953, 2),
      new Date(1957, 2),
      new Date(1977, 2),
      new Date(1981, 2),
      new Date(1985, 2),
      new Date(2009, 2),
      new Date(2017, 2),
      new Date(2025, 2),
      new Date(2029, 2),
      new Date(2033, 2),
      new Date(2037, 2),
      new Date(2041, 2),
      new Date(2229, 2),
      new Date(2637, 2)
    ];
    const result = confirmedNONLeapYears.every(date => !dateIsLeapYear(date));
    expect(result).toBeTruthy();
  });
});

describe("dateAddDays", () => {
  it("returns modified date with the additional days subtracted from it", () => {
    const inputDate = new Date(1985, 9, 26);
    expect(dateAddDays(inputDate, -10941).toLocaleDateString()).toEqual(
      "11/12/1955"
    );
  });
  it("returns modified date with the additional days added to it", () => {
    const inputDate = new Date(1985, 9, 26);
    expect(dateAddDays(inputDate, 10952).toLocaleDateString()).toEqual(
      "10/21/2015"
    );
  });
});

describe("dateAddMonths", () => {
  it("returns modified date with months subtracted from it", () => {
    const inputDate = new Date(1985, 9, 26);
    expect(dateAddMonths(inputDate, -1).toLocaleDateString()).toEqual(
      "9/26/1985"
    );
  });
  it("returns modified date with months added to it", () => {
    const inputDate = new Date(1985, 9, 26);
    expect(dateAddMonths(inputDate, 1).toLocaleDateString()).toEqual(
      "11/26/1985"
    );
  });
});

describe("dateAddYears", () => {
  it("returns modified date with years subtracted from it", () => {
    const inputDate = new Date(1985, 9, 26);
    expect(dateAddYears(inputDate, -1).toLocaleDateString()).toEqual(
      "10/26/1984"
    );
  });
  it("returns modified date with years added to it", () => {
    const inputDate = new Date(1985, 9, 26);
    expect(dateAddYears(inputDate, 1).toLocaleDateString()).toEqual(
      "10/26/1986"
    );
  });
  it("returns modified date with years added to it (even in sneaky leap year)", () => {
    const inputDate = new Date(2020, 1, 29);
    expect(dateAddYears(inputDate, 1).toLocaleDateString()).toEqual("3/1/2021");
  });
});

describe("numberOfDaysInMonth", () => {
  it("returns the number of days in a month from an input date", () => {
    expect(numberOfDaysInMonth(new Date(2020, 0, 1))).toEqual(31);
  });
  it("returns the number of days in a month in a Feburary leap year", () => {
    expect(numberOfDaysInMonth(new Date(2020, 1, 1))).toEqual(29);
  });
});

describe("getWeekDay", () => {
  it("returns the weekday in long string form from an input date", () => {
    // Saturday 26th Oct 1985
    expect(getWeekDay(new Date(1985, 9, 26))).toEqual("Saturday");
  });
});

describe("dateRange", () => {
  it("returns a date range object given date strings as input", () => {
    const inputStartDate = "1969-07-16";
    const inputEndDate = "1969-08-16";
    const dateRangeObj = dateRange(inputStartDate, inputEndDate);
    expect(dateRangeObj.start.toString() + dateRangeObj.end.toString()).toEqual(
      "Wed Jul 16 1969 00:00:00 GMT+0100 (British Summer Time)Sat Aug 16 1969 00:00:00 GMT+0100 (British Summer Time)"
    );
  });
});

describe("isDateBetweenRange", () => {
  it("returns true if input date is between input date range", () => {
    expect(
      isDateBetweenRange(
        new Date(1985, 9, 26),
        new Date(1985, 9, 25),
        new Date(1985, 9, 27)
      )
    ).toEqual(true);
  });
  it("returns false if input date is between input date range", () => {
    expect(
      isDateBetweenRange(
        new Date(1985, 9, 20),
        new Date(1985, 9, 25),
        new Date(1985, 9, 27)
      )
    ).toEqual(false);
  });
});

describe("getOldestDate", () => {
  it("returns oldest date from array of dates", () => {
    const todaysDate = new Date();
    const date5DaysAgo = new Date();
    date5DaysAgo.setDate(todaysDate.getDate() - 5);
    const dates = [todaysDate, date5DaysAgo];
    expect(getOldestDate(dates)).toEqual(date5DaysAgo);
  });
});

import {
  DATE_FNS_LONG_OUTPUT_FORMAT,
  dateAddDays,
  dateIsBefore,
  dateIsLeapYear,
  dateIsSame,
  dateIsSameOrAfter,
  getOldestDate,
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
    // this should replace:
    // momentiseDateStr("2020-11-30").format(friendlyLongDateFormat);
  });
  it("formats date to short friendly string", () => {
    expect(parseDate("2020-11-30").dateStr()).toEqual("30 Nov 2020");
    // this should replace:
    // formatDateStr("2020-11-30")
  });
  it("formats date to custom string", () => {
    expect(parseDate("2020-11-30").dateStr("qqqq yyyy GGGG")).toEqual(
      "4th quarter 2020 Anno Domini"
    );
    // this should replace:
    // formatDateStr("2020-11-30", "CUSTOM DATE OUTPUT FORMAT")
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

describe("dateIsBefore", () => {
  const inputDate = new Date();
  const comparisonDate = new Date();
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

describe("dateIsSame", () => {
  it("returns true if 2 dates match", () => {
    expect(dateIsSame(new Date(), new Date())).toBeTruthy();
  });
  it("returns false if the 2 dates do not match", () => {
    expect(dateIsSame(new Date(), new Date(1969, 6, 16))).toBeFalsy();
  });
});

describe("dateIsSameOrAfter", () => {
  it("returns true if dates match", () => {
    expect(dateIsSameOrAfter(new Date(), new Date())).toBeTruthy();
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

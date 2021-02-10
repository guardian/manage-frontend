import { DATE_FNS_LONG_OUTPUT_FORMAT, DateHelper } from "../../shared/dates";

// formatting date-fns strings documentation here:
// https://date-fns.org/v2.17.0/docs/format

describe("dateHelper", () => {
  it("parses date strings correctly", () => {
    const dateHelper = DateHelper("2020-11-30");
    expect(dateHelper.date.getTime()).toBeGreaterThan(1);
  });
  it("formats date to long friendly string", () => {
    const dateHelper = DateHelper("2020-11-30");
    expect(dateHelper.dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)).toEqual(
      "30 November 2020"
    );
    // this should replace:
    // momentiseDateStr("2020-11-30").format(friendlyLongDateFormat);
  });
  it("formats date to short friendly string", () => {
    expect(DateHelper("2020-11-30").dateStr()).toEqual("30 Nov 2020");
    // this should replace:
    // formatDateStr("2020-11-30")
  });
  it("formats date to custom string", () => {
    expect(DateHelper("2020-11-30").dateStr("qqqq yyyy GGGG")).toEqual(
      "4th quarter 2020 Anno Domini"
    );
    // this should replace:
    // formatDateStr("2020-11-30", "CUSTOM DATE OUTPUT FORMAT")
  });
});

import format from "date-fns/format";
import parse from "date-fns/parse";
import moment from "moment";

export const DATE_INPUT_FORMAT = "YYYY-MM-DD";
export const DATE_FNS_INPUT_FORMAT = "yyyy-MM-dd";

export const DATE_FNS_LONG_OUTPUT_FORMAT = "d LLLL yyyy";
export const DATE_FNS_SHORT_OUTPUT_FORMAT = "d LLL yyyy";
export const friendlyLongDateFormat = "D\xa0MMMM\xa0YYYY"; // non-breaking space

export const momentiseDateStr = (dateStr: string) =>
  moment(dateStr, DATE_INPUT_FORMAT);

export const cancellationFormatDate = (cancellationEffectiveDate?: string) => {
  return cancellationEffectiveDate === undefined
    ? "today"
    : DateHelper(cancellationEffectiveDate).dateStr();
};

export const DateHelper = (
  inputDateStr?: string,
  dateInputFormat: string = DATE_FNS_INPUT_FORMAT
) => {
  const dateObject = inputDateStr
    ? parse(inputDateStr, dateInputFormat, new Date())
    : new Date();
  return {
    date: dateObject,
    dateStr: (outputFormat: string = DATE_FNS_SHORT_OUTPUT_FORMAT) =>
      format(dateObject, outputFormat)
  };
};

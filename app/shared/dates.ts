import moment from "moment";

export const DATE_INPUT_FORMAT = "YYYY-MM-DD";

export const friendlyLongDateFormat = "D\xa0MMMM\xa0YYYY"; // non-breaking space

export const momentiseDateStr = (dateStr: string) =>
  moment(dateStr, DATE_INPUT_FORMAT);

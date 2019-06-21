import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { ProductUrlPart } from "../../../shared/productTypes";
import AsyncLoader from "../asyncLoader";

export const DATE_INPUT_FORMAT = "YYYY-MM-DD";

export interface RawHolidayStopRequest {
  start: string;
  end: string;
  id: string;
  subscriptionName: string;
}

export interface HolidayStopRequest {
  dateRange: DateRange;
  id: string;
  subscriptionName: string;
  issuesImpactedPerYear: IssuesImpactedPerYear;
}

export interface CommonProductSpecifics {
  issueDayOfWeek: number;
  annualIssueLimit: number;
}

export interface GetHolidayStopsResponse {
  productSpecifics: CommonProductSpecifics & {
    firstAvailableDate: Moment;
  };
  existing: HolidayStopRequest[];
}

interface RawGetHolidayStopsResponse {
  productSpecifics: CommonProductSpecifics & {
    firstAvailableDate: string;
  };
  existing: RawHolidayStopRequest[];
}

export const createGetHolidayStopsFetcher = (
  productUrlPart: ProductUrlPart,
  subscriptionName: string
) => () => fetch(`/api/holidays/${productUrlPart}/${subscriptionName}`);

export class GetHolidayStopsAsyncLoader extends AsyncLoader<
  GetHolidayStopsResponse
> {}

export interface CreateHolidayStopsResponse {}
export class CreateHolidayStopsAsyncLoader extends AsyncLoader<
  CreateHolidayStopsResponse
> {}

export const HolidayStopsResponseContext: React.Context<
  GetHolidayStopsResponse | {}
> = React.createContext({});

export function isHolidayStopsResponse(
  data: GetHolidayStopsResponse | {} | undefined
): data is GetHolidayStopsResponse {
  return !!data && data.hasOwnProperty("existing");
}

const embellishRawHolidayStop = (
  nextYearStartDateStr: string,
  issueDayOfWeek: number
) => (rawHolidayStopRequest: RawHolidayStopRequest) => {
  const dateRange = new DateRange(
    moment(rawHolidayStopRequest.start, DATE_INPUT_FORMAT),
    moment(rawHolidayStopRequest.end, DATE_INPUT_FORMAT)
  );
  return {
    ...rawHolidayStopRequest,
    dateRange,
    issuesImpactedPerYear: issuesInRange(
      dateRange,
      nextYearStartDateStr,
      issueDayOfWeek
    )
  } as HolidayStopRequest;
};

export const embellishExistingHolidayStops = (
  nextYearStartDateStr: string
) => async (response: Response) => {
  const raw = (await response.json()) as RawGetHolidayStopsResponse;
  return {
    ...raw,
    productSpecifics: raw.productSpecifics
      ? {
          ...raw.productSpecifics,
          firstAvailableDate: moment(
            raw.productSpecifics.firstAvailableDate,
            DATE_INPUT_FORMAT
          )
        }
      : undefined,
    existing: raw.existing.map(
      embellishRawHolidayStop(
        nextYearStartDateStr,
        raw.productSpecifics.issueDayOfWeek
      )
    )
  } as GetHolidayStopsResponse;
};

export interface IssuesImpactedPerYear {
  issuesThisYear: number;
  issuesNextYear: number;
}

export const issuesInRange = (
  range: DateRange,
  nextYearStartDateStr: string,
  issueDayOfWeek: number
) => {
  // const nextYearStartDate = moment(nextYearStartDateStr, DATE_INPUT_FORMAT);
  return {
    issuesThisYear: 4,
    issuesNextYear: 1
  } as IssuesImpactedPerYear;
};

// const calculateNumberOfIssuesAffected = (range: DateRange) => {
//   let count = 0;

//   for (let i = range.start; i <= range.end; i = i.add(1, "day")) {
//     if (i.day() === ISSUE_DAY_OF_WEEK) {
//       count++;
//     }
//   }
//   console.log("count", count);
//   return count;
// };

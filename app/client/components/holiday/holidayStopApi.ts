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
  publicationDatesToBeStopped: string[];
}

export interface HolidayStopRequest {
  publicationDatesToBeStopped: Moment[];
  dateRange: DateRange;
  id: string;
  subscriptionName: string;
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
) => (rawHolidayStopRequest: RawHolidayStopRequest) =>
  ({
    ...rawHolidayStopRequest,
    dateRange: new DateRange(
      moment(rawHolidayStopRequest.start, DATE_INPUT_FORMAT),
      moment(rawHolidayStopRequest.end, DATE_INPUT_FORMAT)
    ),
    publicationDatesToBeStopped: rawHolidayStopRequest.publicationDatesToBeStopped.map(
      dateStr => moment(dateStr, DATE_INPUT_FORMAT)
    )
  } as HolidayStopRequest);

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
    existing: raw.existing
      .map(
        embellishRawHolidayStop(
          nextYearStartDateStr,
          raw.productSpecifics.issueDayOfWeek
        )
      )
      .sort((a, b) => a.dateRange.start.unix() - b.dateRange.start.unix())
  } as GetHolidayStopsResponse;
};

export interface IssuesImpactedPerYear {
  issueDatesThisYear: Moment[];
  issueDatesNextYear: Moment[];
}

export const calculateIssuesImpactedPerYear = (
  publicationDatesToBeStopped: Moment[],
  nextYearStartDate: Moment
) => {
  return {
    issueDatesThisYear: publicationDatesToBeStopped.filter(date =>
      date.isBefore(nextYearStartDate)
    ),
    issueDatesNextYear: publicationDatesToBeStopped.filter(date =>
      date.isSameOrAfter(nextYearStartDate)
    )
  } as IssuesImpactedPerYear;
};

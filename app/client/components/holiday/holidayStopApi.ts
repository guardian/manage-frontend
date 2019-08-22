import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { MDA_TEST_USER_HEADER } from "../../../shared/productResponse";
import { ProductUrlPart } from "../../../shared/productTypes";
import AsyncLoader from "../asyncLoader";

export const DATE_INPUT_FORMAT = "YYYY-MM-DD";

export const momentiseDateStr = (dateStr: string) =>
  moment(dateStr, DATE_INPUT_FORMAT);

export interface RawHolidayStopRequest {
  start: string;
  end: string;
  id: string;
  subscriptionName: string;
  publicationsImpacted: Array<{
    publicationDate: string;
  }>;
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
  subscriptionName: string,
  isTestUser: boolean
) => () =>
  fetch(`/api/holidays/${productUrlPart}/${subscriptionName}`, {
    headers: {
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  });

export class GetHolidayStopsAsyncLoader extends AsyncLoader<
  GetHolidayStopsResponse
> {}

export interface CreateHolidayStopsResponse {
  success: string;
}

// tslint:disable-next-line:max-classes-per-file
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
  rawHolidayStopRequest: RawHolidayStopRequest
) =>
  ({
    ...rawHolidayStopRequest,
    dateRange: new DateRange(
      momentiseDateStr(rawHolidayStopRequest.start),
      momentiseDateStr(rawHolidayStopRequest.end)
    ),
    publicationDatesToBeStopped: rawHolidayStopRequest.publicationsImpacted.map(
      publicationImpacted =>
        momentiseDateStr(publicationImpacted.publicationDate)
    )
  } as HolidayStopRequest);

export const embellishExistingHolidayStops = async (response: Response) => {
  const raw = (await response.json()) as RawGetHolidayStopsResponse;
  return {
    ...raw,
    productSpecifics: raw.productSpecifics
      ? {
          ...raw.productSpecifics,
          firstAvailableDate: momentiseDateStr(
            raw.productSpecifics.firstAvailableDate
          )
        }
      : undefined,
    existing: raw.existing
      .map(embellishRawHolidayStop)
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
    issueDatesThisYear: publicationDatesToBeStopped.filter(
      date =>
        date.isBefore(nextYearStartDate) &&
        date.isSameOrAfter(nextYearStartDate.clone().subtract(1, "year"))
    ),
    issueDatesNextYear: publicationDatesToBeStopped.filter(
      date =>
        date.isSameOrAfter(nextYearStartDate) &&
        date.isBefore(nextYearStartDate.clone().add(1, "year"))
    )
  } as IssuesImpactedPerYear;
};

import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { MDA_TEST_USER_HEADER } from "../../../shared/productResponse";
import { ProductUrlPart } from "../../../shared/productTypes";
import AsyncLoader, { ReFetch } from "../asyncLoader";

export const DATE_INPUT_FORMAT = "YYYY-MM-DD";

export const momentiseDateStr = (dateStr: string) =>
  moment(dateStr, DATE_INPUT_FORMAT);

export interface CommonCreditProperties {
  estimatedPrice?: number;
  actualPrice?: number;
}

export interface RawHolidayStopDetail extends CommonCreditProperties {
  publicationDate: string;
}

export interface HolidayStopDetail extends CommonCreditProperties {
  publicationDate: Moment;
}

export interface RawHolidayStopRequest {
  start: string;
  end: string;
  id: string;
  subscriptionName: string;
  publicationsImpacted: RawHolidayStopDetail[];
}

export interface PotentialHolidayStopsResponse<T extends RawHolidayStopDetail> {
  potentials: T[];
}

export interface HolidayStopRequest {
  publicationsImpacted: HolidayStopDetail[];
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

export interface ReloadableGetHolidayStopsResponse
  extends GetHolidayStopsResponse {
  reload: ReFetch;
}

interface RawGetHolidayStopsResponse {
  productSpecifics: CommonProductSpecifics & {
    firstAvailableDate: string;
  };
  existing: RawHolidayStopRequest[];
}

export const momentiseRawHolidayStopDetail = (raw: RawHolidayStopDetail) => ({
  ...raw,
  publicationDate: momentiseDateStr(raw.publicationDate)
});

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
  ReloadableGetHolidayStopsResponse | {}
> = React.createContext({});

export function isHolidayStopsResponse(
  data: ReloadableGetHolidayStopsResponse | {} | undefined
): data is ReloadableGetHolidayStopsResponse {
  return (
    !!data && data.hasOwnProperty("existing") && data.hasOwnProperty("reload")
  );
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
    publicationsImpacted: rawHolidayStopRequest.publicationsImpacted.map(
      momentiseRawHolidayStopDetail
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
  issueThisYear: HolidayStopDetail[];
  issueNextYear: HolidayStopDetail[];
}

export const calculateIssuesImpactedPerYear = (
  publicationsImpacted: HolidayStopDetail[],
  nextYearStartDate: Moment
) => {
  return {
    issueThisYear: publicationsImpacted.filter(
      issue =>
        issue.publicationDate.isBefore(nextYearStartDate) &&
        issue.publicationDate.isSameOrAfter(
          nextYearStartDate.clone().subtract(1, "year")
        )
    ),
    issueNextYear: publicationsImpacted.filter(
      issue =>
        issue.publicationDate.isSameOrAfter(nextYearStartDate) &&
        issue.publicationDate.isBefore(nextYearStartDate.clone().add(1, "year"))
    )
  } as IssuesImpactedPerYear;
};

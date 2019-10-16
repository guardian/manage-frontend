import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { MDA_TEST_USER_HEADER } from "../../../shared/productResponse";
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

export interface RawPotentialHolidayStopDetail {
  publicationDate: string;
  credit?: number;
}

export interface PotentialHolidayStopsResponse {
  potentials: RawPotentialHolidayStopDetail[];
}

export interface HolidayStopRequest {
  publicationsImpacted: HolidayStopDetail[];
  dateRange: DateRange;
  id: string;
  subscriptionName: string;
}

export interface GetHolidayStopsResponse {
  productSpecifics: {
    firstAvailableDate: Moment;
    issueDaysOfWeek: number[];
  };
  annualIssueLimit: number;
  existing: HolidayStopRequest[];
}

export interface ReloadableGetHolidayStopsResponse
  extends GetHolidayStopsResponse {
  reload: ReFetch;
}

interface RawGetHolidayStopsResponse {
  issueSpecifics: Array<{
    issueDayOfWeek: number;
    firstAvailableDate: string;
  }>;
  annualIssueLimit: number;
  existing: RawHolidayStopRequest[];
}

export const convertRawPotentialHolidayStopDetail = (
  raw: RawPotentialHolidayStopDetail
) => ({
  estimatedPrice: raw.credit,
  publicationDate: momentiseDateStr(raw.publicationDate)
});

export class GetHolidayStopsAsyncLoader extends AsyncLoader<
  GetHolidayStopsResponse
> {}

// tslint:disable-next-line:max-classes-per-file
export class PotentialHolidayStopsAsyncLoader extends AsyncLoader<
  PotentialHolidayStopsResponse
> {}

export const createPotentialHolidayStopsFetcher = (
  shouldEstimateCredit: boolean,
  subscriptionName: string,
  start: Moment,
  end: Moment,
  isTestUser: boolean
) => () =>
  fetch(
    `/api/holidays/${subscriptionName}/potential?startDate=${start.format(
      DATE_INPUT_FORMAT
    )}&endDate=${end.format(DATE_INPUT_FORMAT)}${
      shouldEstimateCredit ? "&estimateCredit=true" : ""
    }`,
    {
      headers: {
        [MDA_TEST_USER_HEADER]: `${isTestUser}`
      }
    }
  );

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
      raw => ({
        ...raw,
        publicationDate: momentiseDateStr(raw.publicationDate)
      })
    )
  } as HolidayStopRequest);

export const embellishExistingHolidayStops = async (response: Response) => {
  const raw = (await response.json()) as RawGetHolidayStopsResponse;
  return {
    ...raw,
    productSpecifics: {
      // taking the min here is only knowingly safe for GW (once per week) and Voucher (no fulfilment)
      // it will need to re-visited for Home Delivery
      firstAvailableDate: moment.min(
        raw.issueSpecifics.map(_ => momentiseDateStr(_.firstAvailableDate))
      ),
      issueDaysOfWeek: raw.issueSpecifics.map(_ => _.issueDayOfWeek)
    },
    existing: raw.existing
      .map(embellishRawHolidayStop)
      .sort((a, b) => a.dateRange.start.unix() - b.dateRange.start.unix())
  } as GetHolidayStopsResponse;
};

export interface IssuesImpactedPerYear {
  issuesThisYear: HolidayStopDetail[];
  issuesNextYear: HolidayStopDetail[];
}

export const calculateIssuesImpactedPerYear = (
  publicationsImpacted: HolidayStopDetail[],
  nextYearStartDate: Moment
) => {
  return {
    issuesThisYear: publicationsImpacted.filter(
      issue =>
        issue.publicationDate.isBefore(nextYearStartDate) &&
        issue.publicationDate.isSameOrAfter(
          nextYearStartDate.clone().subtract(1, "year")
        )
    ),
    issuesNextYear: publicationsImpacted.filter(
      issue =>
        issue.publicationDate.isSameOrAfter(nextYearStartDate) &&
        issue.publicationDate.isBefore(nextYearStartDate.clone().add(1, "year"))
    )
  } as IssuesImpactedPerYear;
};

import moment, { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { DATE_INPUT_FORMAT, momentiseDateStr } from "../../../shared/dates";
import { MDA_TEST_USER_HEADER } from "../../../shared/productResponse";
import AsyncLoader, { ReFetch } from "../asyncLoader";

export interface CommonCreditProperties {
  estimatedPrice?: number;
  actualPrice?: number;
}

export interface RawHolidayStopDetail extends CommonCreditProperties {
  publicationDate: string;
  invoiceDate?: string;
}

export interface HolidayStopDetail extends CommonCreditProperties {
  publicationDate: Moment;
  invoiceDate?: Moment;
}

export interface MutabilityFlags {
  isFullyMutable: boolean;
  isEndDateEditable: boolean;
}

export interface RawHolidayStopRequest {
  startDate: string;
  endDate: string;
  id: string;
  subscriptionName: string;
  publicationsImpacted: RawHolidayStopDetail[];
  mutabilityFlags: MutabilityFlags;
  withdrawnTime?: string;
}

export interface RawPotentialHolidayStopDetail {
  publicationDate: string;
  credit?: number;
  invoiceDate?: string;
}

export interface PotentialHolidayStopsResponse {
  potentials: RawPotentialHolidayStopDetail[];
  nextInvoiceDateAfterToday: string;
}

export interface MinimalHolidayStopRequest {
  id?: string;
  subscriptionName?: string;
  publicationsImpacted: HolidayStopDetail[];
  dateRange: DateRange;
  mutabilityFlags?: MutabilityFlags;
  withdrawnDate?: Moment;
}

export interface HolidayStopRequest extends MinimalHolidayStopRequest {
  id: string;
  subscriptionName: string;
  mutabilityFlags: MutabilityFlags;
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
  existingHolidayStopToAmend?: HolidayStopRequest;
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
  invoiceDate: raw.invoiceDate ? momentiseDateStr(raw.invoiceDate) : undefined,
  publicationDate: momentiseDateStr(raw.publicationDate)
});

export class GetHolidayStopsAsyncLoader extends AsyncLoader<
  GetHolidayStopsResponse
> {}

// tslint:disable-next-line:max-classes-per-file
export class PotentialHolidayStopsAsyncLoader extends AsyncLoader<
  PotentialHolidayStopsResponse
> {}

export const getPotentialHolidayStopsFetcher = (
  subscriptionName: string,
  startDate: Moment,
  endDate: Moment,
  isTestUser: boolean
) => () =>
  fetch(
    `/api/holidays/${subscriptionName}/potential?startDate=${startDate.format(
      DATE_INPUT_FORMAT
    )}&endDate=${endDate.format(DATE_INPUT_FORMAT)}`,
    {
      headers: {
        [MDA_TEST_USER_HEADER]: `${isTestUser}`
      }
    }
  );

export interface CreateOrAmendHolidayStopsResponse {
  success: string;
}

// tslint:disable-next-line:max-classes-per-file
export class CreateOrAmendHolidayStopsAsyncLoader extends AsyncLoader<
  CreateOrAmendHolidayStopsResponse
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

export const isNotWithdrawn = (holidayStopRequest: HolidayStopRequest) =>
  !holidayStopRequest.withdrawnDate;

const embellishRawHolidayStop = (
  rawHolidayStopRequest: RawHolidayStopRequest
) =>
  ({
    ...rawHolidayStopRequest,
    withdrawnDate: rawHolidayStopRequest.withdrawnTime
      ? momentiseDateStr(rawHolidayStopRequest.withdrawnTime)
      : undefined,
    dateRange: new DateRange(
      momentiseDateStr(rawHolidayStopRequest.startDate),
      momentiseDateStr(rawHolidayStopRequest.endDate)
    ),
    publicationsImpacted: rawHolidayStopRequest.publicationsImpacted.map(
      raw => ({
        ...raw,
        publicationDate: momentiseDateStr(raw.publicationDate),
        invoiceDate: raw.invoiceDate
          ? momentiseDateStr(raw.invoiceDate)
          : undefined
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

import { ProductUrlPart } from "../../../shared/productTypes";
import AsyncLoader from "../asyncLoader";
import React from "react";
import { DateRange } from "moment-range";
import moment from "moment";

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
}

export interface CommonHolidayStopsResponse {
  firstAvailableDate?: string;
}

export interface GetHolidayStopsResponse extends CommonHolidayStopsResponse {
  existing: HolidayStopRequest[];
}

interface RawGetHolidayStopsResponse extends CommonHolidayStopsResponse {
  existing: RawHolidayStopRequest[];
}

export const createGetHolidayStopsFetcher = (
  productUrlPart: ProductUrlPart,
  subscriptionName: string
) => () => fetch(`/api/holidays/${productUrlPart}/${subscriptionName}`);

export class HolidayStopsAsyncLoader extends AsyncLoader<
  GetHolidayStopsResponse
> {}

export const HolidayStopsResponseContext: React.Context<
  GetHolidayStopsResponse | {}
> = React.createContext({});

export function isHolidayStopsResponse(
  data: GetHolidayStopsResponse | {} | undefined
): data is GetHolidayStopsResponse {
  return !!data && data.hasOwnProperty("existing");
}

const augmentWithDateRange = (rawHolidayStopRequest: RawHolidayStopRequest) =>
  Object.assign({}, rawHolidayStopRequest, {
    dateRange: new DateRange(
      moment(rawHolidayStopRequest.start),
      moment(rawHolidayStopRequest.end)
    )
  });

export const augmentExistingHolidayStopsWithDateRange = async (
  response: Response
) => {
  const raw = (await response.json()) as RawGetHolidayStopsResponse;
  return Object.assign({}, raw, {
    existing: raw.existing.map(augmentWithDateRange)
  });
};

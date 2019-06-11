import { ProductUrlPart } from "../../../shared/productTypes";
import AsyncLoader from "../asyncLoader";
import React from "react";

export interface HolidayStopRequest {
  start: string;
  end: string;
  id: string;
  subscriptionName: string;
}

export interface GetHolidayStopsResponse {
  existing: HolidayStopRequest[];
  firstAvailableDate?: string;
}

export const createGetHolidayStopsFetch = (
  productUrlPart: ProductUrlPart,
  subscriptionName: string
) => () => fetch(`/api/holidays/${productUrlPart}/${subscriptionName}`);

export class HolidayStopsLoader extends AsyncLoader<GetHolidayStopsResponse> {}

export const HolidayStopsResponseContext: React.Context<
  GetHolidayStopsResponse | {}
> = React.createContext({});

export function isHolidayStopsResponse(
  data: GetHolidayStopsResponse | {} | undefined
): data is GetHolidayStopsResponse {
  return !!data && data.hasOwnProperty("existing");
}

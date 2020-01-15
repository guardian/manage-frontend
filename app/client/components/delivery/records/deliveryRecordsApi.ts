import moment, { Moment } from "moment";
import {
  DeliveryRecordsApiItem,
  Subscription
} from "../../../../shared/productResponse";
import AsyncLoader from "../../asyncLoader";

export const DATE_INPUT_FORMAT = "YYYY-MM-DD";

export const friendlyLongDateFormat = "D\xa0MMMM\xa0YYYY"; // non-breaking space

export const momentiseDateStr = (dateStr: string) =>
  moment(dateStr, DATE_INPUT_FORMAT);

export interface DeliveryDetails {
  showAddress?: true;
  showRecords?: true;
}

interface DeliveryProblem {
  problemType: string;
}
export interface DeliveryProblemMap {
  [problemCaseId: string]: DeliveryProblem;
}

export interface DeliveryRecordsDetail {
  deliveryDate: string;
  deliveryAddress: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  addressTown: string;
  addressCountry: string;
  addressPostcode: string;
  hasHolidayStop: boolean;
  deliveryInstruction?: string;
  isChangedAddress?: boolean;
  problemCaseId?: string;
}

export interface DeliveryRecordsResponse {
  results: DeliveryRecordsApiItem[];
  deliveryProblemMap: DeliveryProblemMap;
  subscription: Subscription;
}

export class DeliveryRecordsApiAsyncLoader extends AsyncLoader<
  DeliveryRecordsResponse
> {}

export const createDeliveryRecordsFetcher = (
  subscriptionId: string,
  startDate?: Moment,
  endDate?: Moment
) => () =>
  fetch(
    `/api/delivery-records/${subscriptionId}${
      startDate && endDate ? `/?startDate=${startDate}&endDate=${endDate}` : ""
    }`
  );

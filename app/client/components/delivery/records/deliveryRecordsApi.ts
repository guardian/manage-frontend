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

export interface DeliveryRecordsResponse {
  results: DeliveryRecordsApiItem[];
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

import {
  DeliveryRecordsApiItem,
  Subscription
} from "../../../../shared/productResponse";
import AsyncLoader from "../../asyncLoader";

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
  isChangedDeliveryInstruction?: boolean;
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

export const createDeliveryRecordsFetcher = (subscriptionId: string) => () =>
  fetch(`/api/delivery-records/${subscriptionId}`);

import {
  DeliveryRecordApiItem,
  MDA_TEST_USER_HEADER,
  Subscription
} from "../../../../shared/productResponse";
import { fetchWithDefaultParameters } from "../../../fetch";
import type {Action} from "react-fetching-library";

interface DeliveryProblem {
  problemType: string;
  id: string;
  ref: string;
}
export interface DeliveryProblemMap {
  [problemCaseId: string]: DeliveryProblem;
}

export interface ContactPhoneNumbers {
  id: string;
  Phone?: string | null;
  HomePhone?: string | null;
  MobilePhone?: string | null;
  OtherPhone?: string | null;
}

export type ContactPhoneNumbersType =
  | "Phone"
  | "HomePhone"
  | "MobilePhone"
  | "OtherPhone";

interface DeliveryCredit {
  amount: number;
  invoiceDate: string | null;
  isActioned: boolean;
}

export interface DeliveryRecordDetail {
  deliveryDate: string;
  deliveryAddress: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  addressTown: string;
  addressCountry: string;
  addressPostcode: string;
  hasHolidayStop: boolean;
  bulkSuspensionReason?: string;
  id: string;
  deliveryInstruction?: string;
  isChangedDeliveryInstruction?: boolean;
  isChangedAddress?: boolean;
  problemCaseId?: string;
  credit?: DeliveryCredit;
}

export interface DeliveryRecordsResponse {
  results: DeliveryRecordApiItem[];
  deliveryProblemMap: DeliveryProblemMap;
  contactPhoneNumbers: ContactPhoneNumbers;
  subscription: Subscription;
  problemTypes: string[];
}

interface DeliveryRecordsPostObj {
  id: string;
  creditAmount?: number;
  invoiceDate?: string | null;
}

export interface DeliveryRecordsPostPayload {
  productName?: string;
  description?: string;
  problemType?: string;
  repeatDeliveryProblem?: boolean;
  deliveryRecords?: DeliveryRecordsPostObj[] | null;
  newContactPhoneNumbers?: ContactPhoneNumbers;
}

export const createDeliveryRecordsFetcher = (
  subscriptionId: string,
  isTestUser: boolean
) => () =>
  fetchWithDefaultParameters(`/api/delivery-records/${subscriptionId}`, {
    headers: {
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  });

export const createDeliveryRecordsEndpoint = (subscriptionId: string, isTestUser: boolean): Action<DeliveryRecordsResponse> => {
  return {
    method: 'GET',
    endpoint:`/api/delivery-records/${subscriptionId}`,
    headers: {
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  }
}


export const createDeliveryRecordsConf = (subscriptionId: string, isTestUser: boolean) => {
  return {
    method: 'GET',
    endpoint:`/api/delivery-records/${subscriptionId}`,
    headers: {
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  }
}

export const createDeliveryRecordsProblemPost = (
  subscriptionId: string,
  isTestUser: boolean,
  payload: DeliveryRecordsPostPayload
) => () =>
  fetch(`/api/delivery-records/${subscriptionId}`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  });

export const createDeliveryRecordsProblemPostEndpoint = (subscriptionId: string, isTestUser: boolean, payload: DeliveryRecordsPostPayload): Action<DeliveryRecordsResponse> => {
  return {
    method: 'POST',
    endpoint: `/api/delivery-records/${subscriptionId}`,
    body: payload,
    headers: {
      "Content-Type": "application/json",
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  }
}

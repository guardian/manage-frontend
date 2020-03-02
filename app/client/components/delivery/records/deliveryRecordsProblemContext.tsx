import { createContext } from "react";
import {
  DeliveryRecordApiItem,
  Subscription
} from "../../../../shared/productResponse";
import {
  ContactPhoneNumbers,
  DeliveryProblemMap,
  DeliveryRecordsPostPayload
} from "./deliveryRecordsApi";

export interface DeliveryRecordsProblemType {
  category?: string;
  message?: string;
}

interface DeliveryRecordsProblemContextInterface {
  subscription: Subscription;
  subscriptionCurrency: string;
  productName: string;
  apiProductName?: string;
  problemType?: DeliveryRecordsProblemType;
  affectedRecords: DeliveryRecordApiItem[];
  deliveryProblemMap: DeliveryProblemMap;
  isTestUser: boolean;
  showProblemCredit?: boolean;
  repeatDeliveryProblem?: boolean;
  contactPhoneNumbers?: ContactPhoneNumbers;
  resetDeliveryRecordsPage: () => void;
}

export interface DeliveryProblemCreditInterface {
  showCredit?: boolean;
  creditAmount?: string;
  creditDate?: string | null;
}

export const DeliveryRecordsProblemContext = createContext<
  DeliveryRecordsProblemContextInterface
>({} as DeliveryRecordsProblemContextInterface);

export const DeliveryRecordCreditContext = createContext<DeliveryProblemCreditInterface | null>(
  null
);

export const DeliveryRecordsProblemPostPayloadContext = createContext<
  DeliveryRecordsPostPayload
>({});

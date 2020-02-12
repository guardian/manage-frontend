import { createContext } from "react";
import { DeliveryRecordApiItem } from "../../../../shared/productResponse";
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
  subscriptionId: string;
  subscriptionCurrency: string;
  productName: string;
  problemType?: DeliveryRecordsProblemType;
  affectedRecords: DeliveryRecordApiItem[];
  deliveryProblemMap: DeliveryProblemMap;
  isTestUser: boolean;
  showProblemCredit?: boolean;
  repeatDeliveryProblem?: boolean;
  contactPhoneNumbers?: ContactPhoneNumbers;
}

export const DeliveryRecordsProblemContext = createContext<DeliveryRecordsProblemContextInterface | null>(
  null
);

export const DeliveryRecordsProblemPostPayloadContext = createContext<DeliveryRecordsPostPayload | null>(
  null
);

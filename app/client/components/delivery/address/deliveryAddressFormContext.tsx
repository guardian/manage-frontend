import { createContext } from "react";
import {DATE_FNS_LONG_OUTPUT_FORMAT, dateString} from "../../../../shared/dates";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { flattenEquivalent } from "../../../utils";

interface NewDeliveryAddressContextInterface {
  newDeliveryAddress?: DeliveryAddress;
  addressStateReset?: () => void;
}

export interface SubscriptionEffectiveData {
  friendlyProductName: string;
  subscriptionId: string;
  effectiveDate?: Date;
}

export const NewDeliveryAddressContext = createContext<
  NewDeliveryAddressContextInterface
>({});

export const AddressChangedInformationContext = createContext<
  SubscriptionEffectiveData[]
>([]);

export const ContactIdContext = createContext<string>("");

export function isAddress(maybeAddress: any): maybeAddress is DeliveryAddress {
  return maybeAddress?.postcode;
}

export const convertToDescriptionListData = (
  addressChangeAffectedInfo: SubscriptionEffectiveData[]
) =>
  addressChangeAffectedInfo
    .map(element => [
      {
        title: element.friendlyProductName,
        value: element.subscriptionId
      },
      {
        title: "Front cover date",
        value: element.effectiveDate
          ? dateString(element.effectiveDate, DATE_FNS_LONG_OUTPUT_FORMAT)
          : "-"
      }
    ])
    .flatMap(flattenEquivalent);

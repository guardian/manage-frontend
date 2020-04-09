import { Moment } from "moment";
import { createContext } from "react";
import { friendlyLongDateFormat } from "../../../../shared/dates";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { ProductFriendlyName } from "../../../../shared/productTypes";
import { flattenEquivalent } from "../../../utils";

interface NewDeliveryAddressContextInterface {
  newDeliveryAddress?: DeliveryAddress;
  addressStateReset?: () => void;
}

export interface SubscriptionEffectiveData {
  friendlyProductName: string;
  subscriptionId: string;
  effectiveDate?: Moment;
}

export const ProductName = createContext<ProductFriendlyName | null>(null);

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
          ? element.effectiveDate.format(friendlyLongDateFormat)
          : "-"
      }
    ])
    .flatMap(flattenEquivalent);

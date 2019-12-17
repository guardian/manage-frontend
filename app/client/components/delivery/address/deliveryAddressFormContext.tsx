import { createContext } from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { ContactIdToArrayOfProductDetail } from "./deliveryAddressForm";

interface NewDeliveryAddressContextInterface {
  newDeliveryAddress?: DeliveryAddress;
  addressStateReset?: () => void;
}

export const NewDeliveryAddressContext = createContext<
  NewDeliveryAddressContextInterface
>({});

export const SubscriptionsAffectedContext = createContext<
  ContactIdToArrayOfProductDetail | {}
>({});

export function isAddress(maybeAddress: any): maybeAddress is DeliveryAddress {
  return maybeAddress?.postcode;
}

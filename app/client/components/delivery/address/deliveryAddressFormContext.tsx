import { createContext } from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { ContactIdToArrayOfProductDetail } from "./deliveryAddressForm";

export const StateResetContext = createContext<() => void>(() => true);

export const DeliveryAddressContext = createContext<DeliveryAddress | {}>({});

export const SubscriptionsAffectedContext = createContext<
  ContactIdToArrayOfProductDetail | {}
>({});

export function isAddress(maybeAddress: any): maybeAddress is DeliveryAddress {
  return maybeAddress?.postcode;
}

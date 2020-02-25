import { createContext } from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";

interface NewDeliveryAddressContextInterface {
  newDeliveryAddress?: DeliveryAddress;
  addressStateReset?: () => void;
}

export const NewDeliveryAddressContext = createContext<
  NewDeliveryAddressContextInterface
>({});

export const AddressChangedInformationContext = createContext<string[]>([]);

export function isAddress(maybeAddress: any): maybeAddress is DeliveryAddress {
  return maybeAddress?.postcode;
}

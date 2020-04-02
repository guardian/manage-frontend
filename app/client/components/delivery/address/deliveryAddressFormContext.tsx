import { createContext } from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { ProductFriendlyName } from "../../../../shared/productTypes";
import { ProductDescriptionListKeyValue } from "../../productDescriptionListTable";

interface NewDeliveryAddressContextInterface {
  newDeliveryAddress?: DeliveryAddress;
  addressStateReset?: () => void;
}

export const ProductName = createContext<ProductFriendlyName | null>(null);

export const NewDeliveryAddressContext = createContext<
  NewDeliveryAddressContextInterface
>({});

export const AddressChangedInformationContext = createContext<
  ProductDescriptionListKeyValue[]
>([]);

export const ContactIdContext = createContext<string>("");

export function isAddress(maybeAddress: any): maybeAddress is DeliveryAddress {
  return maybeAddress?.postcode;
}

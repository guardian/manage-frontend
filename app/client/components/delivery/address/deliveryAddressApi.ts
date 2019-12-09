import { DeliveryAddress } from "../../../../shared/productResponse";

export interface PostDeliveryAddressUpdateResponse {
  ok: boolean;
  message: string;
}

export const updateAddressFetcher = (formData: DeliveryAddress) => () =>
  fetch("/api/delivery/address/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

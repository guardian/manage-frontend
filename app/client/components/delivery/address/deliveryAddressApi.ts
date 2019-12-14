import { DeliveryAddress } from "../../../../shared/productResponse";

export interface PostDeliveryAddressUpdateResponse {
  ok: boolean;
  message: string;
}

export const updateAddressFetcher = (
  formData: DeliveryAddress,
  contactId: string
) => () =>
  fetch(`/api/delivery/address/update/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

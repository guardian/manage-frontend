import { DeliveryAddress } from "../../../../shared/productResponse";

export const updateAddressEndpoint = (
  formData: DeliveryAddress,
  contactId: string
) => ({
    endpoint: `/api/delivery/address/update/${contactId}`,
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

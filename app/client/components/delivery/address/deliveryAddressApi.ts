import { DeliveryAddress } from "../../../../shared/productResponse";
import {Action} from 'react-fetching-library';

export const updateAddressEndpoint = (
  formData: DeliveryAddress,
  contactId: string
): Action<unknown> => ({
    endpoint: `/api/delivery/address/update/${contactId}`,
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

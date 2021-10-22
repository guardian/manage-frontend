import { DeliveryAddress } from "../../../../shared/productResponse";
import type {Action} from 'react-fetching-library';
import {allErrorStatuses} from "../../../fetchClient";

export const updateAddressEndpoint = (
  formData: DeliveryAddress,
  contactId: string
): Action<unknown> => ({
    endpoint: `/api/delivery/address/update/${contactId}`,
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: formData,
    config: {
      emitErrorForStatuses: allErrorStatuses
    }
  });

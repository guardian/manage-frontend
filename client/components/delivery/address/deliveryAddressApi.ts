import type { DeliveryAddress } from '../../../../shared/productResponse';

export const updateAddressFetcher =
	(formData: DeliveryAddress, contactId: string) => () =>
		fetch(`/api/delivery/address/update/${contactId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

/*
 * Product details for signed in user
 * /api/me/mma
 *
 * Products are split out here, but will be returned as an array from the API.
 * eg. `[guardianWeeklyCard, digitalDD, newspaperVoucherPaypal]`
 *
 * DEPRECATED IN FAVOUR OF `productBuilder.ts`
 */

import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../shared/productResponse';

export const toMembersDataApiResponse = (
	...productDetails: ProductDetail[]
): MembersDataApiResponse => {
	return {
		user: {
			firstName: 'test',
			lastName: 'name',
			email: 'test@test.com',
		},
		products: productDetails,
	};
};

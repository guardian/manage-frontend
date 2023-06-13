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

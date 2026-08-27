import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../shared/productResponse';
import { isProduct, isSpecificProductType } from '../../shared/productResponse';
import { PRODUCT_TYPES } from '../../shared/productTypes';

export const MAX_EXTRA_ACCOUNTS = 3;

export const getDigitalPlusProduct = (
	mdapiResponse: MembersDataApiResponse | null,
): ProductDetail | undefined =>
	mdapiResponse?.products
		.filter(isProduct)
		.find(
			(product) =>
				!product.subscription.cancelledAt &&
				isSpecificProductType(
					product.mmaProductKey,
					PRODUCT_TYPES.digipack,
				),
		);

export const hasDigitalPlus = (
	mdapiResponse: MembersDataApiResponse | null,
): boolean => !!getDigitalPlusProduct(mdapiResponse);

import type {
	MembersDataApiResponse,
	ProductDetail,
	ProductTier,
} from '../../shared/productResponse';
import {
	isPlusDigitalProductType,
	isProduct,
	isSpecificProductType,
} from '../../shared/productResponse';
import { PRODUCT_TYPES } from '../../shared/productTypes';

export const MAX_EXTRA_ACCOUNTS = 3;

export const isEligibleForExtraAccounts = (
	mmaProductKey: ProductTier,
): boolean =>
	isSpecificProductType(mmaProductKey, PRODUCT_TYPES.digipack) ||
	isSpecificProductType(mmaProductKey, PRODUCT_TYPES.guardianweekly) ||
	isSpecificProductType(mmaProductKey, PRODUCT_TYPES.tierthree) ||
	isPlusDigitalProductType(mmaProductKey);

export const getExtraAccountsProduct = (
	mdapiResponse: MembersDataApiResponse | null,
): ProductDetail | undefined =>
	mdapiResponse?.products
		.filter(isProduct)
		.find(
			(product) =>
				!product.subscription.cancelledAt &&
				isEligibleForExtraAccounts(product.mmaProductKey) &&
				product.subscription.readerType != 'Gift',
		);

export const hasExtraAccountsAccess = (
	mdapiResponse: MembersDataApiResponse | null,
): boolean => !!getExtraAccountsProduct(mdapiResponse);

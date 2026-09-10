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

// TODO: remove this check once the Extra accounts feature ships.
export const EXTRA_ACCOUNTS_PATH = '/extra-accounts';
export const EXTRA_ACCOUNTS_FLAG_PARAM = 'TEST_EXTRA_ACCOUNTS_FLAG';

export const isExtraAccountsFlagEnabled = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	return (
		new URLSearchParams(window.location.search).get(
			EXTRA_ACCOUNTS_FLAG_PARAM,
		) === 'true'
	);
};

// TODO: remove this check once the Extra accounts feature ships.
export const extraAccountsPath = (): string => {
	if (isExtraAccountsFlagEnabled()) {
		return `${EXTRA_ACCOUNTS_PATH}?${EXTRA_ACCOUNTS_FLAG_PARAM}=true`;
	}
	return EXTRA_ACCOUNTS_PATH;
};

export const isEligibleForExtraAccounts = (
	mmaProductKey: ProductTier,
): boolean =>
	isSpecificProductType(mmaProductKey, PRODUCT_TYPES.digipack) ||
	isSpecificProductType(mmaProductKey, PRODUCT_TYPES.guardianweekly) ||
	isPlusDigitalProductType(mmaProductKey);

export const getExtraAccountsProduct = (
	mdapiResponse: MembersDataApiResponse | null,
): ProductDetail | undefined =>
	mdapiResponse?.products
		.filter(isProduct)
		.find(
			(product) =>
				!product.subscription.cancelledAt &&
				isEligibleForExtraAccounts(product.mmaProductKey),
		);

export const hasExtraAccountsAccess = (
	mdapiResponse: MembersDataApiResponse | null,
): boolean => !!getExtraAccountsProduct(mdapiResponse);

// TODO: remove this check once the Extra accounts feature ships.
export const isExtraAccountsEnabled = (
	mdapiResponse: MembersDataApiResponse | null,
): boolean =>
	hasExtraAccountsAccess(mdapiResponse) && isExtraAccountsFlagEnabled();

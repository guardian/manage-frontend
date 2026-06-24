import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../shared/productResponse';
import { isProduct, isSpecificProductType } from '../../shared/productResponse';
import { PRODUCT_TYPES } from '../../shared/productTypes';

// TODO: remove this query-param check once the Extra accounts feature ships.
// The long-term gate is the Digital plus product check only.
export const isExtraAccountsFlagEnabled = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	return (
		new URLSearchParams(window.location.search).get(
			'TEST_EXTRA_ACCOUNTS_FLAG',
		) === 'true'
	);
};

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

// TODO: Remove this query-param check once the Extra accounts feature ships.
// The long-term gate is the Digital plus product check only.
export const isExtraAccountsEnabled = (
	mdapiResponse: MembersDataApiResponse | null,
): boolean => hasDigitalPlus(mdapiResponse) && isExtraAccountsFlagEnabled();

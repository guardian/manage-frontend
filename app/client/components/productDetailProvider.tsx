import { useLocation } from 'react-router-dom';
import {
	isProduct,
	MembersDataApiItem,
	MembersDatApiAsyncLoader,
	ProductDetail,
} from '../../shared/productResponse';
import { WithProductType, ProductType } from '../../shared/productTypes';
import { createProductDetailFetcher } from '../productUtils';
import { visuallyNavigateToParent } from './wizardRouterAdapter';

export interface ProductDetailProviderProps
	extends WithProductType<ProductType> {
	children: (productDetail: ProductDetail) => JSX.Element;
	allowCancelledSubscription?: true;
	loadingMessagePrefix: string;
	forceRedirectToAccountOverviewIfNoBrowserHistoryState?: true;
}

export const ProductDetailProvider = (props: ProductDetailProviderProps) => {
	// NOTE: this react state is required so that any productDetail in the
	// 'browser history state' at the beginning of the flow is available
	// throughout the flow when re-renders occur based on route changes.
	// Without this, flows would have to pass the productDetail in the
	// browser history state in every page navigation, otherwise users
	// end up stuck on the first step they were on
	interface LocationState {
		productDetail: ProductDetail;
	}

	const location = useLocation();
	const state = location.state as LocationState;

	const productDetailNestedFromBrowserHistoryState =
		isProduct(state?.productDetail) && state?.productDetail;

	const productDetailDirectFromBrowserHistoryState =
		isProduct(state) && state;

	const selectedProductDetail: ProductDetail | null =
		productDetailNestedFromBrowserHistoryState ||
		productDetailDirectFromBrowserHistoryState ||
		null;

	if (selectedProductDetail) {
		return props.children(selectedProductDetail);
	}

	// ie definitely no browser history state
	else if (selectedProductDetail === null) {
		return props.forceRedirectToAccountOverviewIfNoBrowserHistoryState ? (
			visuallyNavigateToParent(true)
		) : (
			<MembersDatApiAsyncLoader
				fetch={createProductDetailFetcher(props.productType)}
				render={renderSingleProductOrReturnToAccountOverview(props)}
				loadingMessage={`${props.loadingMessagePrefix} ${props.productType.friendlyName}...`}
			/>
		);
	}
	return null;
};

const renderSingleProductOrReturnToAccountOverview =
	(props: ProductDetailProviderProps) => (data: MembersDataApiItem[]) => {
		const filteredProductDetails = data
			.filter(isProduct)
			.filter(
				(productDetail) =>
					props.allowCancelledSubscription ||
					!productDetail.subscription.cancelledAt,
			);

		if (filteredProductDetails.length === 1) {
			return props.children(filteredProductDetails[0]);
		}
		return visuallyNavigateToParent(true);
	};

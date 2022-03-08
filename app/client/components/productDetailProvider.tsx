import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	isProduct,
	MembersDataApiItem,
	MembersDatApiAsyncLoader,
	ProductDetail,
} from '../../shared/productResponse';
import { GroupedProductType, WithGroupedProductType } from '../../shared/productTypes';
import { createProductDetailFetcher } from '../productUtils';
import {
	visuallyNavigateToParent,
} from './wizardRouterAdapter';

export interface ProductDetailProviderProps extends WithGroupedProductType<GroupedProductType> {
	children: (productDetail: ProductDetail) => JSX.Element;
	allowCancelledSubscription?: true;
	loadingMessagePrefix: string;
	forceRedirectToAccountOverviewIfNoBrowserHistoryState?: true;
}

interface LocationState {
	state:ProductDetail;
	pathname: string;
	search: string;
	hash: string;
	key: string;
}

export const ProductDetailProvider = (props: ProductDetailProviderProps) => {
	// NOTE: this react state is required so that any productDetail in the
	// 'browser history state' at the beginning of the flow is available
	// throughout the flow when re-renders occur based on route changes.
	// Without this, flows would have to pass the productDetail in the
	// browser history state in every page navigation, otherwise users
	// end up stuck on the first step they were on
	const [selectedProductDetail, setSelectedProductDetail] = useState<
		ProductDetail | null | undefined
	>();

	const location = useLocation().state as MembersDataApiItem | undefined;

	// Browser history state is inspected inside this hook to avoid race condition with server side rendering
	useEffect(() => {
		const productDetailNestedFromBrowserHistoryState =
			isProduct(location?.state?.productDetail) &&
			location?.state?.productDetail;

		const productDetailDirectFromBrowserHistoryState =
			isProduct(props.location?.state) && props.location?.state;

		setSelectedProductDetail(
			productDetailNestedFromBrowserHistoryState ||
				productDetailDirectFromBrowserHistoryState ||
				null,
		);
	}, []); // Equivalent to componentDidMount (ie only happens on the client)

	if (selectedProductDetail) {
		return props.children(selectedProductDetail);
	}
	// ie definitely no browser history state
	else if (selectedProductDetail === null) {
		return props.forceRedirectToAccountOverviewIfNoBrowserHistoryState ? (
			visuallyNavigateToParent(props, true)
		) : (
			<MembersDatApiAsyncLoader
				fetch={createProductDetailFetcher(props.productType)}
				render={renderSingleProductOrReturnToAccountOverview(
					props,
					setSelectedProductDetail,
				)}
				loadingMessage={
					props.loadingMessagePrefix +
					' ' +
					props.productType.friendlyName +
					'...'
				}
			/>
		);
	}
	return null;
};

const renderSingleProductOrReturnToAccountOverview =
	(
		props: ProductDetailProviderProps,
		setSelectedProductDetail: (productDetail: ProductDetail) => void,
	) =>
	(data: MembersDataApiItem[]) => {
		const filteredProductDetails = data
			.filter(isProduct)
			.filter(
				(productDetail) =>
					props.allowCancelledSubscription ||
					!productDetail.subscription.cancelledAt,
			);

		if (filteredProductDetails.length === 1) {
			setSelectedProductDetail(filteredProductDetails[0]);
			return null;
		}
		return visuallyNavigateToParent(props, true);
	};
function WithProductType<T>() {
	throw new Error('Function not implemented.');
}


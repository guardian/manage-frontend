import type { Context } from 'react';
import { createContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../shared/productResponse';
import { isProduct } from '../../../../shared/productResponse';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { createProductDetailFetcher } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';

export interface SwitchRouterState {
	productDetail: ProductDetail;
}

export interface SwitchContextInterface {
	productDetail: ProductDetail;
	isFromApp: Boolean;
}

export const SwitchContext: Context<SwitchContextInterface | {}> =
	createContext({});

const isFromApp = () => window?.location.hash.includes('from-app');

const contextAndOutletContainer = (
	productDetail: ProductDetail,
	isFromApp: Boolean,
) => (
	<SwitchContext.Provider value={{ productDetail, isFromApp }}>
		<Outlet />
	</SwitchContext.Provider>
);

export const SwitchContainer = () => {
	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const productDetail = routerState?.productDetail;

	if (!productDetail) {
		return <AsyncLoadedSwitchContainer />;
	}

	return <RenderedPage productDetail={productDetail} />;
};

const AsyncLoadedSwitchContainer = () => {
	const request = createProductDetailFetcher(
		PRODUCT_TYPES.contributions.allProductsProductTypeFilterString,
	);

	const { data, loadingState } = useAsyncLoader<MembersDataApiResponse>(
		request,
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return (
			<PageContainer
				selectedNavItem={NAV_LINKS.accountOverview}
				pageTitle={'Change your support'}
				compactTitle
			>
				<GenericErrorScreen loggingMessage={false} />
			</PageContainer>
		);
	}
	if (loadingState == LoadingState.IsLoading) {
		return (
			<PageContainer
				selectedNavItem={NAV_LINKS.accountOverview}
				pageTitle={'Change your support'}
				compactTitle
			>
				<DefaultLoadingView />
			</PageContainer>
		);
	}

	if (
		data == null ||
		data.products.length == 0 ||
		data.products.filter(isProduct).length > 1
	) {
		return <Navigate to="/" />;
	}

	const productDetail = data.products.filter(isProduct)[0];
	return <RenderedPage productDetail={productDetail} />;
};

const RenderedPage = (props: { productDetail: ProductDetail }) => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={'Change your support'}
			compactTitle
		>
			{contextAndOutletContainer(props.productDetail, isFromApp())}
		</PageContainer>
	);
};

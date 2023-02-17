import { createContext } from 'react';
import type { Context, ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import type {
	MembersDataApiResponse,
	MembersDataApiUser,
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../shared/productResponse';
import { getMainPlan, isProduct } from '../../../../shared/productResponse';
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
	user?: MembersDataApiUser;
	amountPayableToday: number;
	nextPaymentDate: string;
}

export interface SwitchContextInterface {
	productDetail: ProductDetail;
	isFromApp: boolean;
	user?: MembersDataApiUser;
	mainPlan: PaidSubscriptionPlan;
}

export const SwitchContext: Context<SwitchContextInterface | {}> =
	createContext({});

export const SwitchContainer = (props: { isFromApp?: boolean }) => {
	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const productDetail = routerState?.productDetail;
	const user = routerState?.user;

	if (!productDetail) {
		return <AsyncLoadedSwitchContainer isFromApp={props.isFromApp} />;
	}

	return (
		<RenderedPage
			productDetail={productDetail}
			user={user}
			isFromApp={props.isFromApp}
		/>
	);
};

const SwitchPageContainer = (props: { children: ReactNode }) => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={'Change your support'}
			compactTitle
		>
			{props.children}
		</PageContainer>
	);
};

const AsyncLoadedSwitchContainer = (props: { isFromApp?: boolean }) => {
	const request = createProductDetailFetcher(
		PRODUCT_TYPES.contributions.allProductsProductTypeFilterString,
	);

	const { data, loadingState } = useAsyncLoader<MembersDataApiResponse>(
		request,
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return (
			<SwitchPageContainer>
				<GenericErrorScreen />
			</SwitchPageContainer>
		);
	}
	if (loadingState == LoadingState.IsLoading) {
		return (
			<SwitchPageContainer>
				<DefaultLoadingView />
			</SwitchPageContainer>
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
	return (
		<RenderedPage
			productDetail={productDetail}
			user={data.user}
			isFromApp={props.isFromApp}
		/>
	);
};

const RenderedPage = (props: {
	productDetail: ProductDetail;
	user?: MembersDataApiUser;
	isFromApp?: boolean;
}) => {
	return (
		<SwitchPageContainer>
			<SwitchContext.Provider
				value={{
					productDetail: props.productDetail,
					isFromApp: props.isFromApp,
					user: props.user,
					mainPlan: getMainPlan(
						props.productDetail.subscription,
					) as PaidSubscriptionPlan,
				}}
			>
				<Outlet />
			</SwitchContext.Provider>
		</SwitchPageContainer>
	);
};

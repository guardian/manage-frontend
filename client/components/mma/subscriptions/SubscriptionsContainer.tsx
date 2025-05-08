import type { Context, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { useParams } from 'react-router';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../shared/productResponse';
import { isProduct } from '../../../../shared/productResponse';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { createProductDetailBySubscriptionNameFetcher } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';

// Contexts
export interface SubscriptionsContextInterface {
	productDetail?: ProductDetail;
}

export const SubscriptionsContext: Context<
	SubscriptionsContextInterface | object
> = createContext({});

export interface SubscriptionsPageTitleInterface {
	setPageTitle?: Dispatch<SetStateAction<string>>;
}

export const SubscriptionsPageTitleContext: Context<
	SubscriptionsPageTitleInterface | object
> = createContext({});

// Utility Functions
const contextAndOutletContainer = (productDetail: ProductDetail) => (
	<SubscriptionsContext.Provider value={{ productDetail }}>
		<Outlet />
	</SubscriptionsContext.Provider>
);

const renderProductOrReturnToAccountOverview = (
	mdapiResponse: MembersDataApiResponse,
) => {
	const filteredProductDetails = mdapiResponse.products
		.filter(isProduct)
		.filter((productDetail) => !productDetail.subscription.cancelledAt);

	if (filteredProductDetails.length === 1) {
		return contextAndOutletContainer(filteredProductDetails[0]);
	}
	return <Navigate to="/" />;
};

// Async Component
const AsyncLoadedSubscriptionsContainer = (props: {
	subscriptionId: string;
}) => {
	const request = createProductDetailBySubscriptionNameFetcher(
		props.subscriptionId,
	);

	const { data, loadingState } = useAsyncLoader<MembersDataApiResponse>(
		request,
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return (
			<DefaultLoadingView
				loadingMessage={`Obtaining details of your subscription...`}
			/>
		);
	}

	if (data == null || data.products.length == 0) {
		return <Navigate to="/" />;
	}

	return renderProductOrReturnToAccountOverview(data);
};

// Main Component
export interface SubscriptionsRouterState {
	productDetail: ProductDetail;
}

export const SubscriptionsContainer = () => {
	const location = useLocation();
	const routerState = location.state as SubscriptionsRouterState;
	const productDetail = routerState?.productDetail;

	const params = useParams();
	const subscriptionId = params.subscriptionId ?? '';

	const [pageTitle, setPageTitle] = useState<string>('Subscriptions');

	return (
		<SubscriptionsPageTitleContext.Provider value={{ setPageTitle }}>
			<PageContainer
				selectedNavItem={NAV_LINKS.billing}
				pageTitle={pageTitle}
			>
				{productDetail ? (
					contextAndOutletContainer(productDetail)
				) : (
					<AsyncLoadedSubscriptionsContainer
						subscriptionId={subscriptionId}
					/>
				)}
			</PageContainer>
		</SubscriptionsPageTitleContext.Provider>
	);
};

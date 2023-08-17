import type { Context, ReactNode } from 'react';
import { createContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import type {
	MembersDataApiResponse,
	PaidSubscriptionPlan,
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

export interface UpgradeSupportInterface {
	mainPlan: PaidSubscriptionPlan;
}

export const UpgradeSupportContext: Context<UpgradeSupportInterface | {}> =
	createContext({});

const UpgradeSupportPageContainer = ({ children }: { children: ReactNode }) => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={'Select your new support'}
		>
			{children}
		</PageContainer>
	);
};

export const UpgradeSupportContainer = () => {
	const request = createProductDetailFetcher(
		PRODUCT_TYPES.contributions.allProductsProductTypeFilterString,
	);

	const { data, loadingState } = useAsyncLoader<MembersDataApiResponse>(
		request,
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return (
			<UpgradeSupportPageContainer>
				<GenericErrorScreen />
			</UpgradeSupportPageContainer>
		);
	}
	if (loadingState == LoadingState.IsLoading) {
		return (
			<UpgradeSupportPageContainer>
				<DefaultLoadingView loadingMessage="Loading your contribution details..." />
			</UpgradeSupportPageContainer>
		);
	}

	if (data == null || data.products.length == 0) {
		return <Navigate to="/" />;
	}

	const contribution = data.products.filter(isProduct)[0];
	const mainPlan = getMainPlan(contribution.subscription);

	return (
		<UpgradeSupportPageContainer>
			<UpgradeSupportContext.Provider
				value={{
					mainPlan,
				}}
			>
				<Outlet />
			</UpgradeSupportContext.Provider>
		</UpgradeSupportPageContainer>
	);
};

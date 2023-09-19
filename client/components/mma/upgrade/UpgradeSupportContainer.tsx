import type { Context, ReactNode } from 'react';
import { createContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import type {
	MembersDataApiResponse,
	MembersDataApiUser,
	PaidSubscriptionPlan,
	Subscription,
} from '../../../../shared/productResponse';
import { getMainPlan, isProduct } from '../../../../shared/productResponse';
import {
	calculateMonthlyOrAnnualFromBillingPeriod,
	PRODUCT_TYPES,
} from '../../../../shared/productTypes';
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
	subscription: Subscription;
	user?: MembersDataApiUser;
}

export interface UpgradeRouterState {
	chosenAmount: number;
	amountPayableToday: number;
}

export const UpgradeSupportContext: Context<UpgradeSupportInterface | {}> =
	createContext({});

const UpgradeSupportPageContainer = ({
	pageTitle,
	children,
}: {
	pageTitle?: string;
	children: ReactNode;
}) => {
	return (
		<PageContainer
			compactTitle
			minimalFooter
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={pageTitle ?? 'Your support'}
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
	const mainPlan = getMainPlan(
		contribution.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);
	const pageTitle = `Your ${monthlyOrAnnual.toLowerCase()} support`;

	return (
		<UpgradeSupportPageContainer pageTitle={pageTitle}>
			<UpgradeSupportContext.Provider
				value={{
					mainPlan,
					subscription: contribution.subscription,
					user: data.user,
				}}
			>
				<Outlet />
			</UpgradeSupportContext.Provider>
		</UpgradeSupportPageContainer>
	);
};

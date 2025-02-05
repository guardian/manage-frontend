import type { Context, ReactNode } from 'react';
import { createContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import type {
	MembersDataApiResponse,
	MembersDataApiUser,
	PaidSubscriptionPlan,
	Subscription,
} from '../../../../shared/productResponse';
import { getMainPlan, isProduct } from '../../../../shared/productResponse';
import {
	getBillingPeriodAdjective,
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
	inPaymentFailure: boolean;
	user?: MembersDataApiUser;
}

export interface UpgradeRouterState {
	chosenAmount: number;
	amountPayableToday: number;
	nextPaymentDate: string;
	journeyCompleted: boolean;
}

export const UpgradeSupportContext: Context<UpgradeSupportInterface | object> =
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

function userIsNavigatingBackFromThankYouPage(hasCompleted: boolean) {
	return (
		hasCompleted &&
		!location.pathname.includes('thank-you') &&
		!location.pathname.includes('switch-thank-you')
	);
}

export const UpgradeSupportContainer = () => {
	const request = createProductDetailFetcher(
		PRODUCT_TYPES.contributions.allProductsProductTypeFilterString,
	);

	const location = useLocation();
	const routerState = location.state as UpgradeRouterState;

	const [journeyCompleted, setJourneyCompleted] = useState<boolean>(false);

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

	if (!journeyCompleted && routerState?.journeyCompleted) {
		setJourneyCompleted(true);
	}

	if (userIsNavigatingBackFromThankYouPage(journeyCompleted)) {
		return <Navigate to="/" />;
	}

	const contribution = data.products.filter(isProduct)[0];
	const mainPlan = getMainPlan(
		contribution.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = getBillingPeriodAdjective(mainPlan.billingPeriod);

	const inPaymentFailure = !!contribution.alertText;
	const pageTitle = `Your ${monthlyOrAnnual.toLowerCase()} support`;

	return (
		<UpgradeSupportPageContainer pageTitle={pageTitle}>
			<UpgradeSupportContext.Provider
				value={{
					mainPlan,
					subscription: contribution.subscription,
					inPaymentFailure,
					user: data.user,
				}}
			>
				<Outlet />
			</UpgradeSupportContext.Provider>
		</UpgradeSupportPageContainer>
	);
};

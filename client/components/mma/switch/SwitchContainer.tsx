import type { Context, ReactNode } from 'react';
import { createContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import type {
	MembersDataApiResponse,
	MembersDataApiUser,
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../shared/productResponse';
import { getMainPlan, isProduct } from '../../../../shared/productResponse';
import {
	getBillingPeriodAdjective,
	PRODUCT_TYPES,
} from '../../../../shared/productTypes';
import type { CurrencyIso } from '../../../utilities/currencyIso';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { getBenefitsThreshold } from '../../../utilities/pricingConfig/supporterPlusPricing';
import {
	createProductDetailFetcher,
	isNonServiceableCountry,
} from '../../../utilities/productUtils';
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
	switchHasCompleted?: boolean;
}

export interface SwitchContextInterface {
	contributionToSwitch: ProductDetail;
	isFromApp: boolean;
	user?: MembersDataApiUser;
	mainPlan: PaidSubscriptionPlan;
	monthlyOrAnnual: 'Monthly' | 'Annual';
	supporterPlusTitle: string;
	thresholds: Thresholds;
}

export interface Thresholds {
	monthlyThreshold: number;
	annualThreshold: number;
	thresholdForBillingPeriod: number;
	isAboveThreshold: boolean;
}

export const SwitchContext: Context<SwitchContextInterface | {}> =
	createContext({});

export const SwitchContainer = (props: { isFromApp?: boolean }) => {
	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const contributionToSwitch = routerState?.productDetail;
	const user = routerState?.user;

	const [switchHasCompleted, setSwitchHasCompleted] =
		useState<boolean>(false);

	if (!switchHasCompleted && routerState?.switchHasCompleted) {
		setSwitchHasCompleted(true);
	}

	if (userIsNavigatingBackFromCompletePage(switchHasCompleted)) {
		return <Navigate to="/" />;
	}

	if (!contributionToSwitch) {
		return <AsyncLoadedSwitchContainer isFromApp={props.isFromApp} />;
	}

	return (
		<RenderedPage
			contributionToSwitch={contributionToSwitch}
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
			minimalFooter
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

	if (data == null || data.products.length == 0) {
		return <Navigate to="/" />;
	}

	const contributionToSwitch = data.products.filter(isProduct)[0];
	if (isNonServiceableCountry(contributionToSwitch)) {
		return <Navigate to="/" />;
	}
	return (
		<RenderedPage
			contributionToSwitch={contributionToSwitch}
			user={data.user}
			isFromApp={props.isFromApp}
		/>
	);
};

const RenderedPage = (props: {
	contributionToSwitch: ProductDetail;
	user?: MembersDataApiUser;
	isFromApp?: boolean;
}) => {
	const mainPlan = getMainPlan(
		props.contributionToSwitch.subscription,
	) as PaidSubscriptionPlan;
	const monthlyOrAnnual = getBillingPeriodAdjective(mainPlan.billingPeriod);

	return (
		<SwitchPageContainer>
			<SwitchContext.Provider
				value={{
					contributionToSwitch: props.contributionToSwitch,
					isFromApp: props.isFromApp,
					user: props.user,
					mainPlan,
					monthlyOrAnnual,
					supporterPlusTitle:
						PRODUCT_TYPES.supporterplus.productTitle(),
					thresholds: getThresholds(
						mainPlan,
						monthlyOrAnnual == 'Monthly',
					),
				}}
			>
				<Outlet />
			</SwitchContext.Provider>
		</SwitchPageContainer>
	);
};

function userIsNavigatingBackFromCompletePage(hasCompleted: boolean) {
	return hasCompleted && !location.pathname.includes('complete');
}

function getThresholds(
	mainPlan: PaidSubscriptionPlan,
	monthly: boolean,
): Thresholds {
	const monthlyThreshold = getBenefitsThreshold(
		mainPlan.currencyISO as CurrencyIso,
		'month',
	);
	const annualThreshold = getBenefitsThreshold(
		mainPlan.currencyISO as CurrencyIso,
		'year',
	);
	const thresholdForBillingPeriod = monthly
		? monthlyThreshold
		: annualThreshold;
	const isAboveThreshold = mainPlan.price >= thresholdForBillingPeriod * 100;

	return {
		monthlyThreshold,
		annualThreshold,
		thresholdForBillingPeriod,
		isAboveThreshold,
	};
}

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
import {
	calculateMonthlyOrAnnualFromBillingPeriod,
	PRODUCT_TYPES,
} from '../../../../shared/productTypes';
import { getBenefitsThreshold } from '../../../utilities/benefitsThreshold';
import type { CurrencyIso } from '../../../utilities/currencyIso';
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
	monthlyOrAnnual: 'Monthly' | 'Annual';
	supporterPlusTitle: string;
	thresholds: Thresholds;
}

export interface Thresholds {
	monthlyThreshold: number;
	annualThreshold: number;
	chosenThreshold: number;
	aboveThreshold: boolean;
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
	const mainPlan = getMainPlan(
		props.productDetail.subscription,
	) as PaidSubscriptionPlan;
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);

	return (
		<SwitchPageContainer>
			<SwitchContext.Provider
				value={{
					productDetail: props.productDetail,
					isFromApp: props.isFromApp,
					user: props.user,
					mainPlan,
					monthlyOrAnnual,
					supporterPlusTitle: `${monthlyOrAnnual} + extras`,
					thresholds: getThresholds(mainPlan, monthlyOrAnnual),
				}}
			>
				<Outlet />
			</SwitchContext.Provider>
		</SwitchPageContainer>
	);
};

function getThresholds(
	mainPlan: PaidSubscriptionPlan,
	monthlyOrAnnual: string,
) {
	const monthlyThreshold = getBenefitsThreshold(
		mainPlan.currencyISO as CurrencyIso,
		'Monthly',
	);
	const annualThreshold = getBenefitsThreshold(
		mainPlan.currencyISO as CurrencyIso,
		'Annual',
	);
	const chosenThreshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;

	const aboveThreshold = mainPlan.price >= chosenThreshold * 100;

	return {
		monthlyThreshold,
		annualThreshold,
		chosenThreshold,
		aboveThreshold,
	};
}

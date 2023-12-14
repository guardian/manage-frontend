import type { Context, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type {
	MembersDataApiResponse,
	MembersDataApiUser,
	ProductDetail,
} from '../../../../shared/productResponse';
import { isProduct } from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import type {
	ProductType,
	ProductTypeWithCancellationFlow,
	WithProductType,
} from '../../../../shared/productTypes';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { createProductDetailFetcher } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import type { DeliveryRecordDetail } from '../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../holiday/HolidayStopApi';
import { PageContainer } from '../Page';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import type {
	CancellationReason,
	OptionalCancellationReasonId,
} from './cancellationReason';

const renderSingleProductOrReturnToAccountOverview =
	(productType: ProductType) => (mdapiResponse: MembersDataApiResponse) => {
		const filteredProductDetails = mdapiResponse.products
			.filter(isProduct)
			.filter((productDetail) => !productDetail.subscription.cancelledAt);

		if (filteredProductDetails.length === 1) {
			return contextAndOutletContainer(
				filteredProductDetails[0],
				productType,
			);
		}
		return <Navigate to="/" />;
	};

const AsyncLoadedCancellationContainer = (
	props: WithProductType<ProductType>,
) => {
	const request = createProductDetailFetcher(
		props.productType.allProductsProductTypeFilterString,
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
				loadingMessage={`Checking the status of your ${props.productType.friendlyName(
					undefined,
				)}...`}
			/>
		);
	}

	if (data == null || data.products.length == 0) {
		return <Navigate to="/" />;
	}

	return renderSingleProductOrReturnToAccountOverview(props.productType)(
		data,
	);
};

export interface CancellationContextInterface {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlow;
}

export const CancellationContext: Context<CancellationContextInterface | {}> =
	createContext({});

const contextAndOutletContainer = (
	productDetail: ProductDetail,
	productType: ProductType,
) => (
	<CancellationContext.Provider value={{ productDetail, productType }}>
		<Outlet />
	</CancellationContext.Provider>
);

export interface CancellationRouterState {
	productDetail: ProductDetail;
	productType?: ProductTypeWithCancellationFlow;
	user?: MembersDataApiUser;
	selectedReasonId?: OptionalCancellationReasonId;
	cancellationPolicy?: string;
	caseId?: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
	updatedContributionAmount?: number;
	selectedReason?: CancellationReason;
	dontShowOffer?: boolean;
	journeyCompleted?: boolean;
}

export interface CancellationPageTitleInterface {
	setPageTitle: Dispatch<SetStateAction<string>>;
}

export const CancellationPageTitleContext: Context<
	CancellationPageTitleInterface | {}
> = createContext({});

export const CancellationContainer = (props: WithProductType<ProductType>) => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const productDetail = routerState?.productDetail;
	const groupedProductType =
		GROUPED_PRODUCT_TYPES[props.productType.groupedProductType];

	const [cancellationCompleted, setCancellationCompleted] =
		useState<boolean>(false);

	if (!cancellationCompleted && routerState?.journeyCompleted) {
		setCancellationCompleted(true);
	}

	const [pageTitle, setPageTitle] = useState<string>(
		`Cancel ${
			groupedProductType.shortFriendlyName ||
			groupedProductType.friendlyName()
		}`,
	);

	if (userIsNavigatingBackFromCompletePage(cancellationCompleted)) {
		return <Navigate to="/" />;
	}

	return (
		<CancellationPageTitleContext.Provider value={{ setPageTitle }}>
			<PageContainer
				selectedNavItem={NAV_LINKS.accountOverview}
				pageTitle={pageTitle}
			>
				{productDetail ? (
					contextAndOutletContainer(productDetail, props.productType)
				) : (
					<AsyncLoadedCancellationContainer
						productType={props.productType}
					/>
				)}
			</PageContainer>
		</CancellationPageTitleContext.Provider>
	);
};

function userIsNavigatingBackFromCompletePage(hasCompleted: boolean) {
	return (
		hasCompleted &&
		!location.pathname.includes('reasons') &&
		!location.pathname.includes('confirm-discount') &&
		!location.pathname.includes('switch-thank-you')
	);
}

import { Context, createContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
	isProduct,
	MembersDataApiItem,
	MembersDatApiAsyncLoader,
	ProductDetail,
} from '../../../shared/productResponse';
import {
	ProductType,
	ProductTypeWithCancellationFlow,
	WithProductType,
} from '../../../shared/productTypes';
import { createProductDetailFetcher } from '../../productUtils';
import { DeliveryRecordDetail } from '../delivery/records/deliveryRecordsApi';
import { OutstandingHolidayStop } from '../holiday/holidayStopApi';
import { NAV_LINKS } from '../nav/navConfig';
import { PageContainer } from '../page';
import { OptionalCancellationReasonId } from './cancellationReason';

const renderSingleProductOrReturnToAccountOverview =
	(productType: ProductType) => (data: MembersDataApiItem[]) => {
		const filteredProductDetails = data
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
	selectedReasonId?: OptionalCancellationReasonId;
	cancellationPolicy?: string;
	caseId?: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

const CancellationContainer = (props: WithProductType<ProductType>) => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const productDetail = routerState?.productDetail;

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={`Cancel ${
				props.productType.shortFriendlyName ||
				props.productType.friendlyName
			}`}
			breadcrumbs={[
				{
					title: NAV_LINKS.accountOverview.title,
					link: NAV_LINKS.accountOverview.link,
				},
				{
					title: `Cancel ${props.productType.friendlyName}`,
					currentPage: true,
				},
			]}
		>
			{productDetail ? (
				contextAndOutletContainer(productDetail, props.productType)
			) : (
				<MembersDatApiAsyncLoader
					fetch={createProductDetailFetcher(props.productType)}
					render={renderSingleProductOrReturnToAccountOverview(
						props.productType,
					)}
					loadingMessage={`Checking the status of your ${props.productType.friendlyName}...`}
				/>
			)}
		</PageContainer>
	);
};

export default CancellationContainer;
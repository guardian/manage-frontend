import { Context, createContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { dateAddDays, parseDate } from '../../../../shared/dates';
import {
	DeliveryRecordApiItem,
	isProduct,
	MembersDataApiItem,
	MembersDataApiAsyncLoader,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	ProductTypeWithDeliveryRecordsProperties,
	WithProductType,
} from '../../../../shared/productTypes';
import { createProductDetailFetcher } from '../../../productUtils';
import { NAV_LINKS } from '../../nav/navConfig';
import { PageContainer } from '../../page';
import {
	createDeliveryRecordsFetcher,
	DeliveryRecordDetail,
	DeliveryRecordsApiAsyncLoader,
	DeliveryRecordsResponse,
} from './deliveryRecordsApi';

interface ProblemType {
	category?: string;
	message?: string;
}

export interface DeliveryRecordsRouterState {
	productDetail: ProductDetail;
	affectedRecords: DeliveryRecordApiItem[];
	problemType: ProblemType;
	showProblemCredit: boolean;
}

export const checkForExistingDeliveryProblem = (
	records: DeliveryRecordDetail[],
) =>
	records.findIndex((deliveryRecord) => {
		const recordDateEpoch = parseDate(
			deliveryRecord.deliveryDate,
		).date.valueOf();
		const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
		const fourteenDaysAgoEpoch = dateAddDays(startOfToday, -14).valueOf();
		return (
			deliveryRecord.problemCaseId &&
			recordDateEpoch >= fourteenDaysAgoEpoch
		);
	}) > -1;

const DeliveryRecordsContainer = (
	props: WithProductType<ProductTypeWithDeliveryRecordsProperties>,
) => {
	const location = useLocation();
	const routerState = location.state as DeliveryRecordsRouterState;
	const productDetail = routerState?.productDetail;

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Delivery history"
			breadcrumbs={[
				{
					title: NAV_LINKS.accountOverview.title,
					link: NAV_LINKS.accountOverview.link,
				},
				{
					title: 'Delivery history',
					currentPage: true,
				},
			]}
		>
			{productDetail ? (
				<DeliveryRecordsApiAsyncLoader
					render={renderContextAndOutletContainer(
						props.productType,
						productDetail,
					)}
					fetch={createDeliveryRecordsFetcher(
						productDetail.subscription.subscriptionId,
						productDetail.isTestUser,
					)}
					loadingMessage={'Loading delivery history...'}
				/>
			) : (
				<MembersDataApiAsyncLoader
					fetch={createProductDetailFetcher(props.productType)}
					render={handleMembersDataResponse(props.productType)}
					loadingMessage={`Retrieving details of your ${props.productType.friendlyName}...`}
				/>
			)}
		</PageContainer>
	);
};

const handleMembersDataResponse =
	(productType: ProductTypeWithDeliveryRecordsProperties) =>
	(data: MembersDataApiItem[]) => {
		const filteredProductDetails = data.filter(isProduct);

		if (filteredProductDetails.length === 1) {
			const productDetail = filteredProductDetails[0];
			return (
				<DeliveryRecordsApiAsyncLoader
					render={renderContextAndOutletContainer(
						productType,
						productDetail,
					)}
					fetch={createDeliveryRecordsFetcher(
						productDetail.subscription.subscriptionId,
						productDetail.isTestUser,
					)}
					loadingMessage={'Loading delivery history...'}
				/>
			);
		}
		return <Navigate to="/" />;
	};

export interface DeliveryRecordsContextInterface {
	productDetail: ProductDetail;
	productType: ProductTypeWithDeliveryRecordsProperties;
	data: DeliveryRecordsResponse;
}

export const DeliveryRecordsContext: Context<
	DeliveryRecordsContextInterface | {}
> = createContext({});

const renderContextAndOutletContainer =
	(
		productType: ProductTypeWithDeliveryRecordsProperties,
		productDetail: ProductDetail,
	) =>
	(data: DeliveryRecordsResponse) => {
		return (
			<DeliveryRecordsContext.Provider
				value={{
					productType,
					productDetail,
					data,
				}}
			>
				<Outlet />
			</DeliveryRecordsContext.Provider>
		);
	};

export default DeliveryRecordsContainer;

import type { Context, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { DateRange } from '../../../../shared/dates';
import type {
	MembersDataApiItem,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	isProduct,
	MembersDataApiAsyncLoader,
} from '../../../../shared/productResponse';
import type {
	ProductTypeWithHolidayStopsFlow,
	WithProductType,
} from '../../../../shared/productTypes';
import { createProductDetailFetcher } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import type { ReFetch } from '../shared/AsyncLoader';
import type {
	GetHolidayStopsResponse,
	HolidayStopDetail,
	HolidayStopRequest,
} from './HolidayStopApi';
import {
	createGetHolidayStopsFetcher,
	embellishExistingHolidayStops,
	GetHolidayStopsAsyncLoader,
} from './HolidayStopApi';

export interface HolidayStopsRouterState {
	productDetail: ProductDetail;
}
export interface HolidayStopsContextInterface {
	productDetail: ProductDetail;
	productType: ProductTypeWithHolidayStopsFlow;
	existingHolidayStopToAmend: HolidayStopRequest | null;
	setExistingHolidayStopToAmend: Dispatch<
		SetStateAction<HolidayStopRequest | null>
	>;
	selectedRange: DateRange | undefined;
	setSelectedRange: Dispatch<SetStateAction<DateRange | undefined>>;
	publicationsImpacted: HolidayStopDetail[];
	setPublicationsImpacted: Dispatch<SetStateAction<HolidayStopDetail[]>>;
	holidayStopResponse: GetHolidayStopsResponse;
	reload: ReFetch;
}

export const HolidayStopsContext: Context<HolidayStopsContextInterface | {}> =
	createContext({});

const renderHolidayStopsContextAndOutlet =
	(
		productType: ProductTypeWithHolidayStopsFlow,
		productDetail: ProductDetail,
		existingHolidayStopToAmend: HolidayStopRequest | null,
		setExistingHolidayStopToAmend: Dispatch<
			SetStateAction<HolidayStopRequest | null>
		>,
		selectedRange: DateRange | undefined,
		setSelectedRange: Dispatch<SetStateAction<DateRange | undefined>>,
		publicationsImpacted: HolidayStopDetail[],
		setPublicationsImpacted: Dispatch<SetStateAction<HolidayStopDetail[]>>,
	) =>
	(holidayStopResponse: GetHolidayStopsResponse, reload: ReFetch) => {
		return (
			<HolidayStopsContext.Provider
				value={{
					productType,
					productDetail,
					existingHolidayStopToAmend,
					setExistingHolidayStopToAmend,
					selectedRange,
					setSelectedRange,
					publicationsImpacted,
					setPublicationsImpacted,
					holidayStopResponse,
					reload,
				}}
			>
				<Outlet />
			</HolidayStopsContext.Provider>
		);
	};

const handleMembersDataResponse =
	(
		productType: ProductTypeWithHolidayStopsFlow,
		existingHolidayStopToAmend: HolidayStopRequest | null,
		setExistingHolidayStopToAmend: Dispatch<
			SetStateAction<HolidayStopRequest | null>
		>,
		selectedRange: DateRange | undefined,
		setSelectedRange: Dispatch<SetStateAction<DateRange | undefined>>,
		publicationsImpacted: HolidayStopDetail[],
		setPublicationsImpacted: Dispatch<SetStateAction<HolidayStopDetail[]>>,
	) =>
	(data: MembersDataApiItem[]) => {
		const filteredProductDetails = data.filter(isProduct);

		if (filteredProductDetails.length === 1) {
			const productDetail = filteredProductDetails[0];
			return productDetail.subscription.start ? (
				<GetHolidayStopsAsyncLoader
					fetch={createGetHolidayStopsFetcher(
						productDetail.subscription.subscriptionId,
						productDetail.isTestUser,
					)}
					render={renderHolidayStopsContextAndOutlet(
						productType,
						productDetail,
						existingHolidayStopToAmend,
						setExistingHolidayStopToAmend,
						selectedRange,
						setSelectedRange,
						publicationsImpacted,
						setPublicationsImpacted,
					)}
					loadingMessage="Loading existing suspensions..."
					readerOnOK={embellishExistingHolidayStops}
				/>
			) : (
				<GenericErrorScreen loggingMessage="Subscription had no start date" />
			);
		}
		return <Navigate to="/" />;
	};

const HolidayStopsContainer = (
	props: WithProductType<ProductTypeWithHolidayStopsFlow>,
) => {
	const location = useLocation();
	const routerState = location.state as HolidayStopsRouterState;
	const productDetail = routerState?.productDetail;

	const [existingHolidayStopToAmend, setExistingHolidayStopToAmend] =
		useState<HolidayStopRequest | null>(null);

	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
		undefined,
	);
	const [publicationsImpacted, setPublicationsImpacted] = useState<
		HolidayStopDetail[]
	>([]);

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Manage suspensions"
			breadcrumbs={[
				{
					title: NAV_LINKS.accountOverview.title,
					link: NAV_LINKS.accountOverview.link,
				},
				{
					title: 'Manage suspensions',
					currentPage: true,
				},
			]}
		>
			{productDetail ? (
				productDetail.subscription.start ? (
					<GetHolidayStopsAsyncLoader
						fetch={createGetHolidayStopsFetcher(
							productDetail.subscription.subscriptionId,
							productDetail.isTestUser,
						)}
						render={renderHolidayStopsContextAndOutlet(
							props.productType,
							productDetail,
							existingHolidayStopToAmend,
							setExistingHolidayStopToAmend,
							selectedRange,
							setSelectedRange,
							publicationsImpacted,
							setPublicationsImpacted,
						)}
						loadingMessage="Loading existing suspensions..."
						readerOnOK={embellishExistingHolidayStops}
					/>
				) : (
					<GenericErrorScreen loggingMessage="Subscription had no start date" />
				)
			) : (
				<MembersDataApiAsyncLoader
					fetch={createProductDetailFetcher(
						props.productType.allProductsProductTypeFilterString,
					)}
					render={handleMembersDataResponse(
						props.productType,
						existingHolidayStopToAmend,
						setExistingHolidayStopToAmend,
						selectedRange,
						setSelectedRange,
						publicationsImpacted,
						setPublicationsImpacted,
					)}
					loadingMessage={`Retrieving details of your ${props.productType.friendlyName()}...`}
				/>
			)}
		</PageContainer>
	);
};

export default HolidayStopsContainer;

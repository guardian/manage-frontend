import {
	Context,
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DateRange } from '../../../shared/dates';
import {
	isProduct,
	MembersDataApiItem,
	MembersDatApiAsyncLoader,
	ProductDetail,
} from '../../../shared/productResponse';
import {
	WithProductType,
	ProductTypeWithHolidayStopsFlow,
} from '../../../shared/productTypes';
import { createProductDetailFetcher } from '../../productUtils';
import { ReFetch } from '../asyncLoader';
import { GenericErrorScreen } from '../genericErrorScreen';
import { NAV_LINKS } from '../nav/navConfig';
import { PageContainer } from '../page';
import {
	createGetHolidayStopsFetcher,
	embellishExistingHolidayStops,
	GetHolidayStopsAsyncLoader,
	GetHolidayStopsResponse,
	HolidayStopDetail,
	HolidayStopRequest,
} from './holidayStopApi';

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
				<MembersDatApiAsyncLoader
					fetch={createProductDetailFetcher(props.productType)}
					render={handleMembersDataResponse(
						props.productType,
						existingHolidayStopToAmend,
						setExistingHolidayStopToAmend,
						selectedRange,
						setSelectedRange,
						publicationsImpacted,
						setPublicationsImpacted,
					)}
					loadingMessage={`Retrieving details of your ${props.productType.friendlyName}...`}
				/>
			)}
		</PageContainer>
	);
};

export default HolidayStopsContainer;
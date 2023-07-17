import type { Context, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { DateRange } from '../../../../shared/dates';
import type {
	MembersDataApiResponse,
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
import type {
	GetHolidayStopsResponse,
	HolidayStopDetail,
	HolidayStopRequest,
} from './HolidayStopApi';
import { HolidayStopsPage } from './HolidayStopsPage';

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
	setShouldReload: Dispatch<SetStateAction<boolean>>;
}

export const HolidayStopsContext: Context<HolidayStopsContextInterface | {}> =
	createContext({});

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
		setShouldReload: Dispatch<SetStateAction<boolean>>,
	) =>
	(mdapiResponse: MembersDataApiResponse) => {
		const filteredProductDetails = mdapiResponse.products.filter(isProduct);

		if (filteredProductDetails.length === 1) {
			const productDetail = filteredProductDetails[0];
			return productDetail.subscription.start ? (
				<HolidayStopsPage
					productDetail={productDetail}
					productType={productType}
					existingHolidayStopToAmend={existingHolidayStopToAmend}
					setExistingHolidayStopToAmend={
						setExistingHolidayStopToAmend
					}
					selectedRange={selectedRange}
					setSelectedRange={setSelectedRange}
					publicationsImpacted={publicationsImpacted}
					setPublicationsImpacted={setPublicationsImpacted}
					setShouldReload={setShouldReload}
				/>
			) : (
				<GenericErrorScreen loggingMessage="Subscription had no start date" />
			);
		}
		return <Navigate to="/" />;
	};

export const HolidayStopsContainer = (
	props: WithProductType<ProductTypeWithHolidayStopsFlow>,
) => {
	const location = useLocation();
	const navigate = useNavigate();
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

	const [shouldReload, setShouldReload] = useState<boolean>(false);

	if (shouldReload) {
		navigate(0);
	}

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Manage suspensions"
		>
			{productDetail ? (
				productDetail.subscription.start ? (
					<HolidayStopsPage
						productDetail={productDetail}
						productType={props.productType}
						existingHolidayStopToAmend={existingHolidayStopToAmend}
						setExistingHolidayStopToAmend={
							setExistingHolidayStopToAmend
						}
						selectedRange={selectedRange}
						setSelectedRange={setSelectedRange}
						publicationsImpacted={publicationsImpacted}
						setPublicationsImpacted={setPublicationsImpacted}
						setShouldReload={setShouldReload}
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
						setShouldReload,
					)}
					loadingMessage={`Retrieving details of your ${props.productType.friendlyName()}...`}
				/>
			)}
		</PageContainer>
	);
};

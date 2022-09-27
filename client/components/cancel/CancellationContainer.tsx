import {
	Context,
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
	isProduct,
	MembersDataApiAsyncLoader,
	MembersDataApiItem,
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
import {
	AvailableProductsResponse,
	ProductSwitchContext,
	ProductSwitchResponse,
} from '../productSwitch/productSwitchApi';
import {
	CancellationReason,
	OptionalCancellationReasonId,
} from './cancellationReason';

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
	updatedContributionAmount?: number;
	selectedReason?: CancellationReason;
	dontShowOffer?: boolean;
	chosenProductToSwitchTo?: AvailableProductsResponse;
	productSwitchConfirmationInfo?: ProductSwitchResponse;
}

export interface CancellationPageTitleInterface {
	setPageTitle: Dispatch<SetStateAction<string>>;
}

export const CancellationPageTitleContext: Context<
	CancellationPageTitleInterface | {}
> = createContext({});

const CancellationContainer = (props: WithProductType<ProductType>) => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const productDetail = routerState?.productDetail;

	const [pageTitle, setPageTitle] = useState<string>(
		`Cancel ${
			props.productType.shortFriendlyName ||
			props.productType.friendlyName
		}`,
	);

	return (
		<ProductSwitchContext.Provider
			value={{
				productType: props.productType,
			}}
		>
			<CancellationPageTitleContext.Provider value={{ setPageTitle }}>
				<PageContainer
					selectedNavItem={NAV_LINKS.accountOverview}
					pageTitle={pageTitle}
				>
					{productDetail ? (
						contextAndOutletContainer(
							productDetail,
							props.productType,
						)
					) : (
						<MembersDataApiAsyncLoader
							fetch={createProductDetailFetcher(
								props.productType,
							)}
							render={renderSingleProductOrReturnToAccountOverview(
								props.productType,
							)}
							loadingMessage={`Checking the status of your ${props.productType.friendlyName}...`}
						/>
					)}
				</PageContainer>
			</CancellationPageTitleContext.Provider>
		</ProductSwitchContext.Provider>
	);
};

export default CancellationContainer;

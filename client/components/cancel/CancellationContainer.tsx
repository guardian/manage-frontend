import type { Context, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type {
	MembersDataApiItem,
	ProductDetail,
} from '../../../shared/productResponse';
import {
	isProduct,
	MembersDataApiAsyncLoader,
} from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import type {
	ProductType,
	ProductTypeWithCancellationFlow,
	WithProductType,
} from '../../../shared/productTypes';
import { createProductDetailFetcher } from '../../productUtils';
import type { DeliveryRecordDetail } from '../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../holiday/holidayStopApi';
import { NAV_LINKS } from '../nav/navConfig';
import { PageContainer } from '../page';
import type {
	AvailableProductsResponse,
	ProductSwitchResponse,
} from '../productSwitch/productSwitchApi';
import { ProductSwitchContext } from '../productSwitch/productSwitchApi';
import type {
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
	const groupedProductType = GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];

	const [pageTitle, setPageTitle] = useState<string>(
		`Cancel ${
			groupedProductType.shortFriendlyName ||
			groupedProductType.friendlyName()
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
							loadingMessage={`Checking the status of your ${props.productType.friendlyName(
								productDetail,
							)}...`}
						/>
					)}
				</PageContainer>
			</CancellationPageTitleContext.Provider>
		</ProductSwitchContext.Provider>
	);
};

export default CancellationContainer;

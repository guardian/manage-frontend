import type { Context } from 'react';
import { createContext } from 'react';
import {
	Navigate,
	Outlet,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	isProduct,
	MembersDataApiAsyncLoader,
} from '../../../../shared/productResponse';
import type {
	ProductType,
	WithProductType,
} from '../../../../shared/productTypes';
import { createProductDetailFetcher } from '../../../utilities/productUtils';
import { getNavItemFromFlowReferrer } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';

export interface PaymentUpdateContextInterface {
	productDetail: ProductDetail;
	isFromApp?: boolean;
}

const renderContextAndOutletContainer =
	(isFromApp?: boolean, subscriptionId?: string) =>
	(mdapiResponse: MembersDataApiResponse) => {
		const filteredProductDetails = mdapiResponse.products
			.filter(isProduct)
			.filter(
				(productDetail) =>
					!productDetail.subscription.cancelledAt &&
					productDetail.subscription.readerType !== 'Gift',
			);
		if (filteredProductDetails.length === 1) {
			return (
				<PaymentUpdateContext.Provider
					value={{
						productDetail: filteredProductDetails[0],
						isFromApp,
					}}
				>
					<Outlet />
				</PaymentUpdateContext.Provider>
			);
		} else if (subscriptionId) {
			const filteredProductDetailsWithSubscriptionId =
				filteredProductDetails.filter(
					(productDetail) =>
						productDetail.subscription.subscriptionId ===
						subscriptionId,
				);
			if (filteredProductDetailsWithSubscriptionId.length === 1) {
				return (
					<PaymentUpdateContext.Provider
						value={{
							productDetail:
								filteredProductDetailsWithSubscriptionId[0],
							isFromApp,
						}}
					>
						<Outlet />
					</PaymentUpdateContext.Provider>
				);
			}
		}
		return <Navigate to="/" />;
	};

export const PaymentUpdateContext: Context<PaymentUpdateContextInterface | null> =
	createContext<PaymentUpdateContextInterface | null>(null);

export const PaymentDetailUpdateContainer = (
	props: WithProductType<ProductType>,
) => {
	interface LocationState {
		productDetail: ProductDetail;
		flowReferrer?: {
			title: string;
			link: string;
		};
		isFromApp?: boolean;
	}

	const [queryParameters] = useSearchParams();
	const location = useLocation();
	const routerState = location.state as LocationState;
	const productDetail = routerState?.productDetail;
	const isFromApp = routerState?.isFromApp;

	const navItemReferrer = getNavItemFromFlowReferrer(
		routerState?.flowReferrer?.title,
	);

	return (
		<PageContainer
			selectedNavItem={navItemReferrer}
			pageTitle="Manage payment method"
		>
			{productDetail ? (
				<PaymentUpdateContext.Provider
					value={{ productDetail, isFromApp }}
				>
					<Outlet />
				</PaymentUpdateContext.Provider>
			) : (
				<MembersDataApiAsyncLoader
					fetch={createProductDetailFetcher(
						props.productType.allProductsProductTypeFilterString,
					)}
					render={renderContextAndOutletContainer(
						isFromApp,
						queryParameters.get('subscriptionId') ?? undefined, // for internal links we use the context instead of query params
					)}
					loadingMessage={`Retrieving current payment details for your ${props.productType.friendlyName}...`}
				/>
			)}
		</PageContainer>
	);
};

import type { Context } from 'react';
import { createContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
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

const renderContextAndOutletContainer = (
	mdapiResponse: MembersDataApiResponse,
) => {
	const filteredProductDetails = mdapiResponse.products
		.filter(isProduct)
		.filter(
			(productDetail) =>
				!productDetail.subscription.cancelledAt &&
				productDetail.subscription.readerType !== 'Gift',
		);
	if (filteredProductDetails.length === 1) {
		return (
			<PaymentUpdateProductDetailContext.Provider
				value={filteredProductDetails[0]}
			>
				<Outlet />
			</PaymentUpdateProductDetailContext.Provider>
		);
	}
	return <Navigate to="/" />;
};

export const PaymentUpdateProductDetailContext: Context<ProductDetail | {}> =
	createContext({});

export const PaymentDetailUpdateContainer = (
	props: WithProductType<ProductType>,
) => {
	interface LocationState {
		productDetail: ProductDetail;
		flowReferrer?: {
			title: string;
			link: string;
		};
	}

	const location = useLocation();
	const routerState = location.state as LocationState;
	const productDetail = routerState?.productDetail;

	const navItemReferrer = getNavItemFromFlowReferrer(
		routerState?.flowReferrer?.title,
	);

	return (
		<PageContainer
			selectedNavItem={navItemReferrer}
			pageTitle="Manage payment method"
		>
			{productDetail ? (
				<PaymentUpdateProductDetailContext.Provider
					value={productDetail}
				>
					<Outlet />
				</PaymentUpdateProductDetailContext.Provider>
			) : (
				<MembersDataApiAsyncLoader
					fetch={createProductDetailFetcher(
						props.productType.allProductsProductTypeFilterString,
					)}
					render={renderContextAndOutletContainer}
					loadingMessage={`Retrieving current payment details for your ${props.productType.friendlyName()}...`}
				/>
			)}
		</PageContainer>
	);
};

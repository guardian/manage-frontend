import type { Context } from 'react';
import { createContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import type {
	MembersDataApiItem,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	isProduct,
	MembersDataApiAsyncLoader,
} from '../../../../shared/productResponse';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import { createProductDetailFetcher } from '../../../utilities/productUtils';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';

export interface SwitchRouterState {
	productDetail: ProductDetail;
}

export interface SwitchContextInterface {
	productDetail: ProductDetail;
	isFromApp: Boolean;
}

export const SwitchContext: Context<SwitchContextInterface | {}> =
	createContext({});

const isFromApp = () => window?.location.hash.includes('from-app');

const renderSingleProductOrReturnToAccountOverview = (
	data: MembersDataApiItem[],
) => {
	const filteredProductDetails = data.filter(isProduct);

	if (filteredProductDetails.length === 1) {
		return contextAndOutletContainer(
			filteredProductDetails[0],
			isFromApp(),
		);
	}
	return <Navigate to="/" />;
};

const contextAndOutletContainer = (
	productDetail: ProductDetail,
	isFromApp: Boolean,
) => (
	<SwitchContext.Provider value={{ productDetail, isFromApp }}>
		<Outlet />
	</SwitchContext.Provider>
);

const SwitchContainer = () => {
	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const productDetail = routerState?.productDetail;

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={'Change your support'}
			compactTitle
		>
			{productDetail ? (
				contextAndOutletContainer(productDetail, isFromApp())
			) : (
				<MembersDataApiAsyncLoader
					fetch={createProductDetailFetcher(
						PRODUCT_TYPES.contributions
							.allProductsProductTypeFilterString,
					)}
					render={renderSingleProductOrReturnToAccountOverview}
					loadingMessage={'Fetching your current support'}
				/>
			)}
		</PageContainer>
	);
};

export default SwitchContainer;

import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { ProductDetail } from '../../../../shared/productResponse';
import { getNavItemFromFlowReferrer } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';

export const PaymentDetailUpdateCheckoutSessionReturn = () => {
	const location = useLocation();
	const routerState = location.state as {
		productDetail: ProductDetail;
		flowReferrer?: {
			title: string;
			link: string;
		};
		isFromApp?: boolean;
	};
	const navItemReferrer = getNavItemFromFlowReferrer(
		routerState?.flowReferrer?.title,
	);

	// Parse the query parameters
	const queryParams = new URLSearchParams(location.search);
	const sessionId = queryParams.get('id'); // Read the 'session_id' query parameter

	useEffect(() => {
		if (sessionId) {
			// Fetch the payment method information
		}
	}, [sessionId]);

	return sessionId ? (
		<PageContainer
			selectedNavItem={navItemReferrer}
			pageTitle="Manage payment method"
		>
			<DefaultLoadingView loadingMessage="Obtaining payment method information..." />
		</PageContainer>
	) : (
		<Navigate to="/" />
	);
};

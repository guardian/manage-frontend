import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProductDetail } from '../../../../shared/productResponse';
import { getNavItemFromFlowReferrer } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';

export const PaymentDetailUpdateCheckoutSessionReturn = () => {
	const navigate = useNavigate();
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

	const navigateToFailedPage = useCallback(() => {
		const failedPagePath = location.pathname.replace(/[^/]+$/, 'failed');

		/**
		 * Well, I don't like this approach because the "failed" page is
		 * loading the current payment methods of the user, but at the same
		 * time I do not want to create a new page just for this purpose.
		 * Let's see if we can improve this in the future by avoiding the
		 * "failed" page to load the payment methods or the requirement
		 * of having to pass the state to the "failed" page (in that case
		 * we could just include the component here without having to navigate).
		 */
		navigate(failedPagePath, {
			state: {
				newPaymentMethodDetailFriendlyName: 'Payment Method',
			},
		});
	}, [location.pathname, navigate]);

	useEffect(() => {
		if (sessionId) {
			console.log('sessionId:', sessionId);
		} else {
			navigateToFailedPage();
		}
	}, [sessionId, navigateToFailedPage]);

	return sessionId ? (
		<PageContainer
			selectedNavItem={navItemReferrer}
			pageTitle="Manage payment method"
		>
			<DefaultLoadingView loadingMessage="Obtaining payment method information..." />
		</PageContainer>
	) : null;
};

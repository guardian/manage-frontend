import { useLocation } from 'react-router';
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

	return (
		<PageContainer
			selectedNavItem={navItemReferrer}
			pageTitle="Manage payment method"
		>
			<DefaultLoadingView loadingMessage="Obtaining payment method information..." />
		</PageContainer>
	);
};

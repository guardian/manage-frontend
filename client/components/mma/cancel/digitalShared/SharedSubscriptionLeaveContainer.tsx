import { Outlet } from 'react-router-dom';
import { NAV_LINKS } from '@/client/components/shared/nav/NavConfig';
import { PageContainer } from '../../Page';

export const LeaveSharedSubscriptionContainer = () => (
	<PageContainer
		selectedNavItem={NAV_LINKS.accountOverview}
		pageTitle="Manage subscription"
	>
		<Outlet />
	</PageContainer>
);

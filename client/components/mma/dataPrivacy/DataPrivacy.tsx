import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { DataPrivacyPage } from './DataPrivacyPage';

export const DataPrivacy = () => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.dataPrivacy}
			pageTitle="Data privacy"
		>
			<DataPrivacyPage />
		</PageContainer>
	);
};

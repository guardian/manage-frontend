import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';

export const SavedArticles = () => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.savedArticles}
			pageTitle={NAV_LINKS.savedArticles.title}
		>
			<p>There is nothing to see here yet</p>
		</PageContainer>
	);
};

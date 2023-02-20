import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';

export const SavedArticles = () => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.savedArticles}
			pageTitle={NAV_LINKS.savedArticles.title}
		>
			<SavedArticlesPage
				saveForLaterAPICall={() =>
					fetchWithDefaultParameters('/add/url')
				}
			/>
		</PageContainer>
	);
};

interface SavedArticlesPageProps {
	saveForLaterAPICall: () => Promise<unknown>;
}

export function SavedArticlesPage(props: SavedArticlesPageProps) {
	const {
		loadingState,
	}: {
		data: unknown;
		loadingState: LoadingState;
	} = useAsyncLoader(props.saveForLaterAPICall, JsonResponseHandler);

	if (loadingState === LoadingState.HasError) {
		return <GenericErrorScreen />;
	}

	return <p>hello</p>;
}

import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import type { SavedArticlesResponse } from './models/SavedArticle';
import { SavedArticlesDisplay } from './SavedArticlesDisplay';

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
		data,
		loadingState,
	}: {
		data: SavedArticlesResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(props.saveForLaterAPICall, JsonResponseHandler);

	if (loadingState === LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (data === null) {
		return <GenericErrorScreen />;
	} else {
		return <SavedArticlesDisplay savedArticles={data.articles} />;
	}
}

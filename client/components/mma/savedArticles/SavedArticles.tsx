import { typeCheckObject } from '../../../../shared/typeCheckObject';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { isSavedArticlesResponse } from './models/SavedArticle';
import type { SavedArticlesResponse } from './models/SavedArticle';
import { SavedArticlesDisplay } from './SavedArticlesDisplay';
import { SavedArticlesEmpty } from './SavedArticlesEmpty';
import { SavedArticlesLoading } from './SavedArticlesLoading';

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
		data: unknown;
		loadingState: LoadingState;
	} = useAsyncLoader(props.saveForLaterAPICall, JsonResponseHandler);

	if (loadingState === LoadingState.IsLoading) {
		return <SavedArticlesLoading />;
	}
	if (loadingState === LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	const saveForLaterData = typeCheckObject<SavedArticlesResponse>(
		isSavedArticlesResponse,
	)(data);
	if (saveForLaterData === undefined) {
		return <GenericErrorScreen />;
	}
	if (saveForLaterData.articles.length === 0) {
		return <SavedArticlesEmpty />;
	}
	return <SavedArticlesDisplay savedArticles={saveForLaterData.articles} />;
}

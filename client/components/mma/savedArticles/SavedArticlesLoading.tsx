import { Spinner } from '../../shared/Spinner';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';

export const SavedArticlesLoading = () => (
	<WithStandardTopMargin>
		<Spinner loadingMessage={'Fetching saved articles'} />
	</WithStandardTopMargin>
);

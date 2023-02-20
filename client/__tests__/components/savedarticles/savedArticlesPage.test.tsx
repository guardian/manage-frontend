import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SavedArticlesPage } from '../../../components/mma/savedArticles/SavedArticles';

describe('SavedArticlesPage', () => {
	it('should show an error page if the call fails', async () => {
		render(
			<SavedArticlesPage
				saveForLaterAPICall={() => {
					return Promise.reject();
				}}
			/>,
		);

		await waitFor(() => {
			expect(screen.queryByText('Oops!')).toBeInTheDocument();
		});
	});
});

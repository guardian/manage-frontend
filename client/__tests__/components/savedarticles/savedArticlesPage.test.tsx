import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SavedArticlesPage } from '../../../components/mma/savedArticles/SavedArticles';

describe('SavedArticlesPage', () => {
	it('should show an error page if the S4L API call fails', async () => {
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

	it('should display a list of articles if the S4L API call succeeds and user has saved articles', async () => {
		render(
			<SavedArticlesPage
				saveForLaterAPICall={() => {
					return Promise.resolve({
						version: '1',
						articles: [
							{
								id: 'world/2018/mar/08/donald-trump-north-korea-kim-jong-un-meeting-may-letter-invite-talks-nuclear-weapons',
								shortUrl: '/p/88btx',
								date: '2018-03-09T14:08:02Z',
								read: false,
							},
							{
								id: 'football/2018/mar/12/jamie-carragher-dropped-by-danish-broadcaster-after-spitting-incident',
								shortUrl: '/p/88qhj',
								date: '2018-03-12T16:53:32Z',
								read: false,
							},
						],
					});
				}}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryByText(
					'world/2018/mar/08/donald-trump-north-korea-kim-jong-un-meeting-may-letter-invite-talks-nuclear-weapons',
				),
			).toBeInTheDocument();
		});
	});
});

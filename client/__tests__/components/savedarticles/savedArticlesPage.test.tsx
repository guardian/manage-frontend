import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SavedArticlesPage } from '../../../components/mma/savedArticles/SavedArticles';
// Importing this in order to create the Response object, as per the advice of this
// https://stackoverflow.com/questions/52420318/referenceerror-response-is-not-defined
import 'isomorphic-fetch';

describe('SavedArticlesPage', () => {
	const successfulAPIResponse: (body: string) => Response = (body) => {
		return new Response(body, {
			status: 200,
			statusText: 'Ok',
			headers: {
				'Content-type': 'application/json',
			},
		});
	};
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
		const articles = {
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
		};

		const apiResponse = successfulAPIResponse(JSON.stringify(articles));

		render(
			<SavedArticlesPage
				saveForLaterAPICall={() => {
					return Promise.resolve(apiResponse);
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

	// eslint-disable-next-line jest/no-disabled-tests -- Add this test in when we have validated the response type
	it.skip('should display an error message if the API call is successful but the json response is not expected', async () => {
		const invalidJson = {
			foo: 'bar',
		};

		const apiResponse = successfulAPIResponse(JSON.stringify(invalidJson));

		render(
			<SavedArticlesPage
				saveForLaterAPICall={() => {
					return Promise.resolve(apiResponse);
				}}
			/>,
		);

		await waitFor(() => {
			expect(screen.queryByText('Oops!')).toBeInTheDocument();
		});
	});

	it('should display the empty articles page if user has no saved articles', async () => {
		const noArticles = {
			version: 1,
			articles: [],
		};

		const apiResponse = successfulAPIResponse(JSON.stringify(noArticles));
		render(
			<SavedArticlesPage
				saveForLaterAPICall={() => {
					return Promise.resolve(apiResponse);
				}}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryByText('You have no saved articles'),
			).toBeInTheDocument();
		});
	});
});

import {
	newsletterToConsentOption,
	read,
} from '@/client/components/mma/identity/idapi/newsletters';

describe('newsletters idapi client', () => {
	beforeEach(() => {
		globalThis.fetch = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('maps signUpDescription into ConsentOption description', () => {
		const option = newsletterToConsentOption({
			id: 'morning-briefing-uk',
			name: 'Morning Briefing',
			status: 'live',
			theme: 'news',
			group: 'News',
			signUpDescription: 'Primary description',
			signUpEmbedDescription: 'Embed description',
			frequency: 'Every weekday',
			exactTargetListId: 4151,
			listId: 4151,
		});

		expect(option).toEqual(
			expect.objectContaining({
				id: '4151',
				identityName: 'morning-briefing-uk',
				description: 'Primary description',
				frequency: 'Every weekday',
				theme: 'news',
				group: 'News',
				name: 'Morning Briefing',
			}),
		);
	});

	it('falls back to signUpEmbedDescription and listId when needed', () => {
		const option = newsletterToConsentOption({
			id: 'first-edition-uk',
			name: 'First Edition',
			status: 'live',
			theme: 'news',
			group: 'News',
			signUpDescription: null,
			signUpEmbedDescription: 'Embed fallback description',
			frequency: 'Every weekday',
			exactTargetListId: null,
			listId: 4156,
		});

		expect(option.id).toBe('4156');
		expect(option.description).toBe('Embed fallback description');
	});

	it('reads from /idapi/newsletters and maps response items', async () => {
		const fetchMock = globalThis.fetch as jest.Mock;
		fetchMock.mockResolvedValue({
			json: () =>
				Promise.resolve([
					{
						id: 'moving-the-goalposts',
						name: 'Moving the Goalposts',
						status: 'paused',
						theme: 'sport',
						group: 'Sport',
						signUpDescription: null,
						signUpEmbedDescription:
							"Covering women's football across the world.",
						frequency: 'Twice a week',
						exactTargetListId: 4120,
						listId: 4120,
					},
				]),
		});

		const options = await read();

		expect(fetchMock).toHaveBeenCalledWith('/idapi/newsletters', {
			credentials: 'include',
			mode: 'same-origin',
		});
		expect(options).toEqual([
			expect.objectContaining({
				id: '4120',
				description: "Covering women's football across the world.",
				identityName: 'moving-the-goalposts',
			}),
		]);
	});
});

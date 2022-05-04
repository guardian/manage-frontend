import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import fetchMock from 'fetch-mock';

import { SectionContent } from '../sectionContent';
import { SectionHeader } from '../sectionHeader';
import HelpCentreArticle from './helpCentreArticle';

export default {
	title: 'Pages/HelpCentreArticle',
	component: HelpCentreArticle,
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			viewports: [320, 1300],
		},
	},
} as ComponentMeta<typeof HelpCentreArticle>;

const articleContent = {
	title: 'I need to pause my delivery',
	body: [
		{
			element: 'p',
			content: [
				{
					element: 'text',
					content:
						'All our print subscribers can apply a holiday suspension to their subscription and get credited the cost for the suspended issues on their next bill date.',
				},
			],
		},
	],
	path: 'i-need-to-pause-my-delivery',
	topics: [
		{
			path: 'delivery',
			title: 'Delivery',
		},
	],
};

export const Default: ComponentStory<typeof HelpCentreArticle> = () => {
	fetchMock
		.restore()
		.get('/api/known-issues/', { body: [] })
		.get('/api/help-centre/article/i-need-to-pause-my-delivery', {
			body: articleContent,
		});

	return (
		<MemoryRouter initialEntries={["/article/i-need-to-pause-my-delivery"]}>
			<Routes>
				<Route path="/article/:articleCode" element={
					<>
						<SectionHeader title="How can we help you?" pageHasNav={true} />
						<SectionContent hasNav={true}>
							<HelpCentreArticle />
						</SectionContent>
					</>
				} />
			</Routes>
		</MemoryRouter>
	);
};

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import { SectionContent } from '../shared/sectionContent';
import { SectionHeader } from '../shared/sectionHeader';
import HelpCentreArticle from './helpCentreArticle';

export default {
	title: 'Pages/HelpCentreArticle',
	component: HelpCentreArticle,
	decorators: [ReactRouterDecorator],
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
		<>
			<SectionHeader title="How can we help you?" pageHasNav={true} />
			<SectionContent hasNav={true}>
				<HelpCentreArticle />
			</SectionContent>
		</>
	);
};
Default.parameters = {
	reactRouter: {
		location: '/article/i-need-to-pause-my-delivery',
		path: '/article/:articleCode',
	},
};

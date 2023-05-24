import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import { SectionContent } from '../shared/SectionContent';
import { SectionHeader } from '../shared/SectionHeader';
import { HelpCentreArticle } from './HelpCentreArticle';

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
	msw: [
		rest.get('/api/known-issues/', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
		rest.get(
			'/api/help-centre/article/i-need-to-pause-my-delivery',
			(_req, res, ctx) => {
				return res(ctx.json(articleContent));
			},
		),
	],
	reactRouter: {
		location: '/article/i-need-to-pause-my-delivery',
		path: '/article/:articleCode',
	},
};

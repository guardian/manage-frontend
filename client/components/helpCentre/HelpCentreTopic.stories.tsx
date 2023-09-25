import type { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { SectionContent } from '../shared/SectionContent';
import { SectionHeader } from '../shared/SectionHeader';
import { HelpCentreTopic } from './HelpCentreTopic';

export default {
	title: 'Pages/HelpCentreTopic',
	component: HelpCentreTopic,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof HelpCentreTopic>;

const topicContent = {
	path: 'delivery',
	title: 'Delivery',
	articles: [
		{
			path: 'i-need-to-pause-my-delivery',
			title: 'I need to pause my delivery',
		},
		{
			path: 'my-delivery-is-late-or-missing',
			title: 'My delivery is late or missing',
		},
		{
			path: 'my-paper-is-missing-a-section',
			title: 'My paper is missing a section',
		},
	],
};

export const Default: StoryFn<typeof HelpCentreTopic> = () => {
	return (
		<>
			<SectionHeader title="How can we help you?" pageHasNav={true} />
			<SectionContent hasNav={true}>
				<HelpCentreTopic />
			</SectionContent>
		</>
	);
};

Default.parameters = {
	msw: [
		rest.get('/api/help-centre/topic/delivery', (_req, res, ctx) => {
			return res(ctx.json(topicContent));
		}),
	],
	reactRouter: {
		location: '/topic/delivery',
		path: '/topic/:topicCode',
	},
};

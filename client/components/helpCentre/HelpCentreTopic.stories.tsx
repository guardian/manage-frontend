import type { Meta, StoryObj } from '@storybook/react';
import {http, HttpResponse} from 'msw';
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

export const Default: StoryObj<typeof HelpCentreTopic> = {
	render: () => {
		return (
			<>
				<SectionHeader title="How can we help you?" pageHasNav={true} />
				<SectionContent hasNav={true}>
					<HelpCentreTopic />
				</SectionContent>
			</>
		);
	},

	parameters: {
		msw: [
			http.get('/api/help-centre/topic/delivery', () => {
				return HttpResponse.json(topicContent)
			}),
		],
		reactRouter: {
			location: '/topic/delivery',
			path: '/topic/:topicCode',
		},
	},
};

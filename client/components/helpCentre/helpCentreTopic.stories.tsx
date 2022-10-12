import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import { SectionContent } from '../sectionContent';
import { SectionHeader } from '../sectionHeader';
import HelpCentreTopic from './helpCentreTopic';

export default {
	title: 'Pages/HelpCentreTopic',
	component: HelpCentreTopic,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof HelpCentreTopic>;

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

export const Default: ComponentStory<typeof HelpCentreTopic> = () => {
	fetchMock
		.restore()
		.get('/api/help-centre/topic/delivery', { body: topicContent });

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
	reactRouter: {
		location: '/topic/delivery',
		path: '/topic/:topicCode',
	},
};

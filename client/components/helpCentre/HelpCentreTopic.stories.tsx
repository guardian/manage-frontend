import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import {
	mswHandlers,
	setHelpCentreScenario,
} from '../../utilities/mocks/mswHandlers';
import { SectionContent } from '../shared/SectionContent';
import { SectionHeader } from '../shared/SectionHeader';
import { HelpCentreTopic } from './HelpCentreTopic';

export default {
	title: 'Pages/HelpCentreTopic',
	component: HelpCentreTopic,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		msw: {
			handlers: mswHandlers,
		},
	},
	beforeEach: () => {
		setHelpCentreScenario.clear();
	},
} as Meta<typeof HelpCentreTopic>;

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
	beforeEach: () => {
		setHelpCentreScenario.default();
	},
	parameters: {
		reactRouter: {
			location: '/topic/delivery',
			path: '/topic/:topicCode',
		},
	},
};

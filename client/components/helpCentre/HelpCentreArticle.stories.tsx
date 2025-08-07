import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import {
	accountOverviewHandlers,
	setHelpCentreScenario,
} from '../../utilities/mocks/mswHandlers';
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
		msw: {
			handlers: accountOverviewHandlers,
		},
	},
	beforeEach: () => {
		setHelpCentreScenario.clear();
	},
} as Meta<typeof HelpCentreArticle>;

export const Default: StoryObj<typeof HelpCentreArticle> = {
	render: () => {
		return (
			<>
				<SectionHeader title="How can we help you?" pageHasNav={true} />
				<SectionContent hasNav={true}>
					<HelpCentreArticle />
				</SectionContent>
			</>
		);
	},
	beforeEach: () => {
		setHelpCentreScenario.default();
	},
	parameters: {
		reactRouter: {
			location: '/article/i-need-to-pause-my-delivery',
			path: '/article/:articleCode',
		},
	},
};

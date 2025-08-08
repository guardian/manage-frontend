import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import {
	mswHandlers,
	setHelpCentreScenario,
} from '../../utilities/mocks/mswHandlers';
import { HelpCenterContentWrapper } from './HelpCenterContentWrapper';
import { HelpCentre } from './HelpCentre';

export default {
	title: 'Pages/HelpCentre',
	component: HelpCentre,
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
} as Meta<typeof HelpCentre>;

export const Default: StoryObj<typeof HelpCentre> = {
	render: () => {
		return (
			<HelpCenterContentWrapper knownIssues={[]}>
				<HelpCentre />
			</HelpCenterContentWrapper>
		);
	},
	beforeEach: () => {
		setHelpCentreScenario.default();
	},
};

export const WithKnownIssue: StoryObj<typeof HelpCentre> = {
	render: () => {
		const knownIssue = [
			{
				date: '20 Jan 2022 12:00',
				message: 'Live Chat is currently unavailable.',
			},
		];

		return (
			<HelpCenterContentWrapper knownIssues={knownIssue}>
				<HelpCentre />
			</HelpCenterContentWrapper>
		);
	},
	beforeEach: () => {
		setHelpCentreScenario.withKnownIssues();
	},
	parameters: {
		chromatic: {
			viewports: [320, 1300],
		},
	},
};

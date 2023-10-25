import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { HelpCenterContentWrapper } from './HelpCenterContentWrapper';
import { HelpCentre } from './HelpCentre';

export default {
	title: 'Pages/HelpCentre',
	component: HelpCentre,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
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

	parameters: {
		msw: [
			rest.get('/api/known-issues/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
		],
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

	parameters: {
		chromatic: {
			viewports: [320, 1300],
		},
	},
};

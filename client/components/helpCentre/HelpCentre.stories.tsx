import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
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
			http.get('/api/known-issues/', () => {
				return HttpResponse.json([]);
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

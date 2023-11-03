import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancelReminders } from './CancelReminders';

export default {
	title: 'Pages/CancelReminders',
	component: CancelReminders,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			location: '/cancel-reminders/test',
			path: 'cancel-reminders/:reminderCode',
		},
	},
} as Meta<typeof CancelReminders>;

export const Error: StoryObj<typeof CancelReminders> = {
	render: () => {
		return <CancelReminders />;
	},

	parameters: {
		msw: [
			rest.post('/api/reminders/cancel', (_req, res, ctx) => {
				return res(ctx.status(500));
			}),
		],
	},
};

export const Success: StoryObj<typeof CancelReminders> = {
	render: () => {
		return <CancelReminders />;
	},

	parameters: {
		msw: [
			rest.post('/api/reminders/cancel', (_req, res, ctx) => {
				return res(ctx.status(200));
			}),
		],
	},
};

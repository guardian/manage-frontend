import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
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
} as ComponentMeta<typeof CancelReminders>;

export const Error: ComponentStory<typeof CancelReminders> = () => {
	return <CancelReminders />;
};

Error.parameters = {
	msw: [
		rest.post('/api/reminders/cancel', (_req, res, ctx) => {
			return res(ctx.status(500));
		}),
	],
};

export const Success: ComponentStory<typeof CancelReminders> = () => {
	return <CancelReminders />;
};

Success.parameters = {
	msw: [
		rest.post('/api/reminders/cancel', (_req, res, ctx) => {
			return res(ctx.status(200));
		}),
	],
};

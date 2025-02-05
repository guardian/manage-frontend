import type { Meta, StoryObj } from '@storybook/react';
import {http, HttpResponse} from 'msw';
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
			http.post('/api/reminders/cancel', () => {
				return new HttpResponse(null, {
					status: 500,
				})
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
			http.post('/api/reminders/cancel', () => {
				return new HttpResponse(null, {
					status: 200,
				})
			}),
		],
	},
};

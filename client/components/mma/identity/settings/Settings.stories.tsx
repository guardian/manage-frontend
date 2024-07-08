import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { user } from '@/client/fixtures/user';
import { Settings } from './Settings';

export default {
	title: 'Pages/Settings',
	component: Settings,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Settings>;

export const Default: StoryObj<typeof Settings> = {
	render: () => {
		return <Settings />;
	},

	parameters: {
		msw: [
			http.get('/idapi/user', () => {
				return HttpResponse.json(user)
			}),
		],
	},
};

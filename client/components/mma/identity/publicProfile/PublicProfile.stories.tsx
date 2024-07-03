import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { user } from '@/client/fixtures/user';
import { PublicProfile } from './PublicProfile';

export default {
	title: 'Pages/Profile',
	component: PublicProfile,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof PublicProfile>;

export const Default: StoryObj<typeof PublicProfile> = {
	render: () => {
		return <PublicProfile />;
	},

	parameters: {
		msw: [
			http.get('/idapi/user', () => {
				return HttpResponse.json(user)
			}),
		],
	},
};

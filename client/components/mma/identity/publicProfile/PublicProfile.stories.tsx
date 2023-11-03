import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
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
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
		],
	},
};

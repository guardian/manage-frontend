import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
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
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
		],
	},
};

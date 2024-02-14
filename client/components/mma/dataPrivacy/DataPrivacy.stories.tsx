import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { consents } from '../../../fixtures/consents';
import { user } from '../../../fixtures/user';
import { DataPrivacy } from './DataPrivacy';

export default {
	title: 'Pages/DataPrivacy',
	component: DataPrivacy,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof DataPrivacy>;

export const Default: StoryObj<typeof DataPrivacy> = {
	render: () => {
		return <DataPrivacy />;
	},

	parameters: {
		msw: [
			rest.get('/idapi/consents', (_req, res, ctx) => {
				return res(ctx.json(consents));
			}),
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
		],
	},
};

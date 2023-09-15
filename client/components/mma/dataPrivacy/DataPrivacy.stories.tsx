import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
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
} as ComponentMeta<typeof DataPrivacy>;

export const Default: ComponentStory<typeof DataPrivacy> = () => {
	return <DataPrivacy />;
};

Default.parameters = {
	msw: [
		rest.get('idapicodeproxy/consents', (_req, res, ctx) => {
			return res(ctx.json(consents));
		}),
		rest.get('/idapi/user', (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
	],
};

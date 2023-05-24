import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import { user } from '../../../../fixtures/user';
import { Settings } from './Settings';

export default {
	title: 'Pages/Settings',
	component: Settings,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Settings>;

export const Default: ComponentStory<typeof Settings> = () => {
	return <Settings />;
};

Default.parameters = {
	msw: [
		rest.get('/idapi/user', (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
	],
};

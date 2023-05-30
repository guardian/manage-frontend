import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import { user } from '../../../../fixtures/user';
import { PublicProfile } from './PublicProfile';

export default {
	title: 'Pages/Profile',
	component: PublicProfile,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof PublicProfile>;

export const Default: ComponentStory<typeof PublicProfile> = () => {
	return <PublicProfile />;
};

Default.parameters = {
	msw: [
		rest.get('/idapi/user', (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
	],
};

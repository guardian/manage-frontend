import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
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
	fetchMock.restore().get('/idapi/user', { body: user });

	return <PublicProfile />;
};

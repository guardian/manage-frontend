import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import fetchMock from 'fetch-mock';

import PublicProfile from './';
import { user } from '../../../fixtures/user';

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

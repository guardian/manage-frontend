import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import fetchMock from 'fetch-mock';

import Settings from './';
import { user } from '../../../fixtures/user';

export default {
	title: 'Pages/Settings',
	component: Settings,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Settings>;

export const Default: ComponentStory<typeof Settings> = () => {
	fetchMock.restore().get('/idapi/user', { body: user });

	return <Settings />;
};

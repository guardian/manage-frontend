import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { user } from '../../../fixtures/user';
import Settings from './';

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

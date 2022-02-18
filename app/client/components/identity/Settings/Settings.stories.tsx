import { ComponentStory, ComponentMeta } from '@storybook/react';
import fetchMock from 'fetch-mock';

import Settings from './';
import { user } from '../../../fixtures/user';

export default {
	title: 'Pages/Settings',
	component: Settings,
	parameters: {
		controls: { disabled: true },
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Settings>;

export const Default: ComponentStory<typeof Settings> = () => {
	fetchMock.restore().get('/idapi/user', { body: user });

	return <Settings />;
};

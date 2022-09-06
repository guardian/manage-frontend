import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import fetchMock from 'fetch-mock';

import PublicProfile from './';
import { user } from '../../../fixtures/user';

export default {
	title: 'Pages/Profile',
	component: PublicProfile,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof PublicProfile>;

export const Default: ComponentStory<typeof PublicProfile> = () => {
	fetchMock.restore().get('/idapi/user', { body: user });

	return (
		<MemoryRouter>
			<PublicProfile />
		</MemoryRouter>
	);
};

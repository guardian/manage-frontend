import type { ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { consents } from '../../../fixtures/consents';
import { user } from '../../../fixtures/user';
import { DataPrivacy } from './DataPrivacy';

export const NoSubscription: ComponentStory<typeof DataPrivacy> = () => {
	fetchMock
		.restore()
		.get('/consents?filter=all', {
			body: consents,
		})
		.get('/idapi/user', { body: user });

	return <DataPrivacy />;
};

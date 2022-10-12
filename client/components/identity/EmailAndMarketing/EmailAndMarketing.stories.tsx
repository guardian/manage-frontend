import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { consents } from '../../../fixtures/consents';
import { newsletters } from '../../../fixtures/newsletters';
import { newsletterSubscriptions } from '../../../fixtures/newsletterSubscriptions';
import {
	digitalDD,
	guardianWeeklyCard,
	newspaperVoucherPaypal,
} from '../../../fixtures/productDetail';
import { user } from '../../../fixtures/user';
import EmailAndMarketing from './';

export default {
	title: 'Pages/EmailAndMarketing',
	component: EmailAndMarketing,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof EmailAndMarketing>;

export const Default: ComponentStory<typeof EmailAndMarketing> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
		})
		.get('/idapi/user', { body: user })
		.get('/idapicodeproxy/newsletters', { body: newsletters })
		.get('/idapicodeproxy/users/me/newsletters', {
			body: newsletterSubscriptions,
		})
		.get('/idapicodeproxy/consents?filter=all', { body: consents })
		.get('/api/reminders/status', { body: { recurringStatus: 'NotSet' } });

	return <EmailAndMarketing />;
};

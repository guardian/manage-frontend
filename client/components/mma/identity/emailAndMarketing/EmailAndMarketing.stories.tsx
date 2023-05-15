import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../../../shared/featureSwitches';
import { consents } from '../../../../fixtures/consents';
import { InAppPurchase } from '../../../../fixtures/inAppPurchase';
import { newsletters } from '../../../../fixtures/newsletters';
import { newsletterSubscriptions } from '../../../../fixtures/newsletterSubscriptions';
import {
	digitalDD,
	guardianWeeklyCard,
	newspaperVoucherPaypal,
	toMembersDataApiResponse,
} from '../../../../fixtures/productDetail';
import { user } from '../../../../fixtures/user';
import { EmailAndMarketing } from './EmailAndMarketing';

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
			body: toMembersDataApiResponse(
				guardianWeeklyCard,
				digitalDD,
				newspaperVoucherPaypal,
			),
		})
		.get('/idapi/user', { body: user })
		.get('/idapicodeproxy/newsletters', { body: newsletters })
		.get('/idapicodeproxy/users/me/newsletters', {
			body: newsletterSubscriptions,
		})
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/idapicodeproxy/consents?filter=all', { body: consents })
		.get('/api/reminders/status', { body: { recurringStatus: 'NotSet' } });

	return <EmailAndMarketing />;
};

export const WithNoProducts: ComponentStory<typeof EmailAndMarketing> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(),
		})
		.get('/idapi/user', { body: user })
		.get('/idapicodeproxy/newsletters', { body: newsletters })
		.get('/idapicodeproxy/users/me/newsletters', {
			body: newsletterSubscriptions,
		})
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/idapicodeproxy/consents?filter=all', { body: consents })
		.get('/api/reminders/status', { body: { recurringStatus: 'NotSet' } });

	return <EmailAndMarketing />;
};

export const WithIAP: ComponentStory<typeof EmailAndMarketing> = () => {
	featureSwitches['appSubscriptions'] = true;

	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(),
		})
		.get('/idapi/user', { body: user })
		.get('/idapicodeproxy/newsletters', { body: newsletters })
		.get('/idapicodeproxy/users/me/newsletters', {
			body: newsletterSubscriptions,
		})
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [InAppPurchase] },
		})
		.get('/idapicodeproxy/consents?filter=all', { body: consents })
		.get('/api/reminders/status', { body: { recurringStatus: 'NotSet' } });

	return <EmailAndMarketing />;
};

export const WithSingleContribution: ComponentStory<
	typeof EmailAndMarketing
> = () => {
	featureSwitches['singleContributions'] = true;

	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(),
		})
		.get('/idapi/user', { body: user })
		.get('/idapicodeproxy/newsletters', { body: newsletters })
		.get('/idapicodeproxy/users/me/newsletters', {
			body: newsletterSubscriptions,
		})
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [InAppPurchase] },
		})
		.get('/api/me/one-off-contributions', {
			body: { subscriptions: [InAppPurchase] },
		})
		.get('/idapicodeproxy/consents?filter=all', { body: consents })
		.get('/api/reminders/status', { body: { recurringStatus: 'NotSet' } });

	return <EmailAndMarketing />;
};

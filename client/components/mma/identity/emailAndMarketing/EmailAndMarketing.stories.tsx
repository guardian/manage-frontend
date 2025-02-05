import type { Meta, StoryObj } from '@storybook/react';
import {http, HttpResponse} from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { consents } from '@/client/fixtures/consents';
import { InAppPurchase } from '@/client/fixtures/inAppPurchase';
import { toMembersDataApiResponse } from '@/client/fixtures/mdapiResponse';
import { newsletters } from '@/client/fixtures/newsletters';
import { newsletterSubscriptions } from '@/client/fixtures/newsletterSubscriptions';
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyPaidByCard,
	newspaperVoucherPaidByPaypal,
} from '@/client/fixtures/productBuilder/testProducts';
import { singleContributionsAPIResponse } from '@/client/fixtures/singleContribution';
import { user } from '@/client/fixtures/user';
import { featureSwitches } from '@/shared/featureSwitches';
import { EmailAndMarketing } from './EmailAndMarketing';

export default {
	title: 'Pages/EmailAndMarketing',
	component: EmailAndMarketing,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof EmailAndMarketing>;

export const Default: StoryObj<typeof EmailAndMarketing> = {
	render: () => {
		return <EmailAndMarketing />;
	},

	parameters: {
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse(
					guardianWeeklyPaidByCard(),
					digitalPackPaidByDirectDebit(),
					newspaperVoucherPaidByPaypal(),
				))
			}),
			http.get('/idapi/user', () => {
				return HttpResponse.json(user)
			}),
			http.get('/idapi/newsletters', () => {
				return HttpResponse.json(newsletters)
			}),
			http.get('/idapi/user/newsletters', () => {
				return HttpResponse.json(newsletterSubscriptions)
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] })
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([])
			}),
			http.get('/idapi/consents', () => {
				return HttpResponse.json(consents)
			}),
			http.get('/api/reminders/status', () => {
				return HttpResponse.json({ recurringStatus: 'NotSet' })
			}),
		],
	},
};

export const WithNoProducts: StoryObj<typeof EmailAndMarketing> = {
	render: () => {
		return <EmailAndMarketing />;
	},

	parameters: {
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse())
			}),
			http.get('/idapi/user', () => {
				return HttpResponse.json(user)
			}),
			http.get('/idapi/newsletters', () => {
				return HttpResponse.json(newsletters)
			}),
			http.get('/idapi/user/newsletters', () => {
				return HttpResponse.json(newsletterSubscriptions)
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({subscriptions: []})
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([])
			}),
			http.get('/idapi/consents', () => {
				return HttpResponse.json(consents)
			}),
			http.get('/api/reminders/status', () => {
				return HttpResponse.json({ recurringStatus: 'NotSet' })
			}),
		],
	},
};

export const WithIAP: StoryObj<typeof EmailAndMarketing> = {
	render: () => {
		featureSwitches['appSubscriptions'] = true;

		return <EmailAndMarketing />;
	},

	parameters: {
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse())
			}),
			http.get('/idapi/user', () => {
				return HttpResponse.json(user)
			}),
			http.get('/idapi/newsletters', () => {
				return HttpResponse.json(newsletters)
			}),
			http.get('/idapi/user/newsletters', () => {
				return HttpResponse.json(newsletterSubscriptions)
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [InAppPurchase] })
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([])
			}),
			http.get('/idapi/consents', () => {
				return HttpResponse.json(consents)
			}),
			http.get('/api/reminders/status', () => {
				return HttpResponse.json({ recurringStatus: 'NotSet' })
			}),
		],
	},
};

export const WithSingleContribution: StoryObj<typeof EmailAndMarketing> = {
	render: () => {
		return <EmailAndMarketing />;
	},

	parameters: {
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse())
			}),
			http.get('/idapi/user', () => {
				return HttpResponse.json(user)
			}),
			http.get('/idapi/newsletters', () => {
				return HttpResponse.json(newsletters)
			}),
			http.get('/idapi/user/newsletters', () => {
				return HttpResponse.json(newsletterSubscriptions)
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] })
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json(singleContributionsAPIResponse)
			}),
			http.get('/idapi/consents', () => {
				return HttpResponse.json(consents)
			}),
			http.get('/api/reminders/status', () => {
				return HttpResponse.json({ recurringStatus: 'NotSet' })
			}),
		],
	},
};

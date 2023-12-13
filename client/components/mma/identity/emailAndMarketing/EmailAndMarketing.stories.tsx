import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
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
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							guardianWeeklyPaidByCard(),
							digitalPackPaidByDirectDebit(),
							newspaperVoucherPaidByPaypal(),
						),
					),
				);
			}),
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
			rest.get('/idapi/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletters));
			}),
			rest.get('/idapi/user/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletterSubscriptions));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/idapi/user/consents', (_req, res, ctx) => {
				return res(ctx.json(consents));
			}),
			rest.get('/api/reminders/status', (_req, res, ctx) => {
				return res(ctx.json({ recurringStatus: 'NotSet' }));
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
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(ctx.json(toMembersDataApiResponse()));
			}),
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
			rest.get('/idapi/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletters));
			}),
			rest.get('/idapi/user/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletterSubscriptions));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/idapi/user/consents', (_req, res, ctx) => {
				return res(ctx.json(consents));
			}),
			rest.get('/api/reminders/status', (_req, res, ctx) => {
				return res(ctx.json({ recurringStatus: 'NotSet' }));
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
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(ctx.json(toMembersDataApiResponse()));
			}),
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
			rest.get('/idapi/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletters));
			}),
			rest.get('/idapi/user/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletterSubscriptions));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [InAppPurchase] }));
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/idapi/user/consents', (_req, res, ctx) => {
				return res(ctx.json(consents));
			}),
			rest.get('/api/reminders/status', (_req, res, ctx) => {
				return res(ctx.json({ recurringStatus: 'NotSet' }));
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
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(ctx.json(toMembersDataApiResponse()));
			}),
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
			rest.get('/idapi/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletters));
			}),
			rest.get('/idapi/user/newsletters', (_req, res, ctx) => {
				return res(ctx.json(newsletterSubscriptions));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json(singleContributionsAPIResponse));
			}),
			rest.get('/idapi/user/consents', (_req, res, ctx) => {
				return res(ctx.json(consents));
			}),
			rest.get('/api/reminders/status', (_req, res, ctx) => {
				return res(ctx.json({ recurringStatus: 'NotSet' }));
			}),
		],
	},
};

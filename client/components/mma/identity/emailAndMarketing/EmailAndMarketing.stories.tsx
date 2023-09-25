import type { Meta , StoryFn } from '@storybook/react';
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

export const Default: StoryFn<typeof EmailAndMarketing> = () => {
	return <EmailAndMarketing />;
};

Default.parameters = {
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
};

export const WithNoProducts: StoryFn<typeof EmailAndMarketing> = () => {
	return <EmailAndMarketing />;
};

WithNoProducts.parameters = {
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
};

export const WithIAP: StoryFn<typeof EmailAndMarketing> = () => {
	featureSwitches['appSubscriptions'] = true;

	return <EmailAndMarketing />;
};

WithIAP.parameters = {
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
};

export const WithSingleContribution: StoryFn<typeof EmailAndMarketing> = () => {
	featureSwitches['singleContributions'] = true;

	return <EmailAndMarketing />;
};

WithSingleContribution.parameters = {
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
};

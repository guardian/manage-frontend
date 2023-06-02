import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
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
import { singleContributionsAPIResponse } from '../../../../fixtures/singleContribution';
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
	return <EmailAndMarketing />;
};

Default.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(
				ctx.json(
					toMembersDataApiResponse(
						guardianWeeklyCard,
						digitalDD,
						newspaperVoucherPaypal,
					),
				),
			);
		}),
		rest.get('/idapi/user', (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get('/idapicodeproxy/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletters));
		}),
		rest.get('/idapicodeproxy/users/me/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletterSubscriptions));
		}),
		rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
			return res(ctx.json({ subscriptions: [] }));
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
		rest.get('/idapicodeproxy/consents', (_req, res, ctx) => {
			return res(ctx.json(consents));
		}),
		rest.get('/api/reminders/status', (_req, res, ctx) => {
			return res(ctx.json({ recurringStatus: 'NotSet' }));
		}),
	],
};

export const WithNoProducts: ComponentStory<typeof EmailAndMarketing> = () => {
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
		rest.get('/idapicodeproxy/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletters));
		}),
		rest.get('/idapicodeproxy/users/me/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletterSubscriptions));
		}),
		rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
			return res(ctx.json({ subscriptions: [] }));
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
		rest.get('/idapicodeproxy/consents', (_req, res, ctx) => {
			return res(ctx.json(consents));
		}),
		rest.get('/api/reminders/status', (_req, res, ctx) => {
			return res(ctx.json({ recurringStatus: 'NotSet' }));
		}),
	],
};

export const WithIAP: ComponentStory<typeof EmailAndMarketing> = () => {
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
		rest.get('/idapicodeproxy/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletters));
		}),
		rest.get('/idapicodeproxy/users/me/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletterSubscriptions));
		}),
		rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
			return res(ctx.json({ subscriptions: [InAppPurchase] }));
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
		rest.get('/idapicodeproxy/consents', (_req, res, ctx) => {
			return res(ctx.json(consents));
		}),
		rest.get('/api/reminders/status', (_req, res, ctx) => {
			return res(ctx.json({ recurringStatus: 'NotSet' }));
		}),
	],
};

export const WithSingleContribution: ComponentStory<
	typeof EmailAndMarketing
> = () => {
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
		rest.get('/idapicodeproxy/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletters));
		}),
		rest.get('/idapicodeproxy/users/me/newsletters', (_req, res, ctx) => {
			return res(ctx.json(newsletterSubscriptions));
		}),
		rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
			return res(ctx.json({ subscriptions: [] }));
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json(singleContributionsAPIResponse));
		}),
		rest.get('/idapicodeproxy/consents', (_req, res, ctx) => {
			return res(ctx.json(consents));
		}),
		rest.get('/api/reminders/status', (_req, res, ctx) => {
			return res(ctx.json({ recurringStatus: 'NotSet' }));
		}),
	],
};

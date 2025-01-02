import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	cancelledContribution,
	cancelledGuardianWeekly,
} from '../../../fixtures/cancelledProductDetail';
import {
	CancelledInAppPurchase,
	InAppPurchaseIos,
	PuzzleAppPurchaseAndroid,
	PuzzleAppPurchaseIos,
} from '../../../fixtures/inAppPurchase';
import { toMembersDataApiResponse } from '../../../fixtures/mdapiResponse';
import {
	contributionCancelled,
	contributionPaidByPayPal,
	digitalPackPaidByDirectDebit,
	guardianWeeklyCancelled,
	guardianWeeklyGiftPurchase,
	guardianWeeklyGiftRecipient,
	guardianWeeklyPaidByCard,
	membershipSupporter,
	newspaperVoucherPaidByPaypal,
	patronMembership,
	supporterPlus,
	supporterPlusAnnualCancelled,
	supporterPlusCancelled,
	supporterPlusInOfferPeriod,
	supporterPlusUSA,
	tierThree,
} from '../../../fixtures/productBuilder/testProducts';
import { singleContributionsAPIResponse } from '../../../fixtures/singleContribution';
import { user } from '../../../fixtures/user';
import { AccountOverview } from './AccountOverview';

featureSwitches['appSubscriptions'] = true;

export default {
	title: 'Pages/AccountOverview',
	component: AccountOverview,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof AccountOverview>;

export const NoSubscription: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse());
			}),
			http.get('/idapi/user', () => {
				return HttpResponse.json(user);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyPaidByCard(),
						digitalPackPaidByDirectDebit(),
						newspaperVoucherPaidByPaypal(),
						membershipSupporter(),
						patronMembership(),
						supporterPlus(),
						tierThree(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithUSASubscription: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(supporterPlusUSA()),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithContributionAndSwitchPossible: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(contributionPaidByPayPal()),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithContributionInPaymentFailure: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						contributionPaymentFailure,
						supporterPlus(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

const contributionPaymentFailure = {
	...contributionPaidByPayPal(),
	alertText: 'Your payment has failed.',
};

export const WithContributionAndSwitchNotPossible: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						contributionPaidByPayPal(),
						digitalPackPaidByDirectDebit(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithCancelledSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([
					cancelledContribution,
					cancelledGuardianWeekly,
				]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						contributionCancelled(),
						guardianWeeklyCancelled(),
						supporterPlusCancelled(),
						supporterPlusAnnualCancelled(),
						tierThree(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithGiftSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyGiftRecipient(),
						guardianWeeklyGiftPurchase(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithAppSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({
					subscriptions: [
						CancelledInAppPurchase,
						InAppPurchaseIos,
						PuzzleAppPurchaseAndroid,
						PuzzleAppPurchaseIos,
					],
				});
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse());
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithSingleContribution: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse());
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json(singleContributionsAPIResponse);
			}),
		],
	},
};

export const WithSupporterPlusDuringOffer: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(supporterPlusInOfferPeriod()),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

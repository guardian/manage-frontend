import type { Meta, StoryObj } from '@storybook/react';
import type { HttpResponseResolver } from 'msw';
import { http, HttpResponse } from 'msw';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	cancelledContribution,
	cancelledGuardianAdLite,
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
	guardianAdLite,
	guardianAdLiteCancelled,
	guardianWeeklyCancelled,
	guardianWeeklyGiftPurchase,
	guardianWeeklyPaidByCard,
	homeDelivery,
	homeDeliverySaturdayPlus,
	membershipSupporter,
	nationalDelivery,
	nationalDeliveryPlus,
	newspaperDigitalVoucherObserver,
	newspaperDigitalVoucherPaidByPaypal,
	newspaperdigitalVoucherPlusPaidByCard,
	observerDelivery,
	observerVoucherPaidByCard,
	patronMembership,
	secondaryDigitalPackSharedMembership,
	supporterPlus,
	supporterPlusAnnualCancelled,
	supporterPlusCancelled,
	supporterPlusInOfferPeriod,
	supporterPlusUSA,
	tierThree,
	voucherPaidByCard,
	voucherPlusPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import { singleContributionsAPIResponse } from '../../../fixtures/singleContribution';
import { user } from '../../../fixtures/user';
import { AccountOverview } from './AccountOverview';

featureSwitches['appSubscriptions'] = true;

// @ts-expect-error body and respose params have implicit any types
const networkErrStatusResolver: HttpResponseResolver = (req, res, ctx) =>
	res(
		ctx.status(503),
		ctx.json({
			errorMessage: 'Server is unavailable',
		}),
	);

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
						secondaryDigitalPackSharedMembership(),
						newspaperDigitalVoucherPaidByPaypal(),
						newspaperdigitalVoucherPlusPaidByCard(),
						membershipSupporter(),
						patronMembership(),
						secondaryDigitalPackSharedMembership(), // TODO move to a different api call
						supporterPlus(),
						tierThree(),
						homeDelivery(),
						homeDeliverySaturdayPlus(),
						voucherPaidByCard(),
						voucherPlusPaidByCard(),
						observerDelivery(),
						newspaperDigitalVoucherObserver(),
						nationalDelivery(),
						nationalDeliveryPlus(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const WithOnlyObserverSubscriptions: StoryObj<typeof AccountOverview> = {
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
						newspaperDigitalVoucherObserver(),
						observerDelivery(),
						observerVoucherPaidByCard(),
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
					cancelledGuardianAdLite,
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
						guardianAdLiteCancelled(),
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
					toMembersDataApiResponse(guardianWeeklyGiftPurchase()),
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

const DigitalPlusUpgradeBannerFlagDecorator = (Story: () => ReactElement) => {
	const flagParam = 'DIGITAL_PLUS_UPGRADE_BANNER_SHOW';
	const url = new URL(window.location.href);
	if (url.searchParams.get(flagParam) !== 'true') {
		url.searchParams.set(flagParam, 'true');
		window.history.replaceState({}, '', url);
	}

	useEffect(() => {
		return () => {
			const cleanupUrl = new URL(window.location.href);
			cleanupUrl.searchParams.delete(flagParam);
			window.history.replaceState({}, '', cleanupUrl);
		};
	}, []);

	return <Story />;
};

export const WithAllAccessDigitalDiscount: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	decorators: [DigitalPlusUpgradeBannerFlagDecorator],

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
					toMembersDataApiResponse(supporterPlus()),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
			http.get('/api/user-subscriptions/me', () => {
				return HttpResponse.json({
					subscriptions: [
						{
							name: supporterPlus().subscription.subscriptionId,
							productKey: 'SupporterPlus',
							productRatePlanKey: 'Annual',
							availableActions: [
								{
									action: 'upsell',
									target: {
										productKey: 'DigitalSubscription',
										productRatePlanKey: 'Annual',
									},
								},
								{ action: 'cancel' },
							],
						},
					],
				});
			}),
		],
	},
};

export const WithGuardianAdLite: StoryObj<typeof AccountOverview> = {
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
					toMembersDataApiResponse(guardianAdLite()),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};

export const MpapiRequestFailure: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyPaidByCard(),
						digitalPackPaidByDirectDebit(),
						newspaperDigitalVoucherPaidByPaypal(),
						membershipSupporter(),
						patronMembership(),
						supporterPlus(),
						tierThree(),
						homeDeliverySaturdayPlus(),
						voucherPaidByCard(),
						observerDelivery(),
						newspaperDigitalVoucherObserver(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),

			http.get(
				'/mpapi/user/mobile-subscriptions',
				networkErrStatusResolver,
			),
		],
	},
};

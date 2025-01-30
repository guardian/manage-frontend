import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { toMembersDataApiResponse } from '@/client/fixtures/mdapiResponse';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	contributionCancelled,
	contributionPaidByCard,
	contributionPaidByPayPal,
	guardianAdLite,
	guardianAdLiteCancelled,
	guardianWeeklyPaidByCard,
	supporterPlus,
	supporterPlusAnnual,
	supporterPlusCancelled,
	supporterPlusMonthlyAllAccessDigital,
} from '../../../fixtures/productBuilder/testProducts';
import { CancellationContainer } from './CancellationContainer';
import { CancellationReasonReview } from './CancellationReasonReview';
import { CancellationReasonSelection } from './CancellationReasonSelection';
import { CancelAlternativeConfirmed } from './cancellationSaves/CancelAlternativeConfirmed';
import { CancelAlternativeOffer } from './cancellationSaves/CancelAlternativeOffer';
import { CancelAlternativeReview } from './cancellationSaves/CancelAlternativeReview';
import { contributionsCancellationReasons } from './contributions/ContributionsCancellationReasons';
import { gwCancellationReasons } from './gw/GwCancellationReasons';
import { ConfirmCancellation } from './stages/ConfirmCancellation';
import { ExecuteCancellation } from './stages/ExecuteCancellation';
import { otherCancellationReason } from './supporterplus/SupporterplusCancellationReasons';

const contributions = PRODUCT_TYPES.contributions;
contributions.cancellation!.reasons = contributionsCancellationReasons.concat(
	otherCancellationReason,
);

const guardianweekly = PRODUCT_TYPES.guardianweekly;
guardianweekly.cancellation!.reasons = gwCancellationReasons.concat(
	otherCancellationReason,
);

const supporterplus = PRODUCT_TYPES.supporterplus;
supporterplus.cancellation!.reasons = supporterplusCancellationReasons.concat(
	otherCancellationReason,
);

export default {
	title: 'Pages/Cancellation',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: { productDetail: contributionPaidByPayPal() },
		},
	},
} as Meta<typeof CancellationContainer>;

export const SelectReason: StoryObj<typeof CancellationReasonSelection> = {
	render: () => <CancellationReasonSelection />,

	parameters: {
		reactRouter: {
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
		},
	},
};

export const ContactCustomerService: StoryObj<
	typeof CancellationReasonSelection
> = {
	render: () => <CancellationReasonSelection />,

	parameters: {
		reactRouter: {
			state: { productDetail: guardianWeeklyPaidByCard() },
			container: <CancellationContainer productType={guardianweekly} />,
		},
	},
};

export const Review: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancellationReasonReview />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
		],
		reactRouter: {
			state: {
				productDetail: contributionPaidByPayPal(),
				selectedReasonId: 'mma_editorial',
				cancellationPolicy: 'Today',
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
		},
	},
};

export const ReviewWithReduceAmount: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancellationReasonReview />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
		],
		reactRouter: {
			state: {
				productDetail: contributionPaidByPayPal(),
				selectedReasonId: 'mma_financial_circumstances',
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
		},
	},
};

export const ReviewGuardianAdLite: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <ConfirmCancellation />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: guardianAdLite(),
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.guardianadlite}
				/>
			),
		},
	},
};

export const ConfirmationGuardianAdLite: StoryObj<typeof ExecuteCancellation> =
	{
		render: () => {
			// @ts-expect-error set identity details email in the window
			window.guardian = { identityDetails: { email: 'test' } };
			return <ExecuteCancellation />;
		},
		parameters: {
			msw: [
				http.patch('/api/case/**', () => {
					return HttpResponse.json({ id: 'caseId' });
				}),
				http.get('/api/me/mma/**', () => {
					return HttpResponse.json(
						toMembersDataApiResponse(guardianAdLiteCancelled()),
					);
				}),
				http.post('/api/cancel/**', () => {
					return new HttpResponse(null, {
						status: 201,
					});
				}),
			],
			reactRouter: {
				state: {
					productDetail: guardianAdLite(),
					selectedReasonId: '1',
					caseId: 'caseId',
				},
				container: (
					<CancellationContainer
						productType={PRODUCT_TYPES.guardianadlite}
					/>
				),
			},
		},
	};

export const OfferMonthly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeOffer />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
		],
		reactRouter: {
			state: {
				productDetail: supporterPlusMonthlyAllAccessDigital(),
				discountedPrice: 0,
				discountPercentage: 100,
				upToPeriods: 2,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: <CancellationContainer productType={supporterplus} />,
		},
	},
};

export const OfferYearly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeOffer />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
		],
		reactRouter: {
			state: {
				productDetail: supporterPlusAnnual(),
				discountedPrice: 90,
				discountPercentage: 25,
				upToPeriods: 12,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2025-05-30',
				nonDiscountedPayments: [{ date: '2025-05-30', amount: 120 }],
			},
			container: <CancellationContainer productType={supporterplus} />,
		},
	},
};

export const OfferReviewMonthly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeReview />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: supporterPlusMonthlyAllAccessDigital(),
				discountedPrice: 0,
				discountPercentage: 100,
				upToPeriods: 2,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: <CancellationContainer productType={supporterplus} />,
		},
		msw: [
			http.post('/api/discounts/apply-discount', () => {
				return new HttpResponse(null, {
					status: 201,
				});
			}),
		],
	},
};

export const OfferReviewYearly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeReview />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: supporterPlusAnnual(),
				discountedPrice: 90,
				discountPercentage: 25,
				upToPeriods: 12,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2025-05-30',
				nonDiscountedPayments: [{ date: '2025-05-30', amount: 120 }],
			},
			container: <CancellationContainer productType={supporterplus} />,
		},
		msw: [
			http.post('/api/discounts/apply-discount', () => {
				return new HttpResponse(null, {
					status: 201,
				});
			}),
		],
	},
};

export const OfferConfirmedMonthly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeConfirmed />;
	},
	parameters: {
		reactRouter: {
			state: {
				upToPeriods: 2,
				upToPeriodsType: 'months',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: <CancellationContainer productType={supporterplus} />,
		},
	},
};

export const OfferConfirmedYearly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeConfirmed />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: supporterPlusAnnual(),
				upToPeriods: 12,
				upToPeriodsType: 'months',
				discountPercentage: 25,
				discountedPrice: 90,
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2025-05-30',
				nonDiscountedPayments: [{ date: '2025-05-30', amount: 120 }],
			},
			container: <CancellationContainer productType={supporterplus} />,
		},
	},
};

export const Pause: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeOffer />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
		],
		reactRouter: {
			state: {
				discountedPrice: 0,
				discountPercentage: 100,
				upToPeriods: 2,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: <CancellationContainer productType={contributions} />,
		},
	},
};

export const PauseReview: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeReview />;
	},

	parameters: {
		reactRouter: {
			state: {
				discountedPrice: 0,
				discountPercentage: 100,
				upToPeriods: 2,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: <CancellationContainer productType={contributions} />,
		},
		msw: [
			http.post('/api/discounts/apply-discount', () => {
				return new HttpResponse(null, {
					status: 201,
				});
			}),
		],
	},
};

export const PauseConfirmed: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeConfirmed />;
	},
	parameters: {
		reactRouter: {
			state: {
				upToPeriods: 2,
				upToPeriodsType: 'months',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: <CancellationContainer productType={contributions} />,
		},
	},
};

export const SupportplusCancelConfirm: StoryObj<typeof CancellationContainer> =
	{
		render: () => {
			return <ConfirmCancellation />;
		},
		parameters: {
			reactRouter: {
				state: {
					productDetail: supporterPlusMonthlyAllAccessDigital(),
					eligibleForFreePeriodOffer: true,
					discountedPrice: 0,
					upToPeriods: 2,
					upToPeriodsType: 'months',
					firstDiscountedPaymentDate: '2024-05-30',
					nextNonDiscountedPaymentDate: '2024-07-30',
					nonDiscountedPayments: [
						{ date: '2024-07-30', amount: 14.99 },
					],
				},
				container: (
					<CancellationContainer
						productType={PRODUCT_TYPES.supporterplus}
					/>
				),
			},
		},
	};

export const ConfirmationContribution: StoryObj<typeof ExecuteCancellation> = {
	render: () => {
		// @ts-expect-error set identity details email in the window
		window.guardian = { identityDetails: { email: 'test' } };
		return <ExecuteCancellation />;
	},
	parameters: {
		msw: [
			http.patch('/api/case/**', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
			http.get('/api/me/mma/**', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(contributionCancelled()),
				);
			}),
			http.post('/api/cancel/**', () => {
				return new HttpResponse(null, {
					status: 201,
				});
			}),
		],
		reactRouter: {
			state: {
				productDetail: contributionPaidByCard(),
				selectedReasonId: '1',
				caseId: 'caseId',
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
		},
	},
};

export const ConfirmationContributionWithPause: StoryObj<
	typeof ExecuteCancellation
> = {
	render: () => {
		// @ts-expect-error set identity details email in the window
		window.guardian = { identityDetails: { email: 'test' } };
		return <ExecuteCancellation />;
	},
	parameters: {
		msw: [
			http.patch('/api/case/**', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
			http.get('/api/me/mma/**', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(contributionCancelled()),
				);
			}),
			http.post('/api/cancel/**', () => {
				return new HttpResponse(null, {
					status: 201,
				});
			}),
		],
		reactRouter: {
			state: {
				productDetail: contributionPaidByCard(),
				eligibleForPause: true,
				selectedReasonId: '1',
				caseId: 'caseId',
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
		},
	},
};

export const ConfirmationSupporterPlusWithOffer: StoryObj<
	typeof ExecuteCancellation
> = {
	render: () => {
		// @ts-expect-error set identity details email in the window
		window.guardian = { identityDetails: { email: 'test' } };
		return <ExecuteCancellation />;
	},
	parameters: {
		msw: [
			http.patch('/api/case/**', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
			http.get('/api/me/mma/**', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(supporterPlusCancelled()),
				);
			}),
			http.post('/api/cancel/**', () => {
				return new HttpResponse(null, {
					status: 201,
				});
			}),
		],
		reactRouter: {
			state: {
				productDetail: supporterPlus(),
				eligibleForOffer: true,
				selectedReasonId: '1',
				caseId: 'caseId',
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.supporterplus}
				/>
			),
		},
	},
};

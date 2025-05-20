import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { toMembersDataApiResponse } from '@/client/fixtures/mdapiResponse';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	annualContributionPaidByCardUSA,
	annualContributionPaidByCardWithCurrency,
	contributionCancelled,
	contributionPaidByCard,
	contributionPaidByPayPal,
	guardianAdLite,
	guardianAdLiteCancelled,
	guardianAdLiteInTrialPeriod,
	guardianWeeklyPaidByCard,
	supporterPlus,
	supporterPlusAnnual,
	supporterPlusCancelled,
	supporterPlusMonthlyAllAccessDigital,
} from '../../../fixtures/productBuilder/testProducts';
import { CancellationContainer } from './CancellationContainer';
import { CancellationJourneyFunnel } from './CancellationJourneyFunnel';
import { CancellationReasonReview } from './CancellationReasonReview';
import { CancellationReasonSelection } from './CancellationReasonSelection';
import { CancelAlternativeConfirmed } from './cancellationSaves/CancelAlternativeConfirmed';
import { CancelAlternativeContactUs } from './cancellationSaves/CancelAlternativeContactUs';
import { CancelAlternativeOffer } from './cancellationSaves/CancelAlternativeOffer';
import { CancelAlternativeReview } from './cancellationSaves/CancelAlternativeReview';
import { CancelAlternativeSwitch } from './cancellationSaves/CancelAlternativeSwitch';
import { CancelAlternativeSwitchReview } from './cancellationSaves/CancelAlternativeSwitchReview';
import { CancelSwitchConfirmed } from './cancellationSaves/CancelSwitchConfirmed';
import { ConfirmCancellation } from './stages/ConfirmCancellation';
import { ExecuteCancellation } from './stages/ExecuteCancellation';

const contributionWithSortedReasons = PRODUCT_TYPES.contributions;
contributionWithSortedReasons.cancellation!.reasons?.sort((a, b) =>
	a.reasonId.localeCompare(b.reasonId),
);

export default {
	title: 'Pages/Cancellation',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof CancellationContainer>;

export const SelectReason: StoryObj<typeof CancellationReasonSelection> = {
	render: () => <CancellationReasonSelection />,

	parameters: {
		reactRouter: {
			state: { productDetail: contributionPaidByPayPal() },
			container: (
				<CancellationContainer
					productType={contributionWithSortedReasons}
				/>
			),
		},
	},
};

export const ContactCustomerService: StoryObj<typeof CancellationContainer> = {
	render: () => <CancellationJourneyFunnel />,

	parameters: {
		reactRouter: {
			state: { productDetail: guardianWeeklyPaidByCard() },
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.guardianweekly}
				/>
			),
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

export const ReviewGuardianAdLiteInTrialPeriod: StoryObj<
	typeof CancellationContainer
> = {
	render: () => {
		return <ConfirmCancellation />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: guardianAdLiteInTrialPeriod(),
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.guardianadlite}
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
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.supporterplus}
				/>
			),
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
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.supporterplus}
				/>
			),
		},
	},
};

export const SwitchYearly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeSwitch />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
		],
		reactRouter: {
			state: {
				productDetail: annualContributionPaidByCardWithCurrency(
					'GBP',
					'United Kingdom',
					6000,
				),
				selectedReasonId: 'mma_break_from_news',
				supporterPlusPurchaseAmount: 120,
				nextPaymentDate: '2025-05-30',
				amountPayableToday: 58.39,
				contributionRefundAmount: -1.61,
				discount: {
					discountedPrice: 60,
					discountPercentage: 50,
					upToPeriods: 1,
					upToPeriodsType: 'Years',
				},
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
		},
	},
};

export const SwitchYearlyOutsideUK: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeSwitch />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' });
			}),
		],
		reactRouter: {
			state: {
				productDetail: annualContributionPaidByCardUSA(6000),
				supporterPlusPurchaseAmount: 120,
				nextPaymentDate: '2025-05-30',
				amountPayableToday: 58.39,
				contributionRefundAmount: -1.61,
				discount: {
					discountedPrice: 60,
					discountPercentage: 50,
					upToPeriods: 1,
					upToPeriodsType: 'Years',
				},
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
		},
	},
};

export const SwitchContactUs: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeContactUs />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: annualContributionPaidByCardWithCurrency(
					'GBP',
					'United Kingdom',
					6000,
				),
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
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
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.supporterplus}
				/>
			),
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
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.supporterplus}
				/>
			),
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

export const SwitchReviewYearly: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeSwitchReview />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: annualContributionPaidByCardWithCurrency(
					'GBP',
					'United Kingdom',
					6000,
				),
				supporterPlusPurchaseAmount: 120,
				nextPaymentDate: '2025-05-30',
				amountPayableToday: 58.39,
				contributionRefundAmount: -1.61,
				discount: {
					discountedPrice: 60,
					discountPercentage: 50,
					upToPeriods: 1,
					upToPeriodsType: 'Years',
				},
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
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
				productDetail: contributionPaidByPayPal(),
				upToPeriods: 2,
				upToPeriodsType: 'months',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.supporterplus}
				/>
			),
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
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.supporterplus}
				/>
			),
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
				productDetail: contributionPaidByPayPal(),
				discountedPrice: 0,
				discountPercentage: 100,
				upToPeriods: 2,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
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
				productDetail: contributionPaidByPayPal(),
				discountedPrice: 0,
				discountPercentage: 100,
				upToPeriods: 2,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
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
				productDetail: contributionPaidByPayPal(),
				upToPeriods: 2,
				upToPeriodsType: 'months',
				nextNonDiscountedPaymentDate: '2024-07-30',
				nonDiscountedPayments: [{ date: '2024-07-30', amount: 14.99 }],
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			),
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

export const SwitchYearlyConfirmed: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelSwitchConfirmed />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: annualContributionPaidByCardWithCurrency(
					'GBP',
					'United Kingdom',
					6000,
				),
				supporterPlusPurchaseAmount: 120,
				nextPaymentDate: '2025-05-30',
				amountPayableToday: 58.39,
				contributionRefundAmount: -1.61,
				discount: {
					discountedPrice: 60,
					discountPercentage: 50,
					upToPeriods: 1,
					upToPeriodsType: 'Years',
				},
			},
			container: (
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
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

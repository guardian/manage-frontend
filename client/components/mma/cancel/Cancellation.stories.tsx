import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	contributionCancelled,
	contributionPaidByPayPal,
	guardianWeeklyPaidByCard,
	supporterPlusCancelled,
	supporterPlusMonthlyAllAccessDigital,
} from '../../../fixtures/productBuilder/testProducts';
import { CancellationContainer } from './CancellationContainer';
import { CancellationReasonReview } from './CancellationReasonReview';
import { CancellationReasonSelection } from './CancellationReasonSelection';
import { CancelAlternativeConfirmed } from './cancellationSaves/CancelAlternativeConfirmed';
import { CancelAlternativeOffer } from './cancellationSaves/CancelAlternativeOffer';
import { CancelAlternativeReview } from './cancellationSaves/CancelAlternativeReview';
import { getCancellationSummary } from './CancellationSummary';
import { contributionsCancellationReasons } from './contributions/ContributionsCancellationReasons';
import { ConfirmCancellation } from './stages/ConfirmCancellation';
import { getCancellationSummaryWithReturnButton } from './stages/ExecuteCancellation';
import { otherCancellationReason } from './supporterplus/SupporterplusCancellationReasons';

const contributions = PRODUCT_TYPES.contributions;
contributions.cancellation!.reasons = contributionsCancellationReasons.concat(
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
			container: <CancellationContainer productType={contributions} />,
		},
	},
} as Meta<typeof CancellationContainer>;

export const SelectReason: StoryFn<typeof CancellationReasonSelection> = () => {
	return <CancellationReasonSelection />;
};

export const ContactCustomerService: StoryObj<
	typeof CancellationReasonSelection
> = {
	render: () => <CancellationReasonSelection />,

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
		},
	},
};

export const Offer: StoryObj<typeof CancellationContainer> = {
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

export const OfferReview: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <CancelAlternativeReview />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: supporterPlusMonthlyAllAccessDigital(),
				discountedPrice: 0,
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

export const OfferConfirmed: StoryObj<typeof CancellationContainer> = {
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
				discountedPrice: 0,
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
				discountedPrice: 0,
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
			},
		},
	};

export const ConfirmationContribution: StoryFn<
	typeof CancellationContainer
> = () => {
	// @ts-expect-error set identity details email in the window
	window.guardian = { identityDetails: { email: 'test' } };

	return getCancellationSummary(
		PRODUCT_TYPES.contributions,
		contributionCancelled(),
	);
};

export const ConfirmationContributionWithPause: StoryFn<
	typeof CancellationContainer
> = () => {
	// @ts-expect-error set identity details email in the window
	window.guardian = { identityDetails: { email: 'test' } };

	const eligibleForOffer = false;
	const eligibleForPause = true;

	return (
		<>
			{getCancellationSummaryWithReturnButton(
				getCancellationSummary(
					PRODUCT_TYPES.contributions,
					contributionCancelled(),
					eligibleForOffer,
					eligibleForPause,
				),
			)()}
		</>
	);
};

export const ConfirmationSupporterPlusWithOffer: StoryFn<
	typeof CancellationContainer
> = () => {
	// @ts-expect-error set identity details email in the window
	window.guardian = { identityDetails: { email: 'test' } };

	const eligibleForOffer = true;
	const eligibleForPause = false;

	return (
		<>
			{getCancellationSummaryWithReturnButton(
				getCancellationSummary(
					PRODUCT_TYPES.supporterplus,
					supporterPlusCancelled(),
					eligibleForOffer,
					eligibleForPause,
				),
			)()}
		</>
	);
};

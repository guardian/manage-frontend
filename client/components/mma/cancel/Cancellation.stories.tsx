import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import {http, HttpResponse} from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	contributionCancelled,
	contributionPaidByPayPal,
	guardianWeeklyPaidByCard,
	supporterPlusMonthlyAllAccessDigital,
} from '../../../fixtures/productBuilder/testProducts';
import { CancellationContainer } from './CancellationContainer';
import { CancellationReasonReview } from './CancellationReasonReview';
import { CancellationReasonSelection } from './CancellationReasonSelection';
import { SupporterPlusOffer } from './cancellationSaves/supporterplus/SupporterPlusOffer';
import { SupporterPlusOfferConfirmed } from './cancellationSaves/supporterplus/SupporterPlusOfferConfirmed';
import { SupporterPlusOfferReview } from './cancellationSaves/supporterplus/SupporterPlusOfferReview';
import { getCancellationSummary } from './CancellationSummary';
import { contributionsCancellationReasons } from './contributions/ContributionsCancellationReasons';
import { ConfirmCancellation } from './stages/ConfirmCancellation';
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
				return HttpResponse.json({ id: 'caseId' })
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
		return <SupporterPlusOffer />;
	},

	parameters: {
		msw: [
			http.post('/api/case', () => {
				return HttpResponse.json({ id: 'caseId' })
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
			},
		},
	},
};

export const OfferReview: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <SupporterPlusOfferReview />;
	},

	parameters: {
		reactRouter: {
			state: {
				discountedPrice: 0,
				upToPeriods: 2,
				upToPeriodsType: 'months',
				firstDiscountedPaymentDate: '2024-05-30',
				nextNonDiscountedPaymentDate: '2024-07-30',
			},
		},
		msw: [
			http.post('/api/discounts/apply-discount', () => {
				return new HttpResponse(null, {
					status: 201,
				})
			}),
		],
	},
};

export const OfferConfirmed: StoryObj<typeof CancellationContainer> = {
	render: () => {
		return <SupporterPlusOfferConfirmed />;
	},
	parameters: {
		reactRouter: {
			state: {
				nextNonDiscountedPaymentDate: '2024-07-30',
			},
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
				},
			},
		},
	};

export const Confirmation: StoryFn<typeof CancellationContainer> = () => {
	// @ts-expect-error set identity details email in the window
	window.guardian = { identityDetails: { email: 'test' } };

	return getCancellationSummary(
		PRODUCT_TYPES.contributions,
		contributionCancelled(),
	)(contributionCancelled());
};

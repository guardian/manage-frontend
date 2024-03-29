import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	contributionCancelled,
	contributionPaidByPayPal,
	guardianWeeklyPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import { CancellationContainer } from './CancellationContainer';
import { CancellationReasonReview } from './CancellationReasonReview';
import { CancellationReasonSelection } from './CancellationReasonSelection';
import { getCancellationSummary } from './CancellationSummary';
import { contributionsCancellationReasons } from './contributions/ContributionsCancellationReasons';
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
			rest.post('/api/case', (_req, res, ctx) => {
				return res(ctx.json({ id: 'caseId' }));
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

export const Confirmation: StoryFn<typeof CancellationContainer> = () => {
	// @ts-expect-error set identity details email in the window
	window.guardian = { identityDetails: { email: 'test' } };

	return getCancellationSummary(
		PRODUCT_TYPES.contributions,
		contributionCancelled(),
	)(contributionCancelled());
};

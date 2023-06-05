import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	contributionPaidByPayPal,
	guardianWeeklyPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import { contributionCancelled } from '../../../fixtures/productDetail';
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
} as ComponentMeta<typeof CancellationContainer>;

export const SelectReason: ComponentStory<
	typeof CancellationReasonSelection
> = () => {
	return <CancellationReasonSelection />;
};

export const ContactCustomerService: ComponentStory<
	typeof CancellationReasonSelection
> = () => <CancellationReasonSelection />;

ContactCustomerService.parameters = {
	reactRouter: {
		state: { productDetail: guardianWeeklyPaidByCard() },
		container: (
			<CancellationContainer productType={PRODUCT_TYPES.guardianweekly} />
		),
	},
};

export const Review: ComponentStory<typeof CancellationContainer> = () => {
	return <CancellationReasonReview />;
};

Review.parameters = {
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
};

export const Confirmation: ComponentStory<
	typeof CancellationContainer
> = () => {
	// @ts-expect-error set identity details email in the window
	window.guardian = { identityDetails: { email: 'test' } };

	return getCancellationSummary(
		PRODUCT_TYPES.contributions,
		contributionCancelled,
	)(contributionCancelled);
};

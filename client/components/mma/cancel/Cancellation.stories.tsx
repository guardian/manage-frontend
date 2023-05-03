import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	contributionCancelled,
	contributionPayPal,
	guardianWeeklyCard,
} from '../../../fixtures/productDetail';
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
			state: { productDetail: contributionPayPal },
			container: <CancellationContainer productType={contributions} />,
		},
	},
} as ComponentMeta<typeof CancellationContainer>;

export const SelectReason: ComponentStory<
	typeof CancellationReasonSelection
> = () => {
	fetchMock.restore().get('glob:/api/cancellation-date/*', {
		body: { cancellationEffectiveDate: '2022-09-01' },
	});

	return <CancellationReasonSelection />;
};

export const ContactCustomerService: ComponentStory<
	typeof CancellationReasonSelection
> = () => <CancellationReasonSelection />;

ContactCustomerService.parameters = {
	reactRouter: {
		state: { productDetail: guardianWeeklyCard },
		container: (
			<CancellationContainer productType={PRODUCT_TYPES.guardianweekly} />
		),
	},
};

export const Review: ComponentStory<typeof CancellationContainer> = () => {
	fetchMock.restore().post('/api/case', { body: { id: 'caseId' } });

	return <CancellationReasonReview />;
};

Review.parameters = {
	reactRouter: {
		state: {
			productDetail: contributionPayPal,
			selectedReasonId: 'mma_editorial',
			cancellationPolicy: 'Today',
		},
	},
};

export const Confirmation: ComponentStory<
	typeof CancellationContainer
> = () => {
	window.guardian.identityDetails.email = 'test';

	return getCancellationSummary(
		PRODUCT_TYPES.contributions,
		contributionCancelled,
	)(contributionCancelled);
};

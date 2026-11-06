import type { Meta } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { guardianWeeklyPaidByCard } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	confirmedStory,
	escalatedStory,
	pauseStory,
	reasonsStory,
	reviewStory,
	withReader,
} from './printCancellationStory';

const weekly = guardianWeeklyPaidByCard();

const product = {
	productType: PRODUCT_TYPES.guardianweekly,
	productDetail: withReader(weekly, 'United Kingdom'),
};

const unitedStates = {
	productType: PRODUCT_TYPES.guardianweekly,
	productDetail: withReader(weekly, 'United States'),
};

const australia = {
	productType: PRODUCT_TYPES.guardianweekly,
	productDetail: withReader(weekly, 'Australia'),
};

export default {
	title: 'Pages/Cancellation/Print/Guardian Weekly',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof CancellationContainer>;

export const Reasons = reasonsStory(product);
export const Pause = pauseStory(product, 'Pause, United Kingdom');
export const PauseUnitedStates = pauseStory(
	unitedStates,
	'Pause, United States and Canada',
);
export const PauseAustralia = pauseStory(
	australia,
	'Pause, Australia, New Zealand and Asia',
);
export const ReviewSoft = reviewStory(product, 'soft');
export const ReviewHard = reviewStory(product, 'hard');
export const ReviewHardWithCredit = reviewStory(product, 'hardWithCredit');
export const ConfirmedSoft = confirmedStory(product, 'soft');
export const ConfirmedHard = confirmedStory(product, 'hard');
export const ConfirmedEscalated = escalatedStory(product);

import { guardianWeeklyPaidByCard } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	confirmedStory,
	escalatedStory,
	pauseStory,
	printCancellationMeta,
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

export default printCancellationMeta(
	'Pages/Cancellation/Print/Guardian Weekly',
);

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

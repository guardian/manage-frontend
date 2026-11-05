import { newspaperDigitalVoucherPaidByPaypal } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	confirmedStory,
	pauseStory,
	printCancellationMeta,
	reasonsStory,
	reviewStory,
	withReader,
} from './printCancellationStory';

const product = {
	productType: PRODUCT_TYPES.digitalvoucher,
	productDetail: withReader(
		newspaperDigitalVoucherPaidByPaypal(),
		'United Kingdom',
	),
};

export default printCancellationMeta(
	'Pages/Cancellation/Print/Subscription card',
);

export const Reasons = reasonsStory(product);
export const Pause = pauseStory(product);
export const ReviewSoft = reviewStory(product, 'soft');
export const ReviewHard = reviewStory(product, 'hard');
export const ReviewHardWithCredit = reviewStory(product, 'hardWithCredit');
export const ConfirmedSoft = confirmedStory(product, 'soft');
export const ConfirmedHard = confirmedStory(product, 'hard');

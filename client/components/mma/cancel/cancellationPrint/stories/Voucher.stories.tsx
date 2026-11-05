import { voucherPaidByCard } from '@/client/fixtures/productBuilder/testProducts';
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
	productType: PRODUCT_TYPES.voucher,
	productDetail: withReader(voucherPaidByCard(), 'United Kingdom'),
};

export default printCancellationMeta('Pages/Cancellation/Print/Voucher');

export const Reasons = reasonsStory(product);
export const Pause = pauseStory(product);
export const ReviewSoft = reviewStory(product, 'soft');
export const ReviewHard = reviewStory(product, 'hard');
export const ReviewHardWithCredit = reviewStory(product, 'hardWithCredit');
export const ConfirmedSoft = confirmedStory(product, 'soft');
export const ConfirmedHard = confirmedStory(product, 'hard');

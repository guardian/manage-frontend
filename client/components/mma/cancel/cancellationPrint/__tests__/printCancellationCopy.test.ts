import type { ProductDetail, ProductTier } from '@/shared/productResponse';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	getAlternativesCopy,
	getConfirmCopy,
	getPrintCancellationCopyFamily,
	getProgressCopy,
	getReasonPickerCopy,
	getSuccessCopy,
} from '../printCancellationCopy';

const product = (mmaProductKey: ProductTier) =>
	({ mmaProductKey } as ProductDetail);

const guardianWeekly = product('Guardian Weekly - Domestic');

describe('getPrintCancellationCopyFamily', () => {
	it.each<ProductTier>([
		'Newspaper Delivery',
		'Newspaper Delivery + Digital',
		'Newspaper - National Delivery',
		'Newspaper - National Delivery + Digital',
		'Newspaper Delivery - Observer',
		'Newspaper Voucher - Observer',
		'Newspaper Digital Voucher - Observer',
	])('maps %s to home delivery copy', (mmaProductKey) => {
		expect(getPrintCancellationCopyFamily(product(mmaProductKey))).toBe(
			'homeDelivery',
		);
	});

	it.each<ProductTier>(['Newspaper Voucher', 'Newspaper Voucher + Digital'])(
		'maps %s to voucher copy',
		(mmaProductKey) => {
			expect(getPrintCancellationCopyFamily(product(mmaProductKey))).toBe(
				'voucher',
			);
		},
	);

	it.each<ProductTier>([
		'Newspaper Digital Voucher',
		'Newspaper Digital Voucher + Digital',
	])('maps %s to subscription card copy', (mmaProductKey) => {
		expect(getPrintCancellationCopyFamily(product(mmaProductKey))).toBe(
			'subscriptionCard',
		);
	});

	it.each<ProductTier>([
		'Guardian Weekly - Domestic',
		'Guardian Weekly - ROW',
		'Guardian Weekly Zone A',
		'Guardian Weekly Zone B',
		'Guardian Weekly Zone C',
	])('maps %s to Guardian Weekly copy', (mmaProductKey) => {
		expect(getPrintCancellationCopyFamily(product(mmaProductKey))).toBe(
			'guardianWeekly',
		);
	});

	it('uses Guardian Weekly copy when the product key is unknown', () => {
		expect(
			getPrintCancellationCopyFamily(
				product('Supporter Plus' as ProductTier),
			),
		).toBe('guardianWeekly');
	});
});

describe('print cancellation copy fallback', () => {
	const families = [
		product('Newspaper Delivery'),
		product('Newspaper Voucher'),
		product('Newspaper Digital Voucher'),
	];

	it('uses the current Guardian Weekly sentences for every family', () => {
		for (const familyProduct of families) {
			expect(getReasonPickerCopy(familyProduct)).toEqual(
				getReasonPickerCopy(guardianWeekly),
			);
			expect(getAlternativesCopy(familyProduct)).toEqual(
				getAlternativesCopy(guardianWeekly),
			);
			expect(getConfirmCopy(familyProduct)).toEqual(
				getConfirmCopy(guardianWeekly),
			);
			expect(getSuccessCopy(familyProduct)).toEqual(
				getSuccessCopy(guardianWeekly),
			);
			expect(getProgressCopy(familyProduct)).toEqual(
				getProgressCopy(guardianWeekly),
			);
		}
	});

	it('keeps the Guardian Weekly reason step wording', () => {
		const copy = getReasonPickerCopy(guardianWeekly);
		expect(copy.pageTitle).toBe('Manage subscription');
		expect(copy.introEmphasis).toBe(
			"Would you take a moment to tell us why you'd like to cancel?",
		);
		expect(copy.title('test, ', "we're")).toBe(
			"test, we're sorry to see you go",
		);
	});
});

describe('print cancellation product config', () => {
	it('opens the print cancellation journey for newspaper products', () => {
		const printProducts = [
			PRODUCT_TYPES.homedelivery,
			PRODUCT_TYPES.homedeliveryplusdigital,
			PRODUCT_TYPES.nationaldelivery,
			PRODUCT_TYPES.nationaldeliveryplusdigital,
			PRODUCT_TYPES.observer,
			PRODUCT_TYPES.voucher,
			PRODUCT_TYPES.voucherplusdigital,
			PRODUCT_TYPES.voucherobserver,
			PRODUCT_TYPES.digitalvoucher,
			PRODUCT_TYPES.digitalvoucherplusdigital,
			PRODUCT_TYPES.digitalvoucherobserver,
			PRODUCT_TYPES.guardianweekly,
		];

		for (const productType of printProducts) {
			expect(productType.cancellation?.usesPrintCancellationFlow).toBe(
				true,
			);
			expect(productType.cancellation?.reasons?.length).toBeGreaterThan(
				0,
			);
		}
	});

	it('keeps Salesforce case products on the right family', () => {
		expect(PRODUCT_TYPES.guardianweekly.cancellation?.sfCaseProduct).toBe(
			'Guardian Weekly',
		);
		expect(PRODUCT_TYPES.homedelivery.cancellation?.sfCaseProduct).toBe(
			'Newspaper - Home Delivery',
		);
		expect(PRODUCT_TYPES.nationaldelivery.cancellation?.sfCaseProduct).toBe(
			'Newspaper - Home Delivery',
		);
		expect(PRODUCT_TYPES.observer.cancellation?.sfCaseProduct).toBe(
			'Newspaper - Home Delivery',
		);
		expect(PRODUCT_TYPES.voucher.cancellation?.sfCaseProduct).toBe(
			'Voucher Subscriptions',
		);
		expect(PRODUCT_TYPES.voucherobserver.cancellation?.sfCaseProduct).toBe(
			'Voucher Subscriptions',
		);
		expect(PRODUCT_TYPES.digitalvoucher.cancellation?.sfCaseProduct).toBe(
			'Newspaper Subscription Card',
		);
		expect(
			PRODUCT_TYPES.digitalvoucherobserver.cancellation?.sfCaseProduct,
		).toBe('Newspaper Subscription Card');
	});

	it('leaves Digital + Print and deprecated paper on their current flows', () => {
		expect(
			PRODUCT_TYPES.tierthree.cancellation?.usesPrintCancellationFlow,
		).toBeUndefined();
		expect(PRODUCT_TYPES.newspaper.cancellation).toBeUndefined();
	});
});

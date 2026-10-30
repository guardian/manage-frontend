import { featureSwitches } from '@/shared/featureSwitches';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	isCancellationEntryOpen,
	isPrintCancellationJourneyEnabled,
} from '../printCancellationFeature';

describe('print product cancellation feature flag', () => {
	const originalFlag = featureSwitches.printProductCancellation;

	afterEach(() => {
		featureSwitches.printProductCancellation = originalFlag;
	});

	it('keeps Guardian Weekly on the print journey without the flag', () => {
		featureSwitches.printProductCancellation = false;
		expect(
			isPrintCancellationJourneyEnabled(PRODUCT_TYPES.guardianweekly),
		).toBe(true);
		expect(isCancellationEntryOpen(PRODUCT_TYPES.guardianweekly)).toBe(
			true,
		);
	});

	it('keeps the voucher cancel button, and the old journey, until the flag is on', () => {
		featureSwitches.printProductCancellation = false;
		expect(isCancellationEntryOpen(PRODUCT_TYPES.voucher)).toBe(true);
		expect(isCancellationEntryOpen(PRODUCT_TYPES.voucherobserver)).toBe(
			true,
		);
		expect(isPrintCancellationJourneyEnabled(PRODUCT_TYPES.voucher)).toBe(
			false,
		);

		featureSwitches.printProductCancellation = true;
		expect(isPrintCancellationJourneyEnabled(PRODUCT_TYPES.voucher)).toBe(
			true,
		);
	});

	it.each([
		['homedelivery', PRODUCT_TYPES.homedelivery],
		['homedeliveryplusdigital', PRODUCT_TYPES.homedeliveryplusdigital],
		['nationaldelivery', PRODUCT_TYPES.nationaldelivery],
		[
			'nationaldeliveryplusdigital',
			PRODUCT_TYPES.nationaldeliveryplusdigital,
		],
		['observer', PRODUCT_TYPES.observer],
		['digitalvoucher', PRODUCT_TYPES.digitalvoucher],
		['digitalvoucherplusdigital', PRODUCT_TYPES.digitalvoucherplusdigital],
		['digitalvoucherobserver', PRODUCT_TYPES.digitalvoucherobserver],
	] as const)(
		'hides the new cancel entry for %s until the flag is present',
		(_name, productType) => {
			featureSwitches.printProductCancellation = false;
			expect(isCancellationEntryOpen(productType)).toBe(false);
			expect(isPrintCancellationJourneyEnabled(productType)).toBe(false);

			featureSwitches.printProductCancellation = true;
			expect(isCancellationEntryOpen(productType)).toBe(true);
			expect(isPrintCancellationJourneyEnabled(productType)).toBe(true);
		},
	);

	it('does not gate products outside the print rollout', () => {
		featureSwitches.printProductCancellation = false;
		expect(isCancellationEntryOpen(PRODUCT_TYPES.tierthree)).toBe(true);
		expect(isPrintCancellationJourneyEnabled(PRODUCT_TYPES.tierthree)).toBe(
			false,
		);
		expect(isCancellationEntryOpen(PRODUCT_TYPES.digipack)).toBe(true);
	});
});

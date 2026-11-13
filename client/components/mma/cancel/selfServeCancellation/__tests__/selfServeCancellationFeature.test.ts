import { guardianWeeklyPaidByCard } from '@/client/fixtures/productBuilder/testProducts';
import { featureSwitches } from '@/shared/featureSwitches';
import type { ProductDetail } from '@/shared/productResponse';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { CANCELLATION_REASONS } from '../../cancellationReasonsCatalogue';
import {
	cancelsWithoutSelfServeFlag,
	isCancellationEntryOpen,
	isSelfServeCancellationJourneyEnabled,
} from '../selfServeCancellationFeature';

const weeklyIn = (country: string): ProductDetail => {
	const productDetail = guardianWeeklyPaidByCard();
	if (productDetail.subscription.deliveryAddress) {
		productDetail.subscription.deliveryAddress.country = country;
	}
	productDetail.billingCountry = country;
	return productDetail;
};

describe('self-serve cancellation feature flag', () => {
	const originalFlag = featureSwitches.selfServeCancellation;

	afterEach(() => {
		featureSwitches.selfServeCancellation = originalFlag;
	});

	it('keeps Guardian Weekly outside the UK on the self-serve journey without the flag', () => {
		featureSwitches.selfServeCancellation = false;
		const unitedStates = weeklyIn('United States');
		expect(
			isSelfServeCancellationJourneyEnabled(
				PRODUCT_TYPES.guardianweekly,
				unitedStates,
			),
		).toBe(true);
		expect(
			cancelsWithoutSelfServeFlag(
				PRODUCT_TYPES.guardianweekly,
				unitedStates,
			),
		).toBe(true);
		expect(isCancellationEntryOpen(PRODUCT_TYPES.guardianweekly)).toBe(
			true,
		);
	});

	it('keeps UK Guardian Weekly on the previous path until the flag is on', () => {
		const unitedKingdom = weeklyIn('United Kingdom');
		featureSwitches.selfServeCancellation = false;
		expect(
			isSelfServeCancellationJourneyEnabled(
				PRODUCT_TYPES.guardianweekly,
				unitedKingdom,
			),
		).toBe(false);
		expect(
			cancelsWithoutSelfServeFlag(
				PRODUCT_TYPES.guardianweekly,
				unitedKingdom,
			),
		).toBe(false);
		expect(isCancellationEntryOpen(PRODUCT_TYPES.guardianweekly)).toBe(
			true,
		);

		featureSwitches.selfServeCancellation = true;
		expect(
			isSelfServeCancellationJourneyEnabled(
				PRODUCT_TYPES.guardianweekly,
				unitedKingdom,
			),
		).toBe(true);
		expect(
			cancelsWithoutSelfServeFlag(
				PRODUCT_TYPES.guardianweekly,
				unitedKingdom,
			),
		).toBe(true);
	});

	it('keeps the voucher cancel button, and the old journey, until the flag is on', () => {
		featureSwitches.selfServeCancellation = false;
		expect(isCancellationEntryOpen(PRODUCT_TYPES.voucher)).toBe(true);
		expect(isCancellationEntryOpen(PRODUCT_TYPES.voucherobserver)).toBe(
			true,
		);
		expect(
			isSelfServeCancellationJourneyEnabled(PRODUCT_TYPES.voucher),
		).toBe(false);

		featureSwitches.selfServeCancellation = true;
		expect(
			isSelfServeCancellationJourneyEnabled(PRODUCT_TYPES.voucher),
		).toBe(true);
		expect(PRODUCT_TYPES.voucher.cancellation?.reasons).toBe(
			CANCELLATION_REASONS.voucher,
		);
		expect(PRODUCT_TYPES.voucherplusdigital.cancellation?.reasons).toBe(
			CANCELLATION_REASONS.voucher,
		);
		expect(PRODUCT_TYPES.voucherobserver.cancellation?.reasons).toBe(
			CANCELLATION_REASONS.voucher,
		);
		expect(PRODUCT_TYPES.homedelivery.cancellation?.reasons).toBe(
			CANCELLATION_REASONS.printProducts,
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
			featureSwitches.selfServeCancellation = false;
			expect(isCancellationEntryOpen(productType)).toBe(false);
			expect(isSelfServeCancellationJourneyEnabled(productType)).toBe(
				false,
			);

			featureSwitches.selfServeCancellation = true;
			expect(isCancellationEntryOpen(productType)).toBe(true);
			expect(isSelfServeCancellationJourneyEnabled(productType)).toBe(
				true,
			);
		},
	);

	it('ignores the members-data-api self-serve flag for these products', () => {
		featureSwitches.selfServeCancellation = false;
		expect(cancelsWithoutSelfServeFlag(PRODUCT_TYPES.homedelivery)).toBe(
			true,
		);
		expect(
			cancelsWithoutSelfServeFlag(PRODUCT_TYPES.homedeliveryplusdigital),
		).toBe(true);
		expect(cancelsWithoutSelfServeFlag(PRODUCT_TYPES.voucher)).toBe(true);
		expect(cancelsWithoutSelfServeFlag(PRODUCT_TYPES.digitalvoucher)).toBe(
			true,
		);
		expect(
			cancelsWithoutSelfServeFlag(
				PRODUCT_TYPES.guardianweekly,
				weeklyIn('Australia'),
			),
		).toBe(true);
		expect(
			cancelsWithoutSelfServeFlag(
				PRODUCT_TYPES.guardianweekly,
				weeklyIn('United Kingdom'),
			),
		).toBe(false);
		expect(cancelsWithoutSelfServeFlag(PRODUCT_TYPES.tierthree)).toBe(
			false,
		);
		expect(cancelsWithoutSelfServeFlag(PRODUCT_TYPES.digipack)).toBe(false);
	});

	it('does not gate products outside the self-serve rollout', () => {
		featureSwitches.selfServeCancellation = false;
		expect(isCancellationEntryOpen(PRODUCT_TYPES.tierthree)).toBe(true);
		expect(
			isSelfServeCancellationJourneyEnabled(PRODUCT_TYPES.tierthree),
		).toBe(false);
		expect(isCancellationEntryOpen(PRODUCT_TYPES.digipack)).toBe(true);
	});
});

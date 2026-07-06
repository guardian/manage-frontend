import { dateString } from '@/shared/dates';
import type { UpgradePreviewResponse } from '@/shared/productSwitchTypes';
import {
	type DiscountedUpgradePreview,
	formatDiscountPeriodLabel,
	getConfirmationDiscountHeaderText,
	getConfirmationPaymentConditionsText,
	getInformationDiscountHelperText,
	getRemainingDiscountPeriods,
	getThankYouPaymentConditionsText,
	isDiscountedPreview,
} from '../utilities/upgradeProductPaymentCopy';

const mockUpgradePreviewResponseMonthlyDiscountGBP: DiscountedUpgradePreview = {
	amountPayableToday: 3.0,
	proratedRefundAmount: 4.5,
	targetCatalogPrice: 14.99,
	nextPaymentDate: '2026-03-15',
	discount: {
		discountedPrice: 7.5,
		upToPeriods: 3,
		upToPeriodsType: 'Months',
	},
};

describe('isDiscountedPreview', () => {
	it('returns true when discounted price is below catalog price', () => {
		expect(
			isDiscountedPreview(mockUpgradePreviewResponseMonthlyDiscountGBP),
		).toBe(true);
	});

	it('returns true for 100% off promos', () => {
		expect(
			isDiscountedPreview({
				...mockUpgradePreviewResponseMonthlyDiscountGBP,
				discount: {
					discountedPrice: 0,
					upToPeriods: 3,
					upToPeriodsType: 'Months',
				},
			}),
		).toBe(true);
	});

	it('returns false when discounted price equals catalog price', () => {
		expect(
			isDiscountedPreview({
				...mockUpgradePreviewResponseMonthlyDiscountGBP,
				discount: {
					discountedPrice: 14.99,
					upToPeriods: 3,
					upToPeriodsType: 'Months',
				},
			}),
		).toBe(false);
	});

	it('returns false when discount is missing', () => {
		expect(
			isDiscountedPreview({
				amountPayableToday: 3.0,
				proratedRefundAmount: 4.5,
				targetCatalogPrice: 14.99,
				nextPaymentDate: '2026-03-15',
			}),
		).toBe(false);
	});
});

describe('getRemainingDiscountPeriods', () => {
	it('returns upToPeriods minus one for valid values', () => {
		expect(getRemainingDiscountPeriods(3)).toBe(2);
		expect(getRemainingDiscountPeriods(1)).toBe(0);
	});

	it('returns unknown for invalid values', () => {
		expect(getRemainingDiscountPeriods(undefined)).toBe('unknown');
		expect(getRemainingDiscountPeriods(0)).toBe('unknown');
	});
});

describe('formatDiscountPeriodLabel', () => {
	it('pluralises the period label', () => {
		expect(formatDiscountPeriodLabel(3, 'Months')).toBe('3 months');
	});

	it('returns unknown for invalid values', () => {
		expect(formatDiscountPeriodLabel(undefined, 'Months')).toBe('unknown');
	});
});

describe('copy builders', () => {
	it('formats information helper text with full promo duration and currency', () => {
		expect(
			getInformationDiscountHelperText(
				mockUpgradePreviewResponseMonthlyDiscountGBP,
				'£',
				'month',
			),
		).toBe('For the next 3 months then £14.99/month');
	});

	it('formats confirmation header text with two-decimal currency', () => {
		expect(
			getConfirmationDiscountHeaderText(
				mockUpgradePreviewResponseMonthlyDiscountGBP,
				'£',
				'month',
			),
		).toBe(' £7.50/month for 3 months');
	});

	it('formats confirmation payment text with remaining promo duration', () => {
		const nextPaymentDateLong = dateString(
			new Date(
				mockUpgradePreviewResponseMonthlyDiscountGBP.nextPaymentDate,
			),
			'MMMM do',
		);

		expect(
			getConfirmationPaymentConditionsText({
				preview: mockUpgradePreviewResponseMonthlyDiscountGBP,
				isDiscountedOffer: true,
				currency: '£',
				paymentInterval: 'month',
			}),
		).toContain('£7.50');
		expect(
			getConfirmationPaymentConditionsText({
				preview: mockUpgradePreviewResponseMonthlyDiscountGBP,
				isDiscountedOffer: true,
				currency: '£',
				paymentInterval: 'month',
			}),
		).toContain('for 2 months');
		expect(
			getConfirmationPaymentConditionsText({
				preview: mockUpgradePreviewResponseMonthlyDiscountGBP,
				isDiscountedOffer: true,
				currency: '£',
				paymentInterval: 'month',
			}),
		).toContain(`From ${nextPaymentDateLong}`);
	});

	it('uses unknown when promo duration is missing in confirmation payment text', () => {
		const preview: UpgradePreviewResponse = {
			...mockUpgradePreviewResponseMonthlyDiscountGBP,
			discount: {
				discountedPrice: 7.5,
				upToPeriods: 0,
				upToPeriodsType: 'Months',
			},
		};

		expect(
			getConfirmationPaymentConditionsText({
				preview,
				isDiscountedOffer: true,
				currency: '£',
				paymentInterval: 'month',
			}),
		).toContain('for unknown');
	});

	it('singularises remaining period label when count is one', () => {
		const preview: DiscountedUpgradePreview = {
			...mockUpgradePreviewResponseMonthlyDiscountGBP,
			discount: {
				discountedPrice: 7.5,
				upToPeriods: 2,
				upToPeriodsType: 'Months',
			},
		};

		expect(
			getConfirmationPaymentConditionsText({
				preview,
				isDiscountedOffer: true,
				currency: '£',
				paymentInterval: 'month',
			}),
		).toContain('for 1 month');
	});

	it('uses preview next payment date for non-discounted confirmation payment text', () => {
		const preview: UpgradePreviewResponse = {
			amountPayableToday: 5.5,
			proratedRefundAmount: 4.5,
			targetCatalogPrice: 14.99,
			nextPaymentDate: '2026-03-15',
		};
		const nextPaymentDateLong = dateString(
			new Date(preview.nextPaymentDate),
			'MMMM do',
		);

		expect(
			getConfirmationPaymentConditionsText({
				preview,
				isDiscountedOffer: false,
				currency: '£',
				paymentInterval: 'month',
			}),
		).toContain(`from ${nextPaymentDateLong}`);
	});

	it('formats thank-you payment text with remaining promo duration', () => {
		expect(
			getThankYouPaymentConditionsText({
				preview: mockUpgradePreviewResponseMonthlyDiscountGBP,
				isDiscountedOffer: true,
				currency: '£',
				billingPeriod: 'month',
				nextPaymentDateLong: 'March 15th',
			}),
		).toContain('£7.50');
		expect(
			getThankYouPaymentConditionsText({
				preview: mockUpgradePreviewResponseMonthlyDiscountGBP,
				isDiscountedOffer: true,
				currency: '£',
				billingPeriod: 'month',
				nextPaymentDateLong: 'March 15th',
			}),
		).toContain('for 2 months');
	});

	it('formats non-discounted thank-you payment text', () => {
		const preview: UpgradePreviewResponse = {
			amountPayableToday: 5.5,
			proratedRefundAmount: 4.5,
			targetCatalogPrice: 14.99,
			nextPaymentDate: '2026-03-15',
		};

		expect(
			getThankYouPaymentConditionsText({
				preview,
				isDiscountedOffer: false,
				currency: '£',
				billingPeriod: 'month',
				nextPaymentDateLong: 'March 15th',
			}),
		).toBe(
			'You will be charged £5.50. From March 15th, your ongoing monthly payment will be £14.99.',
		);
	});
});

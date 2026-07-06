import { formatAmount } from '@/client/utilities/utils';
import { dateString } from '@/shared/dates';
import { appendCorrectPluralisation } from '@/shared/generalTypes';
import type { BillingPeriod } from '@/shared/productResponse';
import type {
	SwitchDiscountResponse,
	UpgradePreviewResponse,
} from '@/shared/productSwitchTypes';

export type DiscountedUpgradePreview = UpgradePreviewResponse & {
	discount: SwitchDiscountResponse;
};

function isYearlyBilling(billingPeriod: string): billingPeriod is 'year' {
	return billingPeriod === 'year';
}

function formatStandardNextPaymentDate(nextPaymentDate: string): string {
	return dateString(new Date(nextPaymentDate), 'MMMM do');
}

/** Long date for yearly discounted payment copy. @example "06 July 2027" */
function formatYearlyDiscountNextPaymentDate(nextPaymentDate: string): string {
	return dateString(new Date(nextPaymentDate), 'dd MMMM yyyy');
}

/** @example formatUpgradeNextPaymentDate('2026-03-15', 'month') // "March 15th" */
export function formatUpgradeNextPaymentDate(
	nextPaymentDate: string,
	_billingPeriod: BillingPeriod,
): string {
	return formatStandardNextPaymentDate(nextPaymentDate);
}

export function formatUpgradeNextPaymentDayLabel(
	nextPaymentDate: string,
	billingPeriod: BillingPeriod,
): string {
	return isYearlyBilling(billingPeriod)
		? formatYearlyDiscountNextPaymentDate(nextPaymentDate)
		: dateString(new Date(nextPaymentDate), 'do');
}

export function isDiscountedPreview(
	preview: UpgradePreviewResponse | null | undefined,
): preview is DiscountedUpgradePreview {
	return (
		preview != null &&
		preview.discount != null &&
		preview.discount.discountedPrice < preview.targetCatalogPrice
	);
}

/**
 * Converts API promo length to remaining billing periods for payment copy.
 * The first discounted period is counted separately in the upgrade flow.
 *
 * @example getRemainingDiscountPeriods(3) // 2
 */
export function getRemainingDiscountPeriods(
	upToPeriods?: number,
): number | 'unknown' {
	if (upToPeriods == null || upToPeriods <= 0) {
		return 'unknown';
	}
	return upToPeriods - 1;
}

export function formatCurrency(currency: string, amount?: number) {
	return `${currency}${formatAmount(amount)}`;
}

/**
 * Formats the full promo duration for header/helper copy.
 *
 * @example formatDiscountPeriodLabel(3, 'Months') // "3 months"
 */
export function formatDiscountPeriodLabel(
	upToPeriods: number | undefined,
	upToPeriodsType: SwitchDiscountResponse['upToPeriodsType'],
): string {
	if (upToPeriods == null || upToPeriods <= 0) {
		return 'unknown';
	}
	return `${upToPeriods} ${appendCorrectPluralisation(
		upToPeriodsType,
		upToPeriods,
	).toLowerCase()}`;
}

/**
 * Formats remaining promo duration for payment-paragraph copy (after the first period).
 *
 * @example formatRemainingDiscountPeriodLabel(3, 'Months') // "2 months"
 * @example formatRemainingDiscountPeriodLabel(2, 'Months') // "1 month"
 */
function formatRemainingDiscountPeriodLabel(
	upToPeriods: number | undefined,
	upToPeriodsType: SwitchDiscountResponse['upToPeriodsType'],
): string {
	const remaining = getRemainingDiscountPeriods(upToPeriods);
	if (remaining === 'unknown') {
		return 'unknown';
	}
	return `${remaining} ${appendCorrectPluralisation(
		upToPeriodsType,
		remaining,
	).toLowerCase()}`;
}

export function getInformationDiscountHelperText(
	preview: DiscountedUpgradePreview,
	currency: string,
	paymentInterval: string,
): string {
	const { discount, targetCatalogPrice } = preview;
	return `For the next ${formatDiscountPeriodLabel(
		discount.upToPeriods,
		discount.upToPeriodsType,
	)} then ${formatCurrency(currency, targetCatalogPrice)}/${paymentInterval}`;
}

export function getConfirmationDiscountHeaderText(
	preview: DiscountedUpgradePreview,
	currency: string,
	paymentInterval: string,
): string {
	const { discount } = preview;
	return ` ${formatCurrency(
		currency,
		discount.discountedPrice,
	)}/${paymentInterval} for ${formatDiscountPeriodLabel(
		discount.upToPeriods,
		discount.upToPeriodsType,
	)}`;
}

export function getConfirmationPaymentConditionsText({
	preview,
	isDiscountedOffer,
	currency,
	paymentInterval,
}: {
	preview: UpgradePreviewResponse;
	isDiscountedOffer: boolean;
	currency: string;
	paymentInterval: BillingPeriod;
}): string {
	const nextPaymentDateLong = formatStandardNextPaymentDate(
		preview.nextPaymentDate,
	);
	const nextPaymentDateDay = formatUpgradeNextPaymentDayLabel(
		preview.nextPaymentDate,
		paymentInterval,
	);

	let paymentConditionsText = `We will charge you a smaller amount today, to offset the payment you've already given us for the rest of the ${paymentInterval}. `;

	if (isDiscountedOffer && isDiscountedPreview(preview)) {
		const { discount, targetCatalogPrice } = preview;

		if (isYearlyBilling(paymentInterval)) {
			const yearlyDiscountPaymentDate =
				formatYearlyDiscountNextPaymentDate(preview.nextPaymentDate);
			paymentConditionsText += `After this, from ${yearlyDiscountPaymentDate}, your payment will be ${formatCurrency(
				currency,
				targetCatalogPrice,
			)} every year. Your next payment date will be ${yearlyDiscountPaymentDate}.`;
		} else {
			paymentConditionsText += `From ${nextPaymentDateLong}, your ${paymentInterval}ly payment will be ${formatCurrency(
				currency,
				discount.discountedPrice,
			)} for ${formatRemainingDiscountPeriodLabel(
				discount.upToPeriods,
				discount.upToPeriodsType,
			)} and then ${formatCurrency(
				currency,
				targetCatalogPrice,
			)} per ${paymentInterval}. The ${nextPaymentDateDay} will be your next payment date.`;
		}
	} else {
		paymentConditionsText += `After this, from ${nextPaymentDateLong}, your ${paymentInterval}ly payment will be ${formatCurrency(
			currency,
			preview.targetCatalogPrice,
		)}`;
	}

	return paymentConditionsText;
}

export function getThankYouPaymentConditionsText({
	preview,
	isDiscountedOffer,
	currency,
	billingPeriod,
}: {
	preview: UpgradePreviewResponse;
	isDiscountedOffer: boolean;
	currency: string;
	billingPeriod: BillingPeriod;
}): string {
	const nextPaymentDateLong = formatStandardNextPaymentDate(
		preview.nextPaymentDate,
	);

	if (isDiscountedOffer && isDiscountedPreview(preview)) {
		const { discount, targetCatalogPrice, amountPayableToday } = preview;

		if (isYearlyBilling(billingPeriod)) {
			const yearlyDiscountPaymentDate =
				formatYearlyDiscountNextPaymentDate(preview.nextPaymentDate);
			return `You will be charged ${formatCurrency(
				currency,
				amountPayableToday,
			)} today. After this, from ${yearlyDiscountPaymentDate}, your payment will be ${formatCurrency(
				currency,
				targetCatalogPrice,
			)} every year.`;
		}

		return `You will be charged ${formatCurrency(
			currency,
			amountPayableToday,
		)} today. From ${nextPaymentDateLong}, your ongoing ${billingPeriod}ly payment will be ${formatCurrency(
			currency,
			discount.discountedPrice,
		)} for ${formatRemainingDiscountPeriodLabel(
			discount.upToPeriods,
			discount.upToPeriodsType,
		)}, then you will be charged ${formatCurrency(
			currency,
			targetCatalogPrice,
		)} per ${billingPeriod}.`;
	}

	return `You will be charged ${formatCurrency(
		currency,
		preview.amountPayableToday,
	)}. From ${nextPaymentDateLong}, your ongoing ${billingPeriod}ly payment will be ${formatCurrency(
		currency,
		preview.targetCatalogPrice,
	)}.`;
}

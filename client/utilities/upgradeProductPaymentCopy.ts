import { formatAmount } from '@/client/utilities/utils';
import { dateString } from '@/shared/dates';
import { appendCorrectPluralisation } from '@/shared/generalTypes';
import type {
	SwitchDiscountResponse,
	UpgradePreviewResponse,
} from '@/shared/productSwitchTypes';

export type DiscountedUpgradePreview = UpgradePreviewResponse & {
	discount: SwitchDiscountResponse;
};

export function isDiscountedPreview(
	preview: UpgradePreviewResponse | null | undefined,
): preview is DiscountedUpgradePreview {
	return (
		preview != null &&
		preview.discount != null &&
		preview.discount.discountedPrice < preview.targetCatalogPrice
	);
}

/** Payment-paragraph periods: API total minus the first discounted period already in flight. */
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
	paymentInterval: string;
}): string {
	const nextPaymentDateLong = dateString(
		new Date(preview.nextPaymentDate),
		'MMMM do',
	);
	const nextPaymentDateDay = dateString(
		new Date(preview.nextPaymentDate),
		'do',
	);

	let paymentConditionsText = `We will charge you a smaller amount today, to offset the payment you've already given us for the rest of the ${paymentInterval}. `;

	if (isDiscountedOffer && isDiscountedPreview(preview)) {
		const { discount, targetCatalogPrice } = preview;
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
	nextPaymentDateLong,
}: {
	preview: UpgradePreviewResponse;
	isDiscountedOffer: boolean;
	currency: string;
	billingPeriod: string;
	nextPaymentDateLong: string;
}): string {
	if (isDiscountedOffer && isDiscountedPreview(preview)) {
		const { discount, targetCatalogPrice, amountPayableToday } = preview;
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

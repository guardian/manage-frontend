import { dateString, parseDate } from '../../../shared/dates';
import { AvailableProductsResponse } from './productSwitchApi';

/**
 * Returns intro offer price if available.
 * e.g. '£5.99'
 *
 * Uses the absolute offer amount if available, or calculates the discount from
 * the regular price and specified percentage discount.
 */

export const introOfferPrice = (product: AvailableProductsResponse): string => {
	if (!product.introOffer) {
		return '';
	}

	const offer = product.introOffer.billing;
	const regular = product.billing;

	let copy = offer.currency.symbol;

	if (offer.amount) {
		copy += Number(offer.amount / 100).toFixed(2);
	} else {
		const discount = offer.percentage ?? 0;
		copy += Number((regular.amount / 100) * (discount / 100)).toFixed(2);
	}

	return copy;
};

/**
 * Returns intro offer duration.
 * e.g. '3 months'
 */

export const introOfferDuration = (
	product: AvailableProductsResponse,
): string => {
	const count = product.introOffer?.duration.count;
	const name = product.introOffer?.duration.name;

	return `${count} ${name}${count === 1 ? '' : 's'}`;
};

/**
 * Returns intro offer banner copy.
 * e.g. '14 days free trial then 50% off for 3 months'
 */

export const introOfferBanner = (
	product: AvailableProductsResponse,
): string => {
	let copy = '';

	if (product.trial) {
		copy += `${product.trial.dayCount} days free trial`;
	}

	if (product.trial && product.introOffer) {
		copy += ' then ';
	}

	if (product.introOffer) {
		const discount = product.introOffer.billing.percentage
			? `${product.introOffer.billing.percentage}% off`
			: `${product.introOffer.billing.currency.symbol}${product.introOffer.billing.amount}`;
		copy += `${discount} for ${introOfferDuration(product)}`;
	}

	return copy;
};

/**
 * Returns regular product price.
 * e.g. '£11.99'
 */

export const regularPrice = (product: AvailableProductsResponse): string => {
	return `${product.billing.currency.symbol}${Number(
		product.billing.amount / 100,
	).toFixed(2)}`;
};

/**
 * Returns regular product billing frequency.
 * e.g. 'per month'
 */

export const regularBillingFrequency = (
	product: AvailableProductsResponse,
): string => {
	return `per  ${product.billing.frequency.name}`;
};

/**
 * Returns start date of new product.
 * e.g. '4 June 2022'
 */

export const productStartDate = (
	product: AvailableProductsResponse,
): string => {
	return dateString(
		parseDate(
			product.introOffer
				? product.introOffer.billing.startDate
				: product.billing.startDate,
		).date,
		'd MMMM yyyy',
	);
};

/**
 * Returns amount of first payment for new product, accounting for intro offers
 * e.g. '£5.99'
 */

export const productFirstPaymentAmount = (
	product: AvailableProductsResponse,
): string => {
	if (product.introOffer) {
		return introOfferPrice(product);
	} else {
		const currencySymbol = product.billing.currency.symbol;
		const amount = product.billing.amount;
		return `${currencySymbol}${Number(amount / 100).toFixed(2)}`;
	}
};

/**
 * The Apple app store does not seem to have geolocation functionality, and
 * requires us to link the user to the appropriate site. We use the
 * GU_geo_country cookie to detect the user's location. The following functions
 * have been taken from:
 * https://github.com/guardian/support-frontend/blob/main/support-frontend/assets/helpers/urls/externalLinks.ts#L103
 */

function convertCountryGroupIdToAppStoreCountryCode(countryCode: string) {
	switch (countryCode.toLowerCase()) {
		case 'gb':
			return 'gb';

		default:
			return 'us';
	}
}

function getAppleStoreUrl(product: string, countryCode: string) {
	const appStoreCountryCode =
		convertCountryGroupIdToAppStoreCountryCode(countryCode);
	return `https://apps.apple.com/${appStoreCountryCode}/app/${product}`;
}

export function getIosAppUrl(countryCode: string | null): string {
	if (countryCode) {
		return getAppleStoreUrl(
			'the-guardian-breaking-news/id409128287',
			countryCode,
		);
	} else {
		return 'https://apps.apple.com/us/app/the-guardian-breaking-news/id409128287';
	}
}

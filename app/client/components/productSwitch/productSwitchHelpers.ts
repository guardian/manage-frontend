import { dateString, parseDate } from '../../../shared/dates';
import {
	AvailableProductsResponse,
	ProductSwitchResponse,
} from './productSwitchApi';

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
		copy += Number(offer.amount).toFixed(2);
	} else {
		const discount = offer.percentage ?? 0;
		copy += Number(regular.amount * (discount / 100)).toFixed(2);
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
	return `${
		product.introOffer?.duration.count
	} ${product.introOffer?.duration.name.toLocaleLowerCase()}`;
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
		product.billing.amount,
	).toFixed(2)}`;
};

/**
 * Returns regular product billing frequency.
 * e.g. 'per month'
 */

export const regularBillingFrequency = (
	product: AvailableProductsResponse,
): string => {
	return `per  ${product.billing.frequency.name.toLowerCase().slice(0, -1)}`;
};

/**
 * Returns start date of new product.
 * e.g. '4 June 2022'
 */

export const newProductStartDate = (product: ProductSwitchResponse): string => {
	const { newProduct } = product;

	return dateString(
		parseDate(
			newProduct.introOffer
				? newProduct.introOffer.billing.startDate
				: newProduct.billing.startDate,
		).date,
		'd MMMM yyyy',
	);
};

/**
 * Returns amount of first payment for new product, accounting for intro offers
 * e.g. '£5.99'
 */

export const newProductFirstPaymentAmount = (
	product: ProductSwitchResponse,
): string => {
	const { newProduct } = product;

	if (newProduct.introOffer) {
		return introOfferPrice(newProduct);
	} else {
		const currencySymbol = newProduct.billing.currency.symbol;
		const amount = newProduct.billing.amount;
		return `${currencySymbol}${Number(amount).toFixed(2)}`;
	}
};

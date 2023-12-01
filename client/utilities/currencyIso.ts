import { isOneOf } from '@guardian/libs';
import * as Sentry from '@sentry/browser';

export const CurrencyIsos = ['GBP', 'USD', 'AUD', 'EUR', 'NZD', 'CAD'] as const;
export type CurrencyIso = typeof CurrencyIsos[number];

type CurrencySymbol = '£' | '$' | '€';

const currencySymbols: Record<CurrencyIso, CurrencySymbol> = {
	GBP: '£',
	USD: '$',
	AUD: '$',
	EUR: '€',
	NZD: '$',
	CAD: '$',
};

export function isCurrencyIso(currency: string): currency is CurrencyIso {
	return isOneOf(CurrencyIsos)(currency);
}

export function convertCurrencyToSymbol(
	currency: string,
): CurrencySymbol | undefined {
	if (!isCurrencyIso(currency)) {
		Sentry.captureException(`Unrecognized currency code: ${currency}`);
		return undefined;
	}

	return convertCurrencyIsoToSymbol(currency);
}

export function convertCurrencyIsoToSymbol(
	currency: CurrencyIso,
): CurrencySymbol {
	return currencySymbols[currency];
}

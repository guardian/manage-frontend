import * as Sentry from '@sentry/browser';

export type CurrencyIso = 'GBP' | 'USD' | 'AUD' | 'EUR' | 'NZD' | 'CAD';

export type MembershipCurrencyIso = 'GBP' | 'USD' | 'AUD' | 'EUR' | 'CAD';

const currencySymbols: Record<CurrencyIso, string> = {
	GBP: '£',
	USD: '$',
	AUD: '$',
	EUR: '€',
	NZD: '$',
	CAD: '$',
};

export function convertCurrencyToSymbol(currency: string): string {
	const symbol = currencySymbols[currency as CurrencyIso];
	if (symbol === undefined) {
		Sentry.captureException(`Unrecognized currency code: ${currency}`);
	}
	return symbol;
}

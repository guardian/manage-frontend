import * as Sentry from '@sentry/browser';

const CurrencyIsos = ['GBP', 'USD', 'AUD', 'EUR', 'NZD', 'CAD'] as const;
export type CurrencyIso = typeof CurrencyIsos[number];

export type MembershipCurrencyIso = 'GBP' | 'USD' | 'AUD' | 'EUR' | 'CAD';

const currencySymbols: Record<CurrencyIso, string> = {
	GBP: '£',
	USD: '$',
	AUD: '$',
	EUR: '€',
	NZD: '$',
	CAD: '$',
};

export function isCurrencyIso(currency: string): currency is CurrencyIso {
	return CurrencyIsos.includes(currency as CurrencyIso);
}

export function convertCurrencyToSymbol(currency: string): string {
	const symbol = currencySymbols[currency as CurrencyIso];
	if (symbol === undefined) {
		Sentry.captureException(`Unrecognized currency code: ${currency}`);
	}
	return symbol;
}

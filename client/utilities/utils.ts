import * as Sentry from '@sentry/browser';
import { trackEvent } from './analytics';

// babel doesn't support 'flatten', but this function can be used with flatMap
export function flattenEquivalent<T>(x: T): T {
	return x;
}

/*
 * implementation of the Fisher–Yates Shuffle algorithm
 * example here: https://bost.ocks.org/mike/shuffle/
 */
export const shuffleArray = (array: unknown[]) => {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
	return array;
};

export function formatAmount(amount: number) {
	return Number.isInteger(amount) ? amount : amount.toFixed(2);
}

export const processResponse = <T>(resp: Response): Promise<T | null> => {
	const locationHeader = resp.headers.get('Location');
	const allResponsesAreOK = [resp].filter((res) => !res.ok).length === 0;

	// handle unauthorized
	if (resp.status === 401 && locationHeader && window !== undefined) {
		window.location.replace(locationHeader);
		return Promise.resolve(null);

		// handle success
	} else if (allResponsesAreOK) {
		return resp.json();
	}

	// handle error
	const error = new Error(`${resp.status} (${resp.statusText})`);

	trackEvent({
		eventCategory: 'fetch',
		eventAction: 'error',
		eventLabel: error ? error.toString() : undefined,
	});

	Sentry.captureException(error);

	throw error;
};

// https://stackoverflow.com/a/61511955
export function waitForElement(selector: string): Promise<Element | null> {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver((_) => {
			if (document.querySelector(selector)) {
				observer.disconnect();
				resolve(document.querySelector(selector));
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

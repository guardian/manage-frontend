import * as Sentry from '@sentry/browser';
import { trackEvent } from './services/analytics';

// babel doesn't support 'flatten', but this function can be used with flatMap
export function flattenEquivalent<T>(x: T): T {
	return x;
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

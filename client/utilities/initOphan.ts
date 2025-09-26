import type { EventPayload } from '@guardian/ophan-tracker-js/MMA';

export type OphanRecord = (event: EventPayload, callback?: () => void) => void;

let initPromise: Promise<OphanRecord | undefined> | undefined;

/**
 * Initialise the Ophan client on the browser.
 * Returns the `record` function once Ophan is ready so callers can emit events.
 */
export const initOphan = (): Promise<OphanRecord | undefined> => {
	if (typeof window === 'undefined') {
		return Promise.resolve(undefined);
	}

	if (!initPromise) {
		initPromise = import('@guardian/ophan-tracker-js/MMA')
			.then(({ init, record }) => {
				init();
				return record;
			})
			.catch((error) => {
				initPromise = undefined;
				throw error;
			});
	}

	return initPromise;
};

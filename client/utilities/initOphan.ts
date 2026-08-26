import type { EventPayload } from '@guardian/ophan-tracker-js';

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
		initPromise = import('@guardian/ophan-tracker-js')
			.then(({ init, record }) => {
				init('manage-my-account');
				return record;
			})
			.catch((error) => {
				initPromise = undefined;
				throw error;
			});
	}

	return initPromise;
};

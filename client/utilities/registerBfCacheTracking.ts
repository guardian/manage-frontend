import type { OphanRecord } from './initOphan';
import { initOphan } from './initOphan';

let trackingRegistered = false;

const sendBfCacheEvent = (record: OphanRecord) => {
	record({
		componentEvent: {
			component: { componentType: 'BF_CACHE' },
			action: 'VIEW',
		},
	});
};

/**
 * Register a handler that emits a component event whenever the page
 * returns from the browser's back/forward cache.
 */
export const registerBfCacheTracking = () => {
	if (typeof window === 'undefined' || trackingRegistered) {
		return;
	}

	trackingRegistered = true;

	void initOphan();

	window.addEventListener('pageshow', (event: PageTransitionEvent) => {
		if (!event.persisted) {
			return;
		}

		void initOphan().then((record) => {
			if (record) {
				sendBfCacheEvent(record);
			}
		});
	});
};

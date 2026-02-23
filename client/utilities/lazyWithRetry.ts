import type { ComponentType } from 'react';
import { lazy } from 'react';

const RETRY_KEY = 'chunk_load_retry';
const RETRY_EXPIRY_MS = 30_000;

function isChunkLoadError(error: unknown): boolean {
	if (!(error instanceof Error)) {
		return false;
	}

	const msg = error.message ?? '';
	return (
		error.name === 'ChunkLoadError' ||
		/ChunkLoadError/i.test(msg) ||
		/loading chunk \d+ failed/i.test(msg) ||
		/failed to fetch dynamically imported module/i.test(msg) ||
		/importing a module script failed/i.test(msg)
	);
}

/**
 * Drop-in replacement for React.lazy that automatically retries by
 * reloading the page once when a chunk fails to load (e.g. after a deploy
 * invalidates cached chunk hashes). Uses a timestamped sessionStorage flag
 * to prevent infinite reload loops — if the chunk still fails after a
 * reload within the expiry window, the error propagates to the nearest
 * error boundary.
 *
 * Only triggers a reload for ChunkLoadErrors — other import failures
 * (e.g. syntax errors in the loaded module) are re-thrown immediately.
 * Safely guards against missing window/sessionStorage for SSR and tests.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches React.lazy's own signature which uses ComponentType<any>
export function lazyWithRetry<T extends ComponentType<any>>(
	factory: () => Promise<{ default: T }>,
) {
	return lazy(() =>
		factory().catch((error: unknown) => {
			if (!isChunkLoadError(error) || typeof window === 'undefined') {
				throw error;
			}

			try {
				const retryTimestamp = sessionStorage.getItem(RETRY_KEY);
				const now = Date.now();
				const ts = retryTimestamp ? Number(retryTimestamp) : NaN;

				const hasRecentRetry =
					Number.isFinite(ts) && now - ts <= RETRY_EXPIRY_MS;

				if (!hasRecentRetry) {
					sessionStorage.setItem(RETRY_KEY, String(now));
					window.location.reload();
					return new Promise<never>(() => {});
				}
			} catch {
				// sessionStorage may throw in restrictive environments
			}

			throw error;
		}),
	);
}

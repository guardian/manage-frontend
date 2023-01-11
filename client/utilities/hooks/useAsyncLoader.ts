import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import type ResponseProcessor from '../../components/mma/shared/asyncComponents/ResponseProcessor';
import { trackEvent } from '../analytics';

export default function useAsyncLoader<T>(
	promiseFromAsyncFetch: Promise<any>,
	responseProcessor: ResponseProcessor,
): {
	data: T | null;
	error: Error | ErrorEvent | string | undefined;
	isLoading: boolean;
} {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | ErrorEvent | string>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	function handleError(error: Error | ErrorEvent | string): void {
		setError(error);
		trackEvent({
			eventCategory: 'asyncLoader',
			eventAction: 'error',
			eventLabel: error ? error.toString() : undefined,
		});
		Sentry.captureException(error);
	}

	useEffect(() => {
		promiseFromAsyncFetch
			.then((response) => responseProcessor(response))
			.then(setData)
			.catch((e) => handleError(e))
			.finally(() => setIsLoading(false));
	}, [promiseFromAsyncFetch]);

	return { data, error, isLoading };
}

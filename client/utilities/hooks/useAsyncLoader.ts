import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { trackEvent } from '../analytics';
import type { ResponseProcessor } from '../responseHandlers';

export enum LoadingState {
	IsLoading,
	HasLoaded,
	HasError,
}

export function useAsyncLoader<T>(
	asyncFetch: () => Promise<Response | Response[]>,
	responseProcessor: ResponseProcessor,
): {
	data: T | null;
	error: Error | ErrorEvent | string | undefined;
	loadingState: LoadingState;
} {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | ErrorEvent | string>();
	const [loadingState, setLoadingState] = useState<LoadingState>(
		LoadingState.IsLoading,
	);

	function handleError(error: Error | ErrorEvent | string): void {
		setLoadingState(LoadingState.HasError);
		setError(error);
		trackEvent({
			eventCategory: 'asyncLoader',
			eventAction: 'error',
			eventLabel: error ? error.toString() : undefined,
		});
		Sentry.captureException(error);
	}

	useEffect(() => {
		if (loadingState == LoadingState.IsLoading) {
			asyncFetch()
				.then((response) => responseProcessor(response))
				.then((data) => {
					setData(data as T);
					setLoadingState(LoadingState.HasLoaded);
				})
				.catch((e) => handleError(e));
		}
	}, [loadingState]);

	return { data, error, loadingState };
}

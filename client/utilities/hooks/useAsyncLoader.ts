import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { trackEvent } from '../analytics';

type ResponseProcessor = (response: Response | Response[]) => Promise<unknown>;
type ResponseTransformer = (response: Response) => Promise<unknown>;

export const JsonResponseProcessor: ResponseProcessor = (
	response: Response | Response[],
) => {
	return handleResponses(response, (r: Response) => r.json());
};

export const TextResponseProcessor: ResponseProcessor = (
	response: Response | Response[],
) => {
	return handleResponses(response, (r: Response) => r.text());
};

export function handleResponses(
	response: Response | Response[],
	transformResponse: ResponseTransformer,
) {
	if (hasBadResponse(response)) {
		throw new Error('Invalid API response');
	}

	if (Array.isArray(response)) {
		return Promise.all(
			response.map((r) => handleSingleResponse(r, transformResponse)),
		);
	}

	return handleSingleResponse(response, transformResponse);
}

function hasBadResponse(responses: Response | Response[]) {
	if (Array.isArray(responses)) {
		return responses.some((response) => !response.ok);
	}

	return !responses.ok;
}

function handleSingleResponse(
	response: Response,
	transformResponse: ResponseTransformer,
) {
	const locationHeader = response.headers.get('Location');
	if (response.status === 401 && locationHeader && window !== undefined) {
		window.location.replace(locationHeader);
		return Promise.resolve(null);
	} else {
		return transformResponse(response);
	}
}

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
				.then((response) =>
					handleResponses(response, responseProcessor),
				)
				.then((data) => {
					setData(data as T);
					setLoadingState(LoadingState.HasLoaded);
				})
				.catch((e) => handleError(e));
		}
	}, [loadingState]);

	return { data, error, loadingState };
}

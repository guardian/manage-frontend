import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { trackEvent } from '../../utilities/analytics';
import type ResultHandler from './ResultHandler';

export type LoadingProps = {
	asyncFetch: () => Promise<any>;
	resultHandler: ResultHandler;
	LoadingView: () => React.ReactElement;
	LoadedView: (data: any) => React.ReactElement;
	ErrorView: () => React.ReactElement;
};

export function LoadingComponent({
	asyncFetch,
	resultHandler,
	LoadingView,
	LoadedView,
	ErrorView,
}: LoadingProps) {
	const [hasLoaded, setLoaded] = useState<boolean>(false);
	const [hasError, setError] = useState<boolean>(false);
	const [data, setData] = useState<any>();

	useEffect(() => {
		if (!hasLoaded) {
			asyncFetch()
				.then((result) => resultHandler(result))
				.then((result: any) => {
					setData(result);
					setLoaded(true);
				})
				.catch((exception) => {
					setError(true);
					handleError(exception);
				});
		}
	}, [hasLoaded]);

	if (hasError) {
		return <ErrorView />;
	}
	if (hasLoaded && hasValidData(data) && data != undefined) {
		return <LoadedView data={data} />;
	}
	return <LoadingView />;
}

function hasValidData(data: any) {
	return !!data;
}

function handleError(error: Error | ErrorEvent | string): void {
	trackEvent({
		eventCategory: 'asyncLoader',
		eventAction: 'error',
		eventLabel: error ? error.toString() : undefined,
	});
	Sentry.captureException(error);
}

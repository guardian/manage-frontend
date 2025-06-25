import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import type { ResponseProcessor } from '@/client/components/mma/shared/asyncComponents/ResponseProcessor';
import { trackEvent } from '../analytics';

export enum LoadingState {
	IsLoading,
	HasLoaded,
	StopLoading,
	HasError,
}

function isFulfilled<T>(
	val: PromiseSettledResult<T>,
): val is PromiseFulfilledResult<T> {
	return val.status === 'fulfilled';
}

export const useAsyncLoaderAllSettled = (
	fetchPromisesAndRefs: () => Array<{
		promise: Awaited<Promise<unknown>>;
		ref: string;
	}>,
	responseProcessor: ResponseProcessor,
): {
	data: Record<string, unknown> | null;
	error: Error | ErrorEvent | string | undefined;
	loadingState: LoadingState;
} => {
	const [data, setData] = useState<Record<string, unknown> | null>(null);
	const [error, setError] = useState<Error | ErrorEvent | string>();
	const [loadingState, setLoadingState] = useState<LoadingState>(
		LoadingState.IsLoading,
	);

	useEffect(() => {
		const doFetch = async () => {
			try {
				const fetchPromisesAndRefsArr = fetchPromisesAndRefs();
				const results = await Promise.allSettled(
					fetchPromisesAndRefsArr.map(
						(fetchAndRef) => fetchAndRef.promise,
					),
				);
				const fetchRefs = fetchPromisesAndRefsArr.map(
					(fetchAndRef) => fetchAndRef.ref,
				);

				const keyValueResultsArr = await processedResultsArr(
					results,
					fetchRefs,
				);
				const keyValueResults = keyValueResultsArr.reduce(
					(obj, item) =>
						Object.assign(
							obj,
							item ? { [item.ref]: item.value } : {},
						),
					{},
				);
				setData(keyValueResults);
				setLoadingState(LoadingState.HasLoaded);
			} catch (error) {
				handleError(error);
				setLoadingState(LoadingState.HasError);
			}
		};

		const processedResultsArr = (
			fetchResults: Array<PromiseSettledResult<Awaited<unknown>>>,
			fetchRefs: string[],
		): Promise<
			Array<{
				ref: string;
				value: unknown;
			}>
		> => {
			const filteredResults = fetchResults.filter(isFulfilled);

			return new Promise((resolve) => {
				let processedResultsTally = 0;
				const processedResultsArray: Array<{
					ref: string;
					value: unknown;
				}> = [];
				filteredResults.forEach(async (result, index) => {
					try {
						const processValue = await responseProcessor(
							result.value as Response,
						);
						processedResultsArray.push({
							ref: fetchRefs[index],
							value: processValue,
						});
						processedResultsTally++;
					} catch {
						// encountered an error trying to process the response value
						// continue with the tally so the other valid responses can still be processed
						processedResultsTally++;
					}

					if (processedResultsTally >= filteredResults.length) {
						resolve(processedResultsArray);
					}
				});
			});
		};

		if (loadingState === LoadingState.IsLoading) {
			doFetch();
		}
		return () => {
			setLoadingState(LoadingState.StopLoading);
		};
	}, [loadingState, fetchPromisesAndRefs, responseProcessor]);

	const handleError = (error: Error | ErrorEvent | string) => {
		setError(error);
		trackEvent({
			eventCategory: 'asyncLoader',
			eventAction: 'error',
			eventLabel: JSON.stringify(error),
		});
		Sentry.captureException(error);
	};

	return { data, error, loadingState };
};

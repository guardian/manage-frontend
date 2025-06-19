import * as Sentry from '@sentry/browser';
import { useState } from 'react';
import type { ResponseProcessor } from '@/client/components/mma/shared/asyncComponents/ResponseProcessor';
import { trackEvent } from '../analytics';

type ProductFetchRef =
	| 'mdapiResponse'
	| 'cancelledProductsResponse'
	| 'mpapiResponse'
	| 'singleContributions';

export enum LoadingState {
	IsLoading,
	HasLoaded,
	HasError,
}

function isFulfilled<T>(
	val: PromiseSettledResult<T>,
): val is PromiseFulfilledResult<T> {
	return val.status === 'fulfilled';
}

export const useAsyncLoaderAllSettled = <T>(
	fetchPromises: () => Promise<Array<PromiseSettledResult<T>>>,
	fetchRefs: string[],
	responseProcessor: ResponseProcessor,
): {
	data: Partial<Record<ProductFetchRef, unknown>> | null;
	error: Error | ErrorEvent | string | undefined;
	loadingState: LoadingState;
} => {
	const [data, setData] = useState<Partial<
		Record<ProductFetchRef, unknown>
	> | null>(null);
	const [error, setError] = useState<Error | ErrorEvent | string>();
	const [loadingState, setLoadingState] = useState<LoadingState>(
		LoadingState.IsLoading,
	);

	const doFetch = async () => {
		try {
			const results = await fetchPromises();

			const referencesAndJsonPromises = results
				.filter(isFulfilled)
				.map(async (result, index) => {
					return {
						ref: fetchRefs[index],
						value: await responseProcessor(
							result.value as Response,
						),
					};
				});
			const finalResultArr = await Promise.all(referencesAndJsonPromises);
			const finalResultObj = finalResultArr.reduce(
				(obj, item) =>
					Object.assign(obj, item ? { [item.ref]: item.value } : {}),
				{},
			);
			setData(finalResultObj);
			setLoadingState(LoadingState.HasLoaded);
		} catch (error) {
			handleError(error);
			setLoadingState(LoadingState.HasError);
		}
	};
	if (loadingState === LoadingState.IsLoading) {
		doFetch();
	}

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

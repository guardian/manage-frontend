import * as Sentry from '@sentry/browser';
import { useState } from 'react';
import type { ResponseProcessor } from '@/client/components/mma/shared/asyncComponents/ResponseProcessor';
import { trackEvent } from '../analytics';

interface FetchDetails {
	fetch: Promise<Response>;
	ref: string;
}

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

export const useAsyncLoaderAllSettled = (
	fetchDetails: FetchDetails[],
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
			const results = await Promise.allSettled(
				Object.values(fetchDetails).map((entry) => entry.fetch),
			);

			const referencesAndJsonPromises = results.map(
				async (result, index) => {
					if (result.status === 'fulfilled') {
						return {
							ref: fetchDetails[index].ref,
							value: await responseProcessor(result.value),
						};
					}
				},
			);

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

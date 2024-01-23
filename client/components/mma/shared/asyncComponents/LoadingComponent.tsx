import {
	LoadingState,
	useAsyncLoader,
} from '../../../../utilities/hooks/useAsyncLoader';
import type { ResponseProcessor } from './ResponseProcessor';

export type LoadingProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the final output of the promise
	asyncFetch: () => Promise<any>;
	responseProcessor: ResponseProcessor;
	LoadingView: () => React.ReactElement;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the shape of the data argument
	LoadedView: (data: any) => React.ReactElement;
	ErrorView: () => React.ReactElement;
};

export function LoadingComponent({
	asyncFetch,
	responseProcessor,
	LoadingView,
	LoadedView,
	ErrorView,
}: LoadingProps) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the final output of useAsyncLoader's returned promise
	const { data, loadingState } = useAsyncLoader<any>(
		asyncFetch,
		responseProcessor,
	);

	if (loadingState == LoadingState.HasError) {
		return <ErrorView />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <LoadingView />;
	}

	return <LoadedView data={data} />;
}

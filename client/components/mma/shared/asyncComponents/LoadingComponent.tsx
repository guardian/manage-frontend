import {
	LoadingState,
	useAsyncLoader,
} from '../../../../utilities/hooks/useAsyncLoader';
import type { ResponseProcessor } from './ResponseProcessor';

export type LoadingProps = {
	asyncFetch: () => Promise<any>;
	responseProcessor: ResponseProcessor;
	LoadingView: () => React.ReactElement;
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

import useAsyncLoader from '../../../../utilities/hooks/useAsyncLoader';
import type ResponseProcessor from './ResponseProcessor';

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
	const { data, isLoading, error } = useAsyncLoader<any>(
		asyncFetch(),
		responseProcessor,
	);

	if (error) {
		return <ErrorView />;
	}
	if (isLoading) {
		return <LoadingView />;
	}

	return <LoadedView data={data} />;
}

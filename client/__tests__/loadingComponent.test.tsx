import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DefaultErrorView } from '../components/mma/shared/asyncComponents/DefaultErrorView';
import { DefaultLoadingView } from '../components/mma/shared/asyncComponents/DefaultLoadingView';
import { LoadingComponent } from '../components/mma/shared/asyncComponents/LoadingComponent';
import type { ResponseProcessor } from '../components/mma/shared/asyncComponents/ResponseProcessor';

function asyncFetcher() {
	return Promise.resolve('This is the test data returned');
}

const TestResponseHandler: ResponseProcessor = (
	response: Response | Response[],
) => {
	return Promise.resolve(response);
};

const ErroringResponseHandler: ResponseProcessor = () => {
	throw new Error('Errored out');
};

it('renders loading message and loaded message', async () => {
	render(
		<LoadingComponent
			asyncFetch={asyncFetcher}
			responseProcessor={TestResponseHandler}
			LoadingView={DefaultLoadingView}
			LoadedView={() => <div>Loaded</div>}
			ErrorView={DefaultErrorView}
		/>,
	);

	expect(screen.getByText('Loading')).toBeInTheDocument();
	expect(await screen.findByText('Loaded')).toBeVisible();
});

it('renders custom loading view', async () => {
	render(
		<LoadingComponent
			asyncFetch={asyncFetcher}
			responseProcessor={TestResponseHandler}
			LoadingView={() => <div>My Custom Loading View</div>}
			LoadedView={() => <div>Loaded</div>}
			ErrorView={DefaultErrorView}
		/>,
	);

	expect(screen.getByText('My Custom Loading View')).toBeInTheDocument();
	expect(await screen.findByText('Loaded')).toBeVisible();
});

it('renders custom error view when error occurs', async () => {
	render(
		<LoadingComponent
			asyncFetch={asyncFetcher}
			responseProcessor={ErroringResponseHandler}
			LoadingView={DefaultLoadingView}
			LoadedView={() => <div>Loaded</div>}
			ErrorView={() => <div>Custom Error</div>}
		/>,
	);

	expect(await screen.findByText('Custom Error')).toBeVisible();
});

it('renders data fetched async', async () => {
	render(
		<LoadingComponent
			asyncFetch={asyncFetcher}
			responseProcessor={TestResponseHandler}
			LoadingView={DefaultLoadingView}
			LoadedView={({ data }) => <div>{data}</div>}
			ErrorView={DefaultErrorView}
		/>,
	);

	expect(
		await screen.findByText('This is the test data returned'),
	).toBeVisible();
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DefaultErrorView } from '../components/asyncComponents/DefaultErrorView';
import { DefaultLoadingView } from '../components/asyncComponents/DefaultLoadingView';
import { LoadingComponent } from '../components/asyncComponents/LoadingComponent';
import type ResultHandler from '../components/asyncComponents/ResultHandler';

function asyncFetcher() {
	return Promise.resolve('test');
}

const TestResponseHandler: ResultHandler = (response: Response) => {
	console.log('res', response);
	return Promise.resolve(response);
};
//const ErroringResponseHandler: ResultHandler = (_: Response) => { throw 'Errored out' };
// TURN THIS INTO TESTS

it('renders loading message and loaded message', async () => {
	render(
		<LoadingComponent
			asyncFetch={asyncFetcher}
			resultHandler={TestResponseHandler}
			LoadingView={DefaultLoadingView}
			LoadedView={() => <div>Loaded</div>}
			ErrorView={DefaultErrorView}
		/>,
	);

	expect(screen.getByText('Loading')).toBeInTheDocument();
	await screen.findByText('Loaded');
});

it('renders custom loading view', async () => {
	render(
		<LoadingComponent
			asyncFetch={asyncFetcher}
			resultHandler={TestResponseHandler}
			LoadingView={() => <div>My Custom Loading View</div>}
			LoadedView={() => <div>Loaded</div>}
			ErrorView={DefaultErrorView}
		/>,
	);

	expect(screen.getByText('My Custom Loading View')).toBeInTheDocument();
	await screen.findByText('Loaded');
});

// it('renders custom error view', async () => {
//     render(<LoadingComponent asyncFetch={asyncFetcher}
//         resultHandler={ErroringResponseHandler}
//         LoadingView={DefaultLoadingView}
//         LoadedView={() => <div>Loaded</div>}
//         ErrorView={() => <div>Custom Error</div>}
//     />);

//     await screen.findByText('Custom Error');
// })

// it('renders data fetched async', async () => {
//     render(<LoadingComponent asyncFetch={asyncFetcher}
//         resultHandler={TestResponseHandler}
//         LoadingView={DefaultLoadingView}
//         LoadedView={(data) => <div>{data}</div>}
//         ErrorView={DefaultErrorView}
//     />);

//     await screen.findByText('test');
// })

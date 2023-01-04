import { JsonResponseHandler } from './ApiResultHandler';
import { DefaultErrorView } from './DefaultErrorView';
import { DefaultLoadingView } from './DefaultLoadingView';
import { LoadingComponent } from './LoadingComponent';

function asyncFetcher() {
	return Promise.resolve('test');
}

// TURN THIS INTO TESTS

export default () => (
	<LoadingComponent
		asyncFetch={asyncFetcher}
		resultHandler={JsonResponseHandler}
		LoadingView={DefaultLoadingView}
		LoadedView={() => <div>Loaded</div>}
		ErrorView={DefaultErrorView}
	/>
);

// export default () => (
//     <LoadingComponent asyncFetch={asyncFetcher}
//         resultHandler={JsonResponseHandler}
//         LoadingView={() => <div>Loading</div>}
//         LoadedView={() => <div>Loaded</div>}
//         ErrorView={() => <div>Error</div>}
//         />);

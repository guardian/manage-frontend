import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { trackEvent } from '../../services/analytics';
import { GenericErrorScreen } from '../genericErrorScreen';
import { Spinner } from '../spinner';
import { WithStandardTopMargin } from '../WithStandardTopMargin';

function hasValidData(data: any) {
	return !!data;
}

type ReaderOnOK<T> = (resp: Response) => Promise<T>;

type LoadingProps = {
	fetch: () => Promise<any>;
	LoadedView: (data: any) => React.ReactElement;
	loadingMessage: string;
	CustomLoadingView?: () => React.ReactElement;
	readerOnOK?: ReaderOnOK<any>; // json reader by default
	inline?: boolean;
	spinnerScale?: number;
};

//<LoadingComponent fetch={getStuff} loadedView={gotStuff} customLoadingView={waitingForStuff} />
export function LoadingComponent({
	fetch,
	LoadedView,
	loadingMessage,
	CustomLoadingView,
	readerOnOK,
	inline,
	spinnerScale,
}: LoadingProps) {
	const [hasLoaded, setLoaded] = useState<boolean>(false);
	const [hasError, setError] = useState<boolean>(false);
	const [data, setData] = useState<any>();

	useEffect(() => {
		if (!hasLoaded) {
			fetch()
				.then((responses) => handleResponses(responses, readerOnOK))
				.then((response: any) => {
					console.log('loadingComponent', response);

					setData(response);
					setLoaded(true);
				})
				.catch((exception) => {
					console.log(exception);

					setError(true);
					handleError(exception);
				});
		}
	}, [hasLoaded]);

	if (hasError) {
		return <GenericErrorScreen loggingMessage={false} />;
	}
	if (hasLoaded && hasValidData(data) && data != undefined) {
		return <LoadedView data={data} />;
	}
	if (CustomLoadingView) {
		return <CustomLoadingView />;
	}

	return (
		<DefaultLoadingView
			isInlineSpinner={!!inline}
			loadingMessage={loadingMessage}
			spinnerScale={spinnerScale}
		/>
	);
}

function handleResponses(
	response: Response,
	readerOnOK: any,
): Promise<any> | null | undefined {
	if (hasBadResponse(response)) {
		throw new Error(`${response.status} (${response.statusText})`);
	}

	if (Array.isArray(response)) {
		return Promise.all(
			response.map((r) => handleSingleResponse(r, readerOnOK)),
		);
	}

	return handleSingleResponse(response, readerOnOK);
}

function hasBadResponse(responses: Response | Response[]) {
	if (Array.isArray(responses)) {
		return responses.some((response) => !response.ok);
	}

	return !responses.ok;
}

function handleSingleResponse(response: Response, readerOnOK: any) {
	const locationHeader = response.headers.get('Location');
	if (response.status === 401 && locationHeader && window !== undefined) {
		window.location.replace(locationHeader);
		return Promise.resolve(null);
	} else {
		return readerOnOK ? readerOnOK(response) : response.json();
	}
}

function handleError(error: Error | ErrorEvent | string): void {
	trackEvent({
		eventCategory: 'asyncLoader',
		eventAction: 'error',
		eventLabel: error ? error.toString() : undefined,
	});
	Sentry.captureException(error);
}

type DefaultLoadingViewProps = {
	isInlineSpinner: boolean;
	loadingMessage: string;
	spinnerScale?: number;
};

function DefaultLoadingView({
	isInlineSpinner,
	loadingMessage,
	spinnerScale,
}: DefaultLoadingViewProps) {
	return isInlineSpinner ? (
		<Spinner
			loadingMessage={loadingMessage}
			inline={isInlineSpinner}
			scale={spinnerScale}
		/>
	) : (
		<WithStandardTopMargin>
			<Spinner loadingMessage={loadingMessage} />
		</WithStandardTopMargin>
	);
}

// export function cmp() {
//     const [data, setData] = useState<any>(null);
//     useEffect(()=> {
//         if(data == null) {
//             setData([1, 2, 3, 4]);
//         }
//     },[data !== null]);
// }

// export const LoadingComponent = (props:any) => {
//     if(!!props && !!props.children && allMyChildrenHaveLoaded(props.children)) {
//         return(<>{props.children}</>)
//     }
//     return (
//         <div>Loading...</div>
//     );
// }

// function allMyChildrenHaveLoaded(children: any) {
//     return false;
// }

// export const TheComponent = () => {
//     const data = fetch();
//     if(data) {
//         return (<div>{data}</div);
//     }
//     return <LoadingComponent />
// }

// <Loader loadedCallback={}>
//     <TheComponent loadedCallback={} />
// </Loader>

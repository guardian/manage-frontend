import * as Sentry from "@sentry/browser";
import {useEffect, useState} from "react";
import {trackEvent} from "../../../utilities/analytics";

export default function useAsyncLoader<T>(
	promise: Promise<any>,
	returnJson?: boolean
): { data: T | null; error: any; loading: boolean } {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | ErrorEvent | string>();
	const [loading, setLoading] = useState<boolean>(false);

	function handleError(error: Error | ErrorEvent | string): void {
		setError(error);
		trackEvent({
			eventCategory: 'asyncLoader',
			eventAction: 'error',
			eventLabel: error ? error.toString() : undefined,
		});
		Sentry.captureException(error);
	}

	const processResponse = (
		resp: Response,
		_?: number, // index
		allResponses?: Response[],
		returnJson?: boolean
	) => {
		const locationHeader = resp.headers.get("Location");
		const allResponsesAreOK =
			(allResponses || [resp]).filter(res => !res.ok).length === 0;
		if (resp.status === 401 && locationHeader && window !== undefined) {
			window.location.replace(locationHeader);
			return Promise.resolve(null);
		} else if (allResponsesAreOK) {
			if (returnJson) {
				return resp.json();
			} else {
				return resp.text();
			}
		}
		throw new Error(`${resp.status} (${resp.statusText})`);
	};

	useEffect(() => {
		setLoading(true);
		promise
			.then(resp =>
				Array.isArray(resp)
					? resp.map(processResponse, returnJson)
					: processResponse(resp as Response, 0, undefined, returnJson)
			)
			.then(setData)
			.catch(e => handleError(e))
			.finally(() => setLoading(false));
	}, [promise]);

	return {data, error, loading};
}

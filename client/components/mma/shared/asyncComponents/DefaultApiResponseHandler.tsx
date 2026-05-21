import type { ResponseProcessor } from './ResponseProcessor';

export const JsonResponseHandler: ResponseProcessor = (
	response: Response | Response[],
) => {
	return handleResponses(response, (r: Response) => r.json());
};

export const TextResponseHandler: ResponseProcessor = (
	response: Response | Response[],
) => {
	return handleResponses(response, (r: Response) => r.text());
};

export function handleResponses<T>(
	response: Response | Response[],
	transformResponse: (response: Response) => Promise<T> | T,
): Promise<T | Array<T | null> | null> {
	return handleResponsesAsync(response, transformResponse);
}

function hasBadResponse(responses: Response | Response[]) {
	if (Array.isArray(responses)) {
		return responses.some(
			(response) =>
				!response.ok && !isHandledUnauthorizedRedirect(response),
		);
	}

	return !responses.ok && !isHandledUnauthorizedRedirect(responses);
}

async function handleResponsesAsync<T>(
	response: Response | Response[],
	transformResponse: (response: Response) => Promise<T> | T,
): Promise<T | Array<T | null> | null> {
	if (hasBadResponse(response)) {
		throw await buildInvalidApiResponseError(response);
	}

	if (Array.isArray(response)) {
		return Promise.all(
			response.map((r) => handleSingleResponse(r, transformResponse)),
		);
	}

	return handleSingleResponse(response, transformResponse);
}

async function buildInvalidApiResponseError(
	response: Response | Response[],
): Promise<Error> {
	if (Array.isArray(response)) {
		const badResponses = response.filter(
			(r) => !r.ok && !isHandledUnauthorizedRedirect(r),
		);
		const responseSummaries = await Promise.all(
			badResponses.map(getResponseErrorSummary),
		);
		return new Error(
			`Invalid API response: ${responseSummaries.join(' | ')}`,
		);
	}

	return new Error(
		`Invalid API response: ${await getResponseErrorSummary(response)}`,
	);
}

async function getResponseErrorSummary(response: Response): Promise<string> {
	const statusText = response.statusText ? ` ${response.statusText}` : '';
	const url = response.url || 'unknown URL';
	return `${response.status}${statusText} for ${url}`;
}

function isHandledUnauthorizedRedirect(response: Response): boolean {
	return (
		response.status === 401 &&
		Boolean(response.headers.get('Location')) &&
		typeof window !== 'undefined'
	);
}

function handleSingleResponse<T>(
	response: Response,
	transformResponse: (r: Response) => Promise<T> | T,
): Promise<T | null> | T {
	const locationHeader = response.headers.get('Location');
	if (
		response.status === 401 &&
		locationHeader &&
		typeof window !== 'undefined'
	) {
		window.location.replace(locationHeader);
		return Promise.resolve(null);
	} else {
		return transformResponse(response);
	}
}

export type ResponseProcessor = (
	response: Response | Response[],
) => Promise<unknown>;
type ResponseTransformer = (response: Response) => Promise<unknown>;

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

export function handleResponses(
	response: Response | Response[],
	transformResponse: ResponseTransformer,
) {
	if (hasBadResponse(response)) {
		throw new Error('Invalid API response');
	}

	if (Array.isArray(response)) {
		return Promise.all(
			response.map((r) => handleSingleResponse(r, transformResponse)),
		);
	}

	return handleSingleResponse(response, transformResponse);
}

function hasBadResponse(responses: Response | Response[]) {
	if (Array.isArray(responses)) {
		return responses.some((response) => !response.ok);
	}

	return !responses.ok;
}

function handleSingleResponse(
	response: Response,
	transformResponse: ResponseTransformer,
) {
	const locationHeader = response.headers.get('Location');
	if (response.status === 401 && locationHeader && window !== undefined) {
		window.location.replace(locationHeader);
		return Promise.resolve(null);
	} else {
		return transformResponse(response);
	}
}

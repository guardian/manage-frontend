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

export function handleResponses(
	response: Response | Response[],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're assuming the transformResponse attribute's output can be of multiple types
	transformResponse: (response: Response) => any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we don't know the final output of the promise?
): Promise<any> {
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
	transformResponse: (r: Response) => any,
) {
	const locationHeader = response.headers.get('Location');
	if (response.status === 401 && locationHeader && window !== undefined) {
		window.location.replace(locationHeader);
		return Promise.resolve(null);
	} else {
		return transformResponse(response);
	}
}

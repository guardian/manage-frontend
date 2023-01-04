import type ResultHandler from './ResultHandler';

export const JsonResponseHandler: ResultHandler = (response: Response) => {
	return handleAResponses(response, (r: Response) => r.json());
};

export const TextResponseHandler: ResultHandler = (response: Response) => {
	return handleAResponses(response, (r: Response) => r.text());
};

function handleAResponses(
	response: Response,
	transformResponse: any,
): Promise<any> {
	if (hasBadResponse(response)) {
		throw new Error(`${response.status} (${response.statusText})`);
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

function handleSingleResponse(response: Response, transformResponse: any) {
	const locationHeader = response.headers.get('Location');
	if (response.status === 401 && locationHeader && window !== undefined) {
		window.location.replace(locationHeader);
		return Promise.resolve(null);
	} else {
		return transformResponse(response);
	}
}

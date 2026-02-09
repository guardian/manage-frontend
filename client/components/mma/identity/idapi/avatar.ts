import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { base64FromFile } from '@/shared/fileUploadUtils';
import { ErrorTypes } from '../models';

interface AvatarAPIErrorResponse {
	message: string;
	errors: string[];
}

interface AvatarValidationError {
	type: ErrorTypes.VALIDATION;
	error: string[];
}

interface AvatarNotFoundError {
	type: ErrorTypes.NOT_FOUND;
	error: string[];
}

type AvatarError = AvatarValidationError | AvatarNotFoundError;

const isAvatarAPIErrorResponse = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we rely on Avatar returning something; we check to see if it is an error response
	response: any,
): response is AvatarAPIErrorResponse => {
	if (response.message && response.errors) {
		return response.errors.length > 0;
	}
	return false;
};

const isAvatarNotFoundError = (error: AvatarAPIErrorResponse): boolean => {
	return error.message === 'Avatar not found';
};

const toAvatarError = (e: AvatarAPIErrorResponse): AvatarError => {
	const { NOT_FOUND, VALIDATION } = ErrorTypes;
	let type;
	if (isAvatarNotFoundError(e)) {
		type = NOT_FOUND;
	} else {
		type = VALIDATION;
	}
	return {
		type,
		error: e.errors,
	} as AvatarError;
};

export const read = async () => {
	const url = '/aapi/avatar';
	const response = await fetchWithDefaultParameters(url).then((res) =>
		res.json(),
	);
	if (isAvatarAPIErrorResponse(response)) {
		const avatarErrorObj = toAvatarError(response);
		throw new Error(
			`Error: ${avatarErrorObj.type} - ${JSON.stringify(avatarErrorObj.error)}`,
		);
	}
	return response;
};

export const write = async (file: File | null) => {
	if (!file) {
		throw new Error('No file selected. Please choose an image to upload.');
	}
	const url = '/aapi/avatar';
	const payload = {
		name: file.name,
		type: file.type,
		contents: (await base64FromFile(file)) as string,
	};
	// We send the request as a text/plain to avoid triggering the Express JSON parser
	// which would try to parse the payload as JSON and fail. We instead parse the body
	// in the route handler.
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'text/plain;charset=UTF-8',
		},
	}).then((res) => res.json());
	if (isAvatarAPIErrorResponse(response)) {
		const avatarErrorObj = toAvatarError(response);
		throw new Error(
			`Error: ${avatarErrorObj.type} - ${JSON.stringify(avatarErrorObj.error)}`,
		);
	}
};

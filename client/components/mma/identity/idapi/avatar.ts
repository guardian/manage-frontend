import { IdentityLocations } from '../IdentityLocations';
import { ErrorTypes } from '../models';
import { APIFetch, APIFilePostOptions, APIUseCredentials } from './fetch';

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

const avatarFetch = APIFetch(IdentityLocations.AVATAR);

export const read = async () => {
	const url = '/v1/avatars/user/me/active';
	const options = APIUseCredentials({});
	try {
		return await avatarFetch(url, options);
	} catch (e) {
		throw isAvatarAPIErrorResponse(e) ? toAvatarError(e) : e;
	}
};

export const write = async (file: File) => {
	const url = '/v1/avatars';
	const options = APIUseCredentials(APIFilePostOptions(file));
	try {
		await avatarFetch(url, options);
	} catch (e) {
		throw isAvatarAPIErrorResponse(e) ? toAvatarError(e) : e;
	}
};

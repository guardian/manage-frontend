import { IdentityLocations } from "../IdentityLocations";
import { ErrorTypes } from "../models";
import { APIFetch, APIFilePostOptions, APIUseCredentials } from "./fetch";

interface AvatarAPIErrorResponse {
  message: string;
  errors: string[];
}

interface AvatarGeneralError {
  type: ErrorTypes.VALIDATION;
  error: string[];
}

interface AvatarNotFoundError {
  type: ErrorTypes.NOT_FOUND;
  error: string[];
}

const isAvatarAPIErrorResponse = (
  response: any
): response is AvatarAPIErrorResponse => {
  if (response.message && response.errors) {
    return response.errors.length > 0;
  }
  return false;
};

const isAvatarNotFoundError = (error: AvatarAPIErrorResponse): boolean => {
  return error.message === "Avatar not found";
};

const avatarApiErrorToAvatarGeneralError = (
  apiError: AvatarAPIErrorResponse
): AvatarGeneralError => {
  return {
    type: ErrorTypes.VALIDATION,
    error: apiError.errors
  };
};

const avatarApiErrorToAvatarNotFoundError = (
  apiError: AvatarAPIErrorResponse
): AvatarNotFoundError => {
  return {
    type: ErrorTypes.NOT_FOUND,
    error: apiError.errors
  };
};

const avatarFetch = APIFetch(IdentityLocations.AVATAR);

export const read = async () => {
  const url = "/v1/avatars/user/me/active";
  const options = APIUseCredentials({});
  try {
    return await avatarFetch(url, options);
  } catch (e) {
    if (isAvatarAPIErrorResponse(e)) {
      throw isAvatarNotFoundError(e)
        ? avatarApiErrorToAvatarNotFoundError(e)
        : avatarApiErrorToAvatarGeneralError(e);
    } else {
      throw e;
    }
  }
};

export const write = async (file: File) => {
  const url = "/v1/avatars";
  const options = APIUseCredentials(APIFilePostOptions(file));
  try {
    await avatarFetch(url, options);
  } catch (e) {
    throw isAvatarAPIErrorResponse(e)
      ? avatarApiErrorToAvatarGeneralError(e)
      : e;
  }
};

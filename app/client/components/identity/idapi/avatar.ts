import { IdentityLocations } from "../IdentityLocations";
import { ErrorTypes } from "../models";
import { APIFetch, APIFilePostOptions, APIUseCredentials } from "./fetch";

interface AvatarAPIErrorResponse {
  message: string;
  errors: string[];
}

interface AvatarError {
  type: ErrorTypes.VALIDATION;
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

const avatarApiErrorToAvatarError = (
  apiError: AvatarAPIErrorResponse
): AvatarError => {
  return {
    type: ErrorTypes.VALIDATION,
    error: apiError.errors
  };
};

const avatarFetch = APIFetch(IdentityLocations.AVATAR);

export const read = async () => {
  const url = "/v1/avatars/user/me/active";
  const options = APIUseCredentials({});
  return await avatarFetch(url, options);
};

export const write = async (file: File) => {
  const url = "/v1/avatars";
  const options = APIUseCredentials(APIFilePostOptions(file));
  try {
    await avatarFetch(url, options);
  } catch (e) {
    throw isAvatarAPIErrorResponse(e) ? avatarApiErrorToAvatarError(e) : e;
  }
};

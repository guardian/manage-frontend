import { IdentityLocations } from "../IdentityLocations";
import { APIFetch, APIFilePostOptions, APIUseCredentials } from "./fetch";

const avatarFetch = APIFetch(IdentityLocations.AVATAR);

export const read = async () => {
  const url = "/v1/avatars/user/me/active";
  const options = APIUseCredentials({});
  return await avatarFetch(url, options);
};

export const write = async (file: File) => {
  const url = "/v1/avatars";
  const options = APIFilePostOptions(file);
  await avatarFetch(url, options);
};

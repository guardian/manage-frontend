import { IdentityLocations } from "../IdentityLocations";
import { APIFetch, APIFilePostOptions } from "./fetch";

const avatarFetch = APIFetch(IdentityLocations.AVATAR);

export const write = async (file: File) => {
  const url = "/v1/avatars";
  const options = APIFilePostOptions(file);
  await avatarFetch(url, options);
};

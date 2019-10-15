import { identityFetch } from "./fetch";

export const remove = async () => {
  const url = "/user/me/telephoneNumber";
  const options = {
    method: "DELETE"
  };
  return await identityFetch(url, options);
};

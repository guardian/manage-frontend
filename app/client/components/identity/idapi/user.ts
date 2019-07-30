import { User } from "../models";
import { APIUseCredentials, identityFetch } from "./fetch";

export const read = async (): Promise<User> => {
  const url = "/user/me";
  const data = await identityFetch(url, APIUseCredentials({}));
  const consents = data.user.consents
    .filter((consent: any) => consent.consented)
    .map((consent: any) => consent.id);
  return {
    email: data.user.primaryEmailAddress,
    consents,
    validated: data.user.statusFields.userEmailValidated
  };
};

const memoizedRead = (): (() => Promise<User>) => {
  let user: Promise<User> | undefined;
  return (): Promise<User> => {
    if (user === undefined) {
      user = read();
    }
    return Promise.resolve(user);
  };
};

export const memoRead = memoizedRead();

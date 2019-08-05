import { User } from "../models";
import { APIUseCredentials, identityFetch } from "./fetch";

interface UserAPIResponse {
  user: {
    consents: [
      {
        id: string;
        consented: boolean;
      }
    ];
    primaryEmailAddress: string;
    statusFields: {
      userEmailValidated: boolean;
    };
  };
}

export const read = async (): Promise<User> => {
  const url = "/user/me";
  const response: UserAPIResponse = await identityFetch(
    url,
    APIUseCredentials({})
  );
  const consents = response.user.consents
    .filter((consent: any) => consent.consented)
    .map((consent: any) => consent.id);
  return {
    email: response.user.primaryEmailAddress,
    consents,
    validated: response.user.statusFields.userEmailValidated
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

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

const getConsentedTo = (response: UserAPIResponse) => {
  if ("consents" in response.user) {
    return response.user.consents
      .filter((consent: any) => consent.consented)
      .map((consent: any) => consent.id);
  } else {
    return [];
  }
};

export const read = async (): Promise<User> => {
  const url = "/user/me";
  const response: UserAPIResponse = await identityFetch(
    url,
    APIUseCredentials({})
  );
  const consents = getConsentedTo(response);
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

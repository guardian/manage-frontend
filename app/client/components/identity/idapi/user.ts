import { User } from "../models";
import { APIPostOptions, APIUseCredentials, identityFetch } from "./fetch";

interface UserAPIResponse {
  user: {
    consents: [
      {
        id: string;
        consented: boolean;
      }
    ];
    publicFields: {
      aboutMe: string;
      interests: string;
      location: string;
    };
    primaryEmailAddress: string;
    statusFields: {
      userEmailValidated: boolean;
    };
  };
}

interface UserAPIRequest {
  publicFields: {
    aboutMe: string;
    interests: string;
    location: string;
  };
}

const userToUserAPIRequest = (user: User): UserAPIRequest => ({
  publicFields: {
    aboutMe: user.aboutMe,
    interests: user.interests,
    location: user.location
  }
});

const getConsentedTo = (response: UserAPIResponse) => {
  if ("consents" in response.user) {
    return response.user.consents
      .filter((consent: any) => consent.consented)
      .map((consent: any) => consent.id);
  } else {
    return [];
  }
};

export const write = async (user: User): Promise<void> => {
  const url = "/user/me";
  const body = userToUserAPIRequest(user);
  const options = APIUseCredentials(APIPostOptions(body));
  await identityFetch(url, options);
};

export const read = async (): Promise<User> => {
  const url = "/user/me";
  const response: UserAPIResponse = await identityFetch(
    url,
    APIUseCredentials({})
  );
  const consents = getConsentedTo(response);
  const { user } = response;
  return {
    email: user.primaryEmailAddress,
    location: user.publicFields.location,
    aboutMe: user.publicFields.aboutMe,
    interests: user.publicFields.interests,
    consents,
    validated: user.statusFields.userEmailValidated
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

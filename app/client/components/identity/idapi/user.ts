import { User } from "../models";
import { APIPostOptions, APIUseCredentials, identityFetch } from "./fetch";

interface UserAPIResponse {
  user: {
    id: string;
    consents: [
      {
        id: string;
        consented: boolean;
      }
    ];
    publicFields: {
      aboutMe?: string;
      interests?: string;
      location?: string;
      username?: string;
    };
    primaryEmailAddress: string;
    statusFields: {
      userEmailValidated: boolean;
    };
  };
}

interface UserAPIRequest {
  publicFields: {
    aboutMe?: string;
    username?: string;
    interests?: string;
    location?: string;
  };
}

const userToUserAPIRequest = (user: Partial<User>): UserAPIRequest => ({
  publicFields: {
    aboutMe: user.aboutMe,
    interests: user.interests,
    location: user.location,
    username: user.username
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

export const write = async (user: Partial<User>): Promise<void> => {
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
    id: user.id,
    email: user.primaryEmailAddress,
    location: user.publicFields.location || "",
    aboutMe: user.publicFields.aboutMe || "",
    interests: user.publicFields.interests || "",
    username: user.publicFields.username || "",
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

import { ErrorTypes, User, UserError } from "../models";
import {
  APIPutOptions,
  APIUseCredentials,
  APIUseXSRFHeader,
  localFetch
} from "./fetch";

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

interface UserAPIErrorResponse {
  status: string;
  errors: Array<{
    context: string;
    description: string;
    [key: string]: string;
  }>;
}

export const isErrorResponse = (error: any): error is UserAPIErrorResponse => {
  return error.status && error.status === "error";
};

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

const getFieldNameFromContext = (context: string): string => {
  return context.split(".").pop() as string;
};

const userAPIErrorToUserError = (response: UserAPIErrorResponse): UserError => {
  const error = response.errors.reduce(
    (a, e) => {
      return {
        ...a,
        [getFieldNameFromContext(e.context)]: e.description
      };
    },
    {} as UserError["error"]
  );
  return {
    type: ErrorTypes.VALIDATION,
    error
  };
};

export const write = async (user: Partial<User>): Promise<void> => {
  const url = "/idapi/user";
  const body = userToUserAPIRequest(user);
  const options = APIUseXSRFHeader(APIUseCredentials(APIPutOptions(body)));
  try {
    await localFetch(url, options);
  } catch (e) {
    throw isErrorResponse(e) ? userAPIErrorToUserError(e) : e;
  }
};

export const read = async (): Promise<User> => {
  const url = "/idapi/user";
  const response: UserAPIResponse = await localFetch(
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

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
    privateFields: {
      firstName?: string;
      secondName?: string;
      address1?: string;
      address2?: string;
      address3?: string;
      address4?: string;
      postcode?: string;
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
  privateFields: {
    firstName?: string;
    secondName?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    postcode?: string;
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
  },
  privateFields: {
    firstName: user.firstName,
    secondName: user.secondName,
    address1: user.address1,
    address2: user.address2,
    address3: user.address3,
    address4: user.address4,
    postcode: user.postcode
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
    firstName: user.privateFields.firstName || "",
    secondName: user.privateFields.secondName || "",
    address1: user.privateFields.address1 || "",
    address2: user.privateFields.address2 || "",
    address3: user.privateFields.address3 || "",
    address4: user.privateFields.address4 || "",
    postcode: user.privateFields.postcode || "",
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

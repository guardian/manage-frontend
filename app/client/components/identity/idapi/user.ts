import { ErrorTypes, User, UserError } from "../models";
import {
  APIPutOptions,
  APIUseCredentials,
  APIUseXSRFHeader,
  localFetch
} from "./fetch";

type UserPublicFields = Partial<
  Pick<User, "aboutMe" | "interests" | "location" | "username">
>;

type UserPrivateFields = Partial<
  Pick<
    User,
    | "title"
    | "firstName"
    | "secondName"
    | "address1"
    | "address2"
    | "address3"
    | "address4"
    | "postcode"
    | "country"
  >
> & {
  telephoneNumber?: {
    countryCode: string;
    localNumber: string;
  };
};

interface UserAPIResponse {
  user: {
    id: string;
    consents: [
      {
        id: string;
        consented: boolean;
      }
    ];
    publicFields: UserPublicFields;
    privateFields: UserPrivateFields;
    primaryEmailAddress: User["primaryEmailAddress"];
    statusFields: {
      userEmailValidated: boolean;
    };
  };
}

interface UserAPIRequest {
  publicFields: UserPublicFields;
  privateFields: UserPrivateFields;
  primaryEmailAddress?: User["primaryEmailAddress"];
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

const toUserApiRequest = (user: Partial<User>): UserAPIRequest => {
  const { phoneCountryCode: countryCode, phoneLocalNumber: localNumber } = user;
  const telephoneNumber =
    countryCode && localNumber ? { countryCode, localNumber } : undefined;

  return {
    publicFields: {
      aboutMe: user.aboutMe,
      interests: user.interests,
      location: user.location,
      username: user.username
    },
    privateFields: {
      title: user.title,
      firstName: user.firstName,
      secondName: user.secondName,
      address1: user.address1,
      address2: user.address2,
      address3: user.address3,
      address4: user.address4,
      postcode: user.postcode,
      country: user.country,
      telephoneNumber
    },
    primaryEmailAddress: user.primaryEmailAddress
  };
};

const toUser = (response: UserAPIResponse): User => {
  const consents = getConsentedTo(response);
  const { user } = response;
  const { telephoneNumber } = user.privateFields;
  return {
    id: user.id,
    primaryEmailAddress: user.primaryEmailAddress,
    location: user.publicFields.location || "",
    aboutMe: user.publicFields.aboutMe || "",
    interests: user.publicFields.interests || "",
    username: user.publicFields.username || "",
    title: user.privateFields.title || "",
    firstName: user.privateFields.firstName || "",
    secondName: user.privateFields.secondName || "",
    address1: user.privateFields.address1 || "",
    address2: user.privateFields.address2 || "",
    address3: user.privateFields.address3 || "",
    address4: user.privateFields.address4 || "",
    postcode: user.privateFields.postcode || "",
    country: user.privateFields.country || "",
    phoneCountryCode: telephoneNumber ? telephoneNumber.countryCode : "",
    phoneLocalNumber: telephoneNumber ? telephoneNumber.localNumber : "",
    consents,
    validated: user.statusFields.userEmailValidated
  };
};

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

const toUserError = (response: UserAPIErrorResponse): UserError => {
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
  const body = toUserApiRequest(user);
  const options = APIUseXSRFHeader(APIUseCredentials(APIPutOptions(body)));
  try {
    await localFetch(url, options);
  } catch (e) {
    throw isErrorResponse(e) ? toUserError(e) : e;
  }
};

export const read = async (): Promise<User> => {
  const url = "/idapi/user";
  const response: UserAPIResponse = await localFetch(
    url,
    APIUseCredentials({})
  );
  return toUser(response);
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

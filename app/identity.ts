import { decode } from "base-64";

import { parse as parseCookie } from "es-cookie";
export interface IdentityUser {
  readonly GU_U: string;
  readonly SC_GU_U: string;
  expiry: number;
}

export enum IdentityError {
  Expired,
  CouldNotParse,
  NotLoggedIn
}
const keys = {
  GU: "GU_U",
  SC: "SC_GU_U"
};

export function isUser(x: any): x is IdentityUser {
  return x.hasOwnProperty("SC_GU_U");
}

export const getUser: (
  cookies: string
) => IdentityUser | IdentityError = cookies => {
  const cookieJar = parseCookie(cookies);
  const GU_U = cookieJar[keys.GU];
  const SC_GU_U = cookieJar[keys.SC];

  if (GU_U == null || SC_GU_U == null) {
    return IdentityError.NotLoggedIn;
  }

  if (typeof GU_U !== "string") {
    return IdentityError.CouldNotParse;
  }
  if (typeof SC_GU_U !== "string") {
    return IdentityError.CouldNotParse;
  }

  const [encodedToken] = SC_GU_U.split(".");
  const cookieString = decode(encodedToken);

  const parsed = (_ => {
    try {
      return JSON.parse(_);
    } catch (e) {
      return null;
    }
  })(cookieString);

  if (!(Array.isArray(parsed) && parsed.length !== 2)) {
    return IdentityError.CouldNotParse;
  }

  const [id, expires] = parsed;
  if (parsed == null) {
    return IdentityError.CouldNotParse;
  }
  const expiry = parseInt(expires, 10);
  const remaining = expiry - new Date().getTime();
  if (remaining < 0) {
    return IdentityError.Expired;
  }

  return {
    GU_U,
    SC_GU_U,
    expiry
  };
};

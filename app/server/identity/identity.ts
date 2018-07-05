import { decode } from "base-64";
import { parse as parseCookie } from "es-cookie";

const ONE_HOUR = 3600000;

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
  cookies: string | undefined
) => IdentityUser | IdentityError = cookies => {
  if (cookies == null) {
    return IdentityError.NotLoggedIn;
  }

  const cookieJar = parseCookie(cookies);
  const GU_U = cookieJar[keys.GU];
  const SC_GU_U = cookieJar[keys.SC];

  if (GU_U == null || SC_GU_U == null) {
    return IdentityError.NotLoggedIn;
  }

  const [encodedToken] = SC_GU_U.split(".");
  const cookieString = safely(() => decode(encodedToken));
  if (cookieString == null) {
    return IdentityError.CouldNotParse;
  }
  const parsed = safely(() => JSON.parse(cookieString));
  if (parsed == null) {
    return IdentityError.CouldNotParse;
  }
  if (!(Array.isArray(parsed) && parsed.length === 2)) {
    return IdentityError.CouldNotParse;
  }

  const [id, expires] = parsed;
  if (expires == null) {
    return IdentityError.CouldNotParse;
  }

  const expiry = safely(() => parseInt(expires, 10));
  if (expiry == null) {
    return IdentityError.CouldNotParse;
  }

  const remaining = expiry - new Date().getTime();
  if (remaining < ONE_HOUR) {
    return IdentityError.Expired;
  }

  return {
    GU_U,
    SC_GU_U,
    expiry
  };
};

const safely: <T>(f: () => T) => T | null = f => {
  try {
    return f();
  } catch (e) {
    return null;
  }
};

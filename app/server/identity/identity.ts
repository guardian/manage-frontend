import { decode } from "base-64";
import { parse as parseCookie } from "es-cookie";

export const ONE_HOUR = 3600000;

export interface IdentityUser {
  readonly GU_U: string;
  readonly SC_GU_U: string;
  readonly SC_GU_LA: string;
}

export enum IdentityError {
  Expired,
  CouldNotParse,
  NotLoggedIn
}
const keys = {
  GU_U: "GU_U",
  SC_GU_U: "SC_GU_U",
  SC_GU_LA: "SC_GU_LA"
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
  const GU_U = cookieJar[keys.GU_U];
  const SC_GU_U = cookieJar[keys.SC_GU_U];
  const SC_GU_LA = cookieJar[keys.SC_GU_LA];

  if (GU_U == null || SC_GU_U == null || SC_GU_LA == null) {
    return IdentityError.NotLoggedIn;
  }

  const scGuUExpiryError = checkScGuUExpiry(SC_GU_U);
  if (scGuUExpiryError !== undefined) {
    return scGuUExpiryError;
  }

  const scGuLaExpiryError = checkScGuLaExpiry(SC_GU_LA);
  if (scGuLaExpiryError !== undefined) {
    return scGuLaExpiryError;
  }

  return {
    GU_U,
    SC_GU_U,
    SC_GU_LA
  };
};

const safely: <T>(f: () => T) => T | null = f => {
  try {
    return f();
  } catch (e) {
    return null;
  }
};

export const checkScGuUExpiry: (
  SC_GU_U: string
) => IdentityError | undefined = (SC_GU_U: string) => {
  const scGuGuStr = safely(() => decode(SC_GU_U.split(".", 1)[0]));
  if (scGuGuStr == null) {
    return IdentityError.CouldNotParse;
  }
  const scGuGuParsed = safely(() => JSON.parse(scGuGuStr));
  if (
    scGuGuParsed == null ||
    !Array.isArray(scGuGuParsed) ||
    scGuGuParsed.length !== 2
  ) {
    return IdentityError.CouldNotParse;
  }
  const [identityID, expires] = scGuGuParsed;
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
};

export const checkScGuLaExpiry: (
  SC_GU_LA: string
) => IdentityError | undefined = (SC_GU_LA: string) => {
  const scGuLaStr = safely(() => decode(SC_GU_LA.split(".")[0]));
  if (scGuLaStr == null) {
    return IdentityError.CouldNotParse;
  }
  const scGuLaParsed = safely(() => JSON.parse(scGuLaStr));
  if (
    scGuLaParsed == null ||
    !Array.isArray(scGuLaParsed) ||
    scGuLaParsed.length !== 3
  ) {
    return IdentityError.CouldNotParse;
  }
  const [la, id, lastAuthTimestampStr] = scGuLaParsed;
  if (lastAuthTimestampStr == null) {
    return IdentityError.CouldNotParse;
  }
  const lastAuthTimestamp = safely(() => parseInt(lastAuthTimestampStr, 10));
  if (lastAuthTimestamp == null) {
    return IdentityError.CouldNotParse;
  }

  const reauthDeadline = lastAuthTimestamp + ONE_HOUR;
  if (reauthDeadline < new Date().getTime()) {
    return IdentityError.Expired;
  }
};

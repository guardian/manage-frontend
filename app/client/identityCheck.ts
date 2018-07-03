import { Globals } from "../globals";
import { getUser, IdentityError, isUser } from "../identity";

declare global {
  interface Window {
    guardian: Globals;
  }
}

const domain = window.guardian.domain;

export const forceReauthenticate = () => {
  const location = encodeURIComponent(window.location.href);

  // tslint:disable-next-line:no-object-mutation
  window.location.href = `https://profile.${domain}/reauthenticate?returnUrl=${location}`;
};

export const refresh = async () => {
  fetch(`https://idapi.${domain}/user/me?refreshCookie=true`, {
    method: "GET",
    credentials: "include"
  });
};

export const check = async () => {
  const cookies = document.cookie;
  const userOrError = getUser(cookies);
  if (isUser(userOrError)) {
    const remaining = userOrError.expiry - new Date().getTime();
    if (remaining < 6000) {
      return refresh();
    }
  } else {
    forceReauthenticate();
    return false;
  }
  return true;
};

import Cookies from "universal-cookie";

export interface IdentityUser {
  readonly GU_U: string;
  readonly SC_GU_U: string;
}

export const getUser: (cookies: Cookies) => IdentityUser = cookies => {
  const GU_U = cookies.get("GU_U", { doNotParse: true });
  const SC_GU_U = cookies.get("SC_GU_U", { doNotParse: true });
};

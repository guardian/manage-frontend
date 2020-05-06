import { isIdentityInAccountOverviewTest } from "../shared/accountOverviewRelease";

export const isInAccountOverviewTest = () => {
  const globals = typeof window !== "undefined" ? window.guardian : undefined;
  return isIdentityInAccountOverviewTest(globals?.identityDetails?.userId);
};

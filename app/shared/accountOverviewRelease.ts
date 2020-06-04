const TEST_IDENTITY_ID_SUFFIXES = ["0", "3", "5", "7", "9"];

export const isIdentityInAccountOverviewTest = (
  identityID: string | undefined
) =>
  TEST_IDENTITY_ID_SUFFIXES.filter(
    suffix => identityID && identityID.endsWith(suffix)
  ).length > 0 || true;

import { encode } from "base-64";
import {
  checkScGuLaExpiry,
  checkScGuUExpiry,
  IdentityError,
  ONE_HOUR
} from "../../identity/identity";

const createFakeCookie = (
  epochTimestampPart: number,
  ...prefixParts: string[]
) =>
  encode(
    // base64
    JSON.stringify([...prefixParts, "identityID", epochTimestampPart])
  );

test("unparseable cookies", () => {
  const unparseableCookie = "garbage";

  expect(checkScGuUExpiry(unparseableCookie)).toBe(IdentityError.CouldNotParse);
  expect(checkScGuLaExpiry(unparseableCookie)).toBe(
    IdentityError.CouldNotParse
  );
});

test("expired SC_GU_U cookie", () => {
  const expiredScGuUCookie = createFakeCookie(
    new Date().getTime() // expiring now
  );

  expect(checkScGuUExpiry(expiredScGuUCookie)).toBe(IdentityError.Expired);
});

test("non-expired SC_GU_U cookie", () => {
  const expiredScGuUCookie = createFakeCookie(
    new Date().getTime() + ONE_HOUR * 3 // expiring 3hours from now,
  );

  expect(checkScGuUExpiry(expiredScGuUCookie)).toBeUndefined();
});

test("reauth required based on SC_GU_LA cookie", () => {
  const reAuthScGuLaCookie = createFakeCookie(
    new Date().getTime() - ONE_HOUR * 2, // last logged in 2 hours ago
    "LA"
  );

  expect(checkScGuLaExpiry(reAuthScGuLaCookie)).toBe(IdentityError.Expired);
});

test("no reauth required based on SC_GU_LA cookie", () => {
  const freshSignInScGuLaCookie = createFakeCookie(
    new Date().getTime(), // signed in just now
    "LA"
  );

  expect(checkScGuLaExpiry(freshSignInScGuLaCookie)).toBeUndefined();
});

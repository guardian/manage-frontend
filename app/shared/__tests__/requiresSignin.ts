import { requiresSignin } from "../requiresSignin";

describe("requiresSignin", () => {
  test("returns false for public path", () => {
    expect(requiresSignin("/contact-us-form")).toEqual(false);
  });

  test("returns true for account overview (base path)", () => {
    expect(requiresSignin("/")).toEqual(true);
  });

  test("returns true for billing", () => {
    expect(requiresSignin("/billing")).toEqual(true);
  });

  test("returns true for public path with too many sub levels", () => {
    expect(requiresSignin("/contact-us-form/1/2/3/4")).toEqual(true);
  });
});

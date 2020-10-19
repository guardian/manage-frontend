import { requiresSignin } from "../requiresSignin";

describe("requiresSignin", () => {
  test("returns false for a public path", () => {
    expect(requiresSignin("/contact-us")).toEqual(false);
  });

  test("returns false for a folder inside a public path", () => {
    expect(requiresSignin("/contact-us/1/")).toEqual(false);
  });

  test("returns true for a private path (base path)", () => {
    expect(requiresSignin("/")).toEqual(true);
  });

  test("returns true for a private path (non base path)", () => {
    expect(requiresSignin("/billing")).toEqual(true);
  });

  test("returns true for a private path hidden within a public path (path traversal attack)", () => {
    expect(requiresSignin("/contact-us/../billing")).toEqual(true);
  });
});

import { augmentRedirectURL } from "../../middleware/identityMiddleware";

const gulocalDomain = "thegulocal.com";
const codeDomain = "code.dev-theguardian.com";

const profilePrefix = "https://profile.";

const reauthPath = "reauthenticate";

const codeReauthURL = profilePrefix + codeDomain + "/" + reauthPath;

const requestedUrlSimple = {
  baseUrl: "baseUrl",
  path: "path",
  header: () => "header",
  get: () => "host",
  query: {}
};

test("should replace code.dev-theguardian.com with thegulocal.com in the augmented redirect URL", () => {
  expect(
    augmentRedirectURL(requestedUrlSimple, codeReauthURL, gulocalDomain, false)
  ).toContain(profilePrefix + gulocalDomain);
});

test("augmented URL should at least contain the simple input URL", () => {
  expect(
    augmentRedirectURL(requestedUrlSimple, codeReauthURL, codeDomain, false)
  ).toContain(codeReauthURL);
});

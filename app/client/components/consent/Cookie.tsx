const IAB_COOKIE_NAME = "euconsent";
const COOKIE_MAX_AGE = 395; // 13 months

// subset of https://github.com/guzzle/guzzle/pull/1131
const isValidCookieValue = (name: string): boolean =>
  !/[()<>@,;"\\/[\]?={} \t]/g.test(name);

const getShortDomain = (): string => {
  const domain = document.domain || "";

  return domain === "localhost"
    ? domain
    : ["", ...domain.split(".").slice(-2)].join(".");
};

const getDomainAttribute = (): string => {
  const shortDomain = getShortDomain();
  return shortDomain === "localhost" ? "" : ` domain=${shortDomain};`;
};

const writeVendorConsentCookie = (iabString: string): void => {
  addCookie(IAB_COOKIE_NAME, iabString);
};

const addCookie = (name: string, value: string): void => {
  const expires = new Date();

  if (!isValidCookieValue(name) || !isValidCookieValue(value)) {
    // tslint:disable-next-line: no-console
    console.log(`ERROR: Invalid cookie name or value. ${name}=${value}`);
    // TODO: Add error reporting
  }

  expires.setDate(expires.getDate() + COOKIE_MAX_AGE);

  // tslint:disable-next-line: no-object-mutation
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()};${getDomainAttribute()}`;
};

export { writeVendorConsentCookie };

import { _, isInUSA } from "../geolocation";

let mockGeoCookieValue: string | null = null;

jest.mock("../cookies", () => ({
  getCookie: jest.fn(() => mockGeoCookieValue)
}));

describe("Geolocation", () => {
  beforeEach(() => {
    mockGeoCookieValue = null;
    _.resetModule();
  });

  it("isInUSA returns true when user geolocation cookie is 'US'", () => {
    mockGeoCookieValue = "US";

    expect(isInUSA()).toBeTruthy();
  });

  it("isInUSA returns false when user geolocation cookie is not 'US'", () => {
    mockGeoCookieValue = "GB";

    expect(isInUSA()).toBeFalsy();
  });
});

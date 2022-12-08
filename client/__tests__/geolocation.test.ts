import { _, getGeoLocation, isInUSA } from '../utilities/geolocation';

let mockGeoCookieValue: string | null = null;

jest.mock('../cookies', () => ({
	getCookie: jest.fn(() => mockGeoCookieValue),
}));

describe('Geolocation', () => {
	beforeEach(() => {
		mockGeoCookieValue = null;
		_.resetModule();
	});

	it('getGeoLocation returns null when no geo location cookie is set', () => {
		expect(getGeoLocation()).toBeNull();
	});

	it('getGeoLocation returns the geolocation when a geo location cookie is set', () => {
		mockGeoCookieValue = 'GB';

		expect(getGeoLocation()).toBe('GB');
	});

	it("isInUSA returns true when user geolocation cookie is 'US'", () => {
		mockGeoCookieValue = 'US';

		expect(isInUSA()).toBeTruthy();
	});

	it("isInUSA returns false when user geolocation cookie is not 'US'", () => {
		mockGeoCookieValue = 'GB';

		expect(isInUSA()).toBeFalsy();
	});
});

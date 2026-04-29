import * as Sentry from '@sentry/browser';
import { setAnalyticsUserFromConsentDate } from '@/client/utilities/analytics';
import { getCookie } from '@/client/utilities/cookies';

jest.mock('@sentry/browser', () => ({
	setUser: jest.fn(),
}));

jest.mock('@/client/utilities/cookies', () => ({
	getCookie: jest.fn(),
}));

const mockedSetUser = jest.mocked(Sentry.setUser);
const mockedGetCookie = jest.mocked(getCookie);

describe('setAnalyticsUserFromConsentDate', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sets null when consentDate is missing', () => {
		mockedGetCookie.mockReturnValue(null);

		setAnalyticsUserFromConsentDate();
		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets consentDate when cookie is present', () => {
		mockedGetCookie.mockReturnValue('2026-02-25T10:51:50.552Z');

		setAnalyticsUserFromConsentDate();
		expect(mockedSetUser).toHaveBeenCalledWith({
			id: '2026-02-25T10:51:50.552Z',
		});
	});
});

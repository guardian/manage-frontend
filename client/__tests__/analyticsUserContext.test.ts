import * as Sentry from '@sentry/browser';
import { setAnalyticsUserFromBrowserId } from '@/client/utilities/analytics';
import { getCookie } from '@/client/utilities/cookies';

jest.mock('@sentry/browser', () => ({
	setUser: jest.fn(),
}));

jest.mock('@/client/utilities/cookies', () => ({
	getCookie: jest.fn(),
}));

const mockedSetUser = jest.mocked(Sentry.setUser);
const mockedGetCookie = jest.mocked(getCookie);

describe('setAnalyticsUserFromBrowserId', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sets null when browser id is missing', () => {
		mockedGetCookie.mockReturnValue(null);

		setAnalyticsUserFromBrowserId();
		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets browser id when cookie is present', () => {
		mockedGetCookie.mockReturnValue('browser-id-123');

		setAnalyticsUserFromBrowserId();
		expect(mockedSetUser).toHaveBeenCalledWith({
			id: 'browser-id-123',
		});
	});
});

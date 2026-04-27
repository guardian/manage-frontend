import * as Sentry from '@sentry/browser';
import { setAnalyticsUserFromIdentity } from '@/client/utilities/analytics';
import { isSignedIn } from '@/client/utilities/signInStatus';
import type { IdentityDetails } from '@/shared/globals';

jest.mock('@sentry/browser', () => ({
	setUser: jest.fn(),
}));

jest.mock('@/client/utilities/signInStatus', () => ({
	isSignedIn: jest.fn(),
}));

const mockedSetUser = jest.mocked(Sentry.setUser);
const mockedIsSignedIn = jest.mocked(isSignedIn);

describe('setAnalyticsUserFromIdentity', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sets null when user is not signed in', () => {
		mockedIsSignedIn.mockReturnValue(false);

		setAnalyticsUserFromIdentity({
			signInStatus: 'notSignedIn',
			userId: '12345',
			email: 'signed-out@example.com',
		});

		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets null when identity is missing', () => {
		mockedIsSignedIn.mockReturnValue(true);

		setAnalyticsUserFromIdentity(undefined);

		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets null when signed in but no id and email are available', () => {
		mockedIsSignedIn.mockReturnValue(true);

		const identityDetails: IdentityDetails = {
			signInStatus: 'signedInRecently',
		};

		setAnalyticsUserFromIdentity(identityDetails);

		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets id and email for signed-in users', () => {
		mockedIsSignedIn.mockReturnValue(true);

		const identityDetails: IdentityDetails = {
			signInStatus: 'signedInRecently',
			userId: '12345',
			email: 'person@example.com',
			displayName: 'Ignored User Name',
		};

		setAnalyticsUserFromIdentity(identityDetails);

		expect(mockedSetUser).toHaveBeenCalledWith({
			id: '12345',
			email: 'person@example.com',
		});
	});
});

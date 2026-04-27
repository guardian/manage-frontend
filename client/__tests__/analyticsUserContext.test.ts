import * as Sentry from '@sentry/browser';
import { setAnalyticsUserFromIdentity } from '@/client/utilities/analytics';
import type { IdentityDetails } from '@/shared/globals';

jest.mock('@sentry/browser', () => ({
	setUser: jest.fn(),
}));

const mockedSetUser = jest.mocked(Sentry.setUser);

describe('setAnalyticsUserFromIdentity', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sets null when user is not signed in', () => {
		setAnalyticsUserFromIdentity({
			signInStatus: 'notSignedIn',
			userId: '12345',
			email: 'signed-out@example.com',
		});

		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets null when identity is missing', () => {
		setAnalyticsUserFromIdentity(undefined);

		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets null when signed in but no id is available', () => {
		const identityDetails: IdentityDetails = {
			signInStatus: 'signedInRecently',
			email: 'person@example.com',
		};

		setAnalyticsUserFromIdentity(identityDetails);

		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('sets id for signed-in users', () => {
		const identityDetails: IdentityDetails = {
			signInStatus: 'signedInRecently',
			userId: '12345',
			email: 'person@example.com',
			displayName: 'Ignored User Name',
		};

		setAnalyticsUserFromIdentity(identityDetails);

		expect(mockedSetUser).toHaveBeenCalledWith({
			id: '12345',
		});
	});

	it('sets id for signedInNotRecently users', () => {
		const identityDetails: IdentityDetails = {
			signInStatus: 'signedInNotRecently',
			userId: '67890',
			email: 'person2@example.com',
		};

		setAnalyticsUserFromIdentity(identityDetails);

		expect(mockedSetUser).toHaveBeenCalledWith({
			id: '67890',
		});
	});
});

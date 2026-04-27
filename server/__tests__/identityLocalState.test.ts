/**
 * @jest-environment node
 */

import * as Sentry from '@sentry/node';
import type { Response } from 'express';
import {
	clearIdentityLocalState,
	setIdentityLocalState,
} from '@/server/identityLocalState';
import type { IdentityDetails } from '@/shared/globals';

jest.mock('@sentry/node', () => ({
	setUser: jest.fn(),
}));

const mockedSetUser = jest.mocked(Sentry.setUser);

describe('identityLocalState Sentry binding', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sets user with id and email when signed in', () => {
		const res = {
			locals: {},
		} as unknown as Response;
		const identityLocalState: IdentityDetails = {
			signInStatus: 'signedInRecently',
			userId: 'abc123',
			email: 'test@example.com',
			displayName: 'Ignored Name',
		};

		setIdentityLocalState(res, identityLocalState);

		expect(res.locals.identity).toEqual(identityLocalState);
		expect(mockedSetUser).toHaveBeenCalledWith({
			id: 'abc123',
			email: 'test@example.com',
		});
	});

	it('clears user when signed out identity is set', () => {
		const res = {
			locals: {},
		} as unknown as Response;
		const identityLocalState: IdentityDetails = {
			signInStatus: 'notSignedIn',
			userId: 'abc123',
			email: 'test@example.com',
		};

		setIdentityLocalState(res, identityLocalState);

		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});

	it('clears user when identity local state is cleared', () => {
		const res = {
			locals: {
				identity: {
					signInStatus: 'signedInRecently',
					userId: 'abc123',
					email: 'test@example.com',
				},
			},
		} as unknown as Response;

		clearIdentityLocalState(res);

		expect(res.locals.identity).toBeUndefined();
		expect(mockedSetUser).toHaveBeenCalledWith(null);
	});
});

/**
 * @jest-environment node
 */

import type { Jwt } from '@okta/jwt-verifier';
import type { Request, Response } from 'express';
import * as identityLocalState from '../identityLocalState';
import * as oauth from '../oauth';
import type { Scopes } from '../oauthConfig';
import { scopes } from '../oauthConfig';

const oktaConfig = {
	useOkta: true,
	orgUrl: 'https://example.com',
	authServerId: 'foo',
	clientId: 'bar',
	maxAge: 1800,
};

jest.mock('@/server/log');
jest.mock('@/server/idapiConfig', () => ({
	getConfig: () => ({
		idapiBaseUrl: 'https://idapi.example.com',
	}),
}));
jest.mock('@/server/oktaConfig', () => ({
	getConfig: () => oktaConfig,
}));

describe('sanitizeReturnPath', () => {
	it('returns / if the path is an absolute URL', () => {
		const path = oauth.sanitizeReturnPath('https://www.theguardian.com');
		expect(path).toEqual('/');
	});

	it('returns the path if it is valid', () => {
		const path = oauth.sanitizeReturnPath('/help-centre');
		expect(path).toEqual('/help-centre');
	});

	it('removes trailing slashes', () => {
		const path = oauth.sanitizeReturnPath('/help-centre/');
		expect(path).toEqual('/help-centre');
	});

	it('strips the query string', () => {
		const path = oauth.sanitizeReturnPath('/help-centre?foo=bar');
		expect(path).toEqual('/help-centre');
	});
});

describe('verifyOAuthCookiesLocally', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns the access and ID tokens if they are valid', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'id-token',
			},
		} as Request;

		const spyOnVerifyAccessToken = jest
			.spyOn(oauth, 'verifyAccessToken')
			.mockResolvedValue({
				isExpired: () => false,
				claims: {
					scp: scopes as readonly Scopes[],
				},
			} as Jwt);

		const spyOnVerifyIdToken = jest
			.spyOn(oauth, 'verifyIdToken')
			.mockResolvedValue({} as Jwt);

		const verify = await oauth.verifyOAuthCookiesLocally(req);

		expect(spyOnVerifyAccessToken).toHaveBeenCalledWith('access-token');
		expect(spyOnVerifyIdToken).toHaveBeenCalledWith('id-token');
		expect(verify).toEqual({
			accessToken: {
				isExpired: expect.any(Function),
				claims: {
					scp: scopes,
				},
			},
			idToken: {},
		});
	});

	it('returns an empty object if the access token is invalid', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'invalid-access-token',
				GU_ID_TOKEN: 'id-token',
			},
		} as Request;

		const spyOnVerifyAccessToken = jest
			.spyOn(oauth, 'verifyAccessToken')
			.mockResolvedValue({
				isExpired: () => true,
				claims: {
					scp: scopes as readonly Scopes[],
				},
			} as Jwt);

		const spyOnVerifyIdToken = jest
			.spyOn(oauth, 'verifyIdToken')
			.mockResolvedValue({} as Jwt);

		const verify = await oauth.verifyOAuthCookiesLocally(req);

		expect(spyOnVerifyAccessToken).toHaveBeenCalledWith(
			'invalid-access-token',
		);
		expect(spyOnVerifyIdToken).toHaveBeenCalledWith('id-token');
		expect(verify).toEqual(undefined);
	});

	it('returns an empty object if the ID token is invalid', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'invalid-id-token',
			},
		};

		const spyOnVerifyAccessToken = jest
			.spyOn(oauth, 'verifyAccessToken')
			.mockResolvedValue({
				isExpired: () => false,
				claims: {
					scp: scopes as readonly Scopes[],
				},
			} as Jwt);

		const spyOnVerifyIdToken = jest
			.spyOn(oauth, 'verifyIdToken')
			.mockResolvedValue(null as unknown as Jwt);

		const verify = await oauth.verifyOAuthCookiesLocally(
			req as unknown as Request,
		);

		expect(spyOnVerifyAccessToken).toHaveBeenCalledWith('access-token');
		expect(spyOnVerifyIdToken).toHaveBeenCalledWith('invalid-id-token');
		expect(verify).toEqual(undefined);
	});
});

describe('setLocalStateFromIdTokenOrUserCookie', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sets the local state from the ID token if it exists', async () => {
		const req = {
			cookies: {
				GU_U: 'gu_u',
				SC_GU_U: 'sc_gu_u',
			},
		} as Request;
		const res = {} as Response;
		const spyOnSetIdentityLocalState = jest
			.spyOn(identityLocalState, 'setIdentityLocalState')
			.mockImplementation();

		jest.spyOn(oauth, 'signInStatus').mockReturnValue('signedInRecently');

		const idToken = {
			claims: {
				legacy_identity_id: 'legacy_identity_id',
				name: 'name',
				email: 'email',
				iss: 'https://example.com',
				aud: 'foo',
				iat: 1234567890,
				exp: 1234567890,
				sub: 'sub',
			},
			header: {
				alg: 'RS256',
				typ: 'typ',
				kid: 'kid',
			},
			isExpired: () => false,
			isNotBefore: () => false,
		} as Jwt;

		oauth.setLocalStateFromIdTokenOrUserCookie(
			req,
			res,
			idToken,
			oktaConfig.maxAge,
		);

		expect(spyOnSetIdentityLocalState).toHaveBeenCalledWith(res, {
			signInStatus: 'signedInRecently',
			userId: 'legacy_identity_id',
			displayName: 'name',
			email: 'email',
		});
	});

	it('sets the local state from the GU_U cookie if it exists', async () => {
		const req = {
			cookies: {
				GU_U: 'gu_u',
				SC_GU_U: 'sc_gu_u',
			},
		} as Request;
		const res = {} as Response;
		const spyOnSetIdentityLocalState = jest
			.spyOn(identityLocalState, 'setIdentityLocalState')
			.mockImplementation();

		jest.spyOn(oauth, 'signInStatus').mockReturnValue(
			'signedInNotRecently',
		);

		oauth.setLocalStateFromIdTokenOrUserCookie(
			req,
			res,
			undefined,
			oktaConfig.maxAge,
		);

		expect(spyOnSetIdentityLocalState).toHaveBeenCalledWith(res, {
			signInStatus: 'signedInNotRecently',
		});
	});

	it("does not set 'signedInRecently' if neither the ID token nor the GU_U cookie exist", async () => {
		const req = {
			cookies: {
				SC_GU_U: 'sc_gu_u',
			},
		} as Request;
		const res = {} as Response;
		const spyOnSetIdentityLocalState = jest
			.spyOn(identityLocalState, 'setIdentityLocalState')
			.mockImplementation();

		jest.spyOn(oauth, 'signInStatus').mockReturnValue('notSignedIn');

		oauth.setLocalStateFromIdTokenOrUserCookie(
			req,
			res,
			undefined,
			oktaConfig.maxAge,
		);

		expect(spyOnSetIdentityLocalState).toHaveBeenCalledWith(res, {
			displayName: undefined,
			email: undefined,
			signInStatus: 'notSignedIn',
			userId: undefined,
		});
	});

	afterAll(() => {
		// Needed because we're mocking signInStatus here but using it further down
		jest.restoreAllMocks();
	});
});

describe('signInStatus', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns signedInRecently if the ID token is recent', async () => {
		jest.spyOn(oauth, 'idTokenIsRecent').mockReturnValue(true);
		const idToken = {} as Jwt;
		const guUCookie = 1234567890;

		const status = oauth.signInStatus(
			idToken,
			guUCookie,
			oktaConfig.maxAge,
		);

		expect(status).toEqual('signedInRecently');
	});

	it('returns signedInNotRecently if the ID token is not recent', async () => {
		jest.spyOn(oauth, 'idTokenIsRecent').mockReturnValue(false);
		const idToken = {} as Jwt;
		const guUCookie = 1234567890;

		const status = oauth.signInStatus(
			idToken,
			guUCookie,
			oktaConfig.maxAge,
		);

		expect(status).toEqual('signedInNotRecently');
	});
	it('returns signedInNotRecently if the GU_U cookie exists, but the ID token does not', async () => {
		const guUCookie = 1234567890;

		const status = oauth.signInStatus(
			undefined,
			guUCookie,
			oktaConfig.maxAge,
		);

		expect(status).toEqual('signedInNotRecently');
	});
	it('returns notSignedIn if neither the GU_U cookie nor the ID token exist', async () => {
		const status = oauth.signInStatus(
			undefined,
			undefined,
			oktaConfig.maxAge,
		);

		expect(status).toEqual('notSignedIn');
	});

	afterAll(() => {
		// Needed because we're mocking idTokenIsRecent here but using it further down
		jest.restoreAllMocks();
	});
});

describe('idTokenIsRecent', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns true if the ID token is not expired', async () => {
		const idToken = {
			claims: {
				auth_time: Date.now() / 1000 - 100,
			},
		} as unknown as Jwt;

		const isRecent = oauth.idTokenIsRecent(idToken, oktaConfig.maxAge);

		expect(isRecent).toEqual(true);
	});

	it('returns false if the ID token does not have an auth_time claim', async () => {
		const idToken = {
			claims: {},
		} as unknown as Jwt;

		const isRecent = oauth.idTokenIsRecent(idToken, oktaConfig.maxAge);

		expect(isRecent).toEqual(false);
	});

	it('returns false if the ID token has an auth_time claim that is not a number', async () => {
		const idToken = {
			claims: {
				auth_time: 'foo',
			},
		} as unknown as Jwt;

		const isRecent = oauth.idTokenIsRecent(idToken, oktaConfig.maxAge);

		expect(isRecent).toEqual(false);
	});

	it('returns false if the ID token has an auth_time claim that is less than 0', async () => {
		const idToken = {
			claims: {
				auth_time: -1,
			},
		} as unknown as Jwt;

		const isRecent = oauth.idTokenIsRecent(idToken, oktaConfig.maxAge);

		expect(isRecent).toEqual(false);
	});

	it('returns false if the ID token has an auth_time claim that is greater than the current time', async () => {
		const idToken = {
			claims: {
				auth_time: Date.now() / 1000 + 100,
			},
		} as unknown as Jwt;

		const isRecent = oauth.idTokenIsRecent(idToken, oktaConfig.maxAge);

		expect(isRecent).toEqual(false);
	});

	it('returns false if the ID token is expired', async () => {
		const idToken = {
			claims: {
				auth_time: Date.now() / 1000 - 10000,
			},
		} as unknown as Jwt;

		const isRecent = oauth.idTokenIsRecent(idToken, oktaConfig.maxAge);

		expect(isRecent).toEqual(false);
	});
});

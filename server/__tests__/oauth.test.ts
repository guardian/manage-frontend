/**
 * @jest-environment node
 */

import type { Jwt } from '@okta/jwt-verifier';
import type { Request, Response } from 'express';
import * as identityLocalState from '../identityLocalState';
import * as oauth from '../oauth';
import type { Scopes } from '../oauthConfig';
import { scopes } from '../oauthConfig';

jest.mock('@/server/log');
jest.mock('@/server/idapiConfig', () => ({
	getConfig: () => ({
		idapiBaseUrl: 'https://idapi.example.com',
	}),
}));
jest.mock('@/server/oktaConfig', () => ({
	getConfig: () => ({
		useOkta: true,
		orgUrl: 'https://example.com',
		authServerId: 'foo',
		clientId: 'bar',
	}),
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
		expect(verify).toEqual({});
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
		expect(verify).toEqual({});
	});
});

describe('setLocalStateFromIdTokenOrUserCookie', () => {
	it('sets the local state from the ID token if it exists', () => {
		const req = {
			cookies: {
				GU_U: 'gu_u',
				SC_GU_U: 'sc_gu_u',
				SC_GU_LA: 'sc_gu_la',
			},
		} as Request;
		const res = {} as Response;
		const spyOnSetIdentityLocalState = jest
			.spyOn(identityLocalState, 'setIdentityLocalState')
			.mockImplementation();

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

		oauth.setLocalStateFromIdTokenOrUserCookie(req, res, idToken);

		expect(spyOnSetIdentityLocalState).toHaveBeenCalledWith(res, {
			signInStatus: 'signedInRecently',
			userId: 'legacy_identity_id',
			displayName: 'name',
			email: 'email',
		});
	});

	it('sets the local state from the GU_U cookie if it exists', () => {
		const req = {
			cookies: {
				GU_U: 'gu_u',
				SC_GU_U: 'sc_gu_u',
				SC_GU_LA: 'sc_gu_la',
			},
		} as Request;
		const res = {} as Response;
		const spyOnSetIdentityLocalState = jest
			.spyOn(identityLocalState, 'setIdentityLocalState')
			.mockImplementation();

		oauth.setLocalStateFromIdTokenOrUserCookie(req, res);

		expect(spyOnSetIdentityLocalState).toHaveBeenCalledWith(res, {
			signInStatus: 'signedInRecently',
		});
	});

	it("does not set 'signedInRecently' if neither the ID token nor the GU_U cookie exist", () => {
		const req = {
			cookies: {
				SC_GU_U: 'sc_gu_u',
				SC_GU_LA: 'sc_gu_la',
			},
		} as Request;
		const res = {} as Response;
		const spyOnSetIdentityLocalState = jest
			.spyOn(identityLocalState, 'setIdentityLocalState')
			.mockImplementation();

		oauth.setLocalStateFromIdTokenOrUserCookie(req, res);

		expect(spyOnSetIdentityLocalState).toHaveBeenCalledWith(res, {});
	});
});

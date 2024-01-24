/**
 * @jest-environment node
 */

import type { Jwt } from '@okta/jwt-verifier';
import type { Request, Response } from 'express';
import { conf } from '@/server/config';
import { authenticateWithOAuth } from '@/server/middleware/identityMiddleware';
import * as oauth from '@/server/oauth';

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

describe('authenticateWithOAuth middleware - route requires signin', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mock('@/shared/requiresSignin', () => ({
			requiresSignin: jest.fn().mockReturnValue(true),
		}));
	});

	it('clears cookies and calls performAuthorizationCodeFlow if GU_SO is set', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '1234567890',
			},
			originalUrl: '/profile',
		} as Request;

		const res = {
			clearCookie: jest.fn(),
		};

		jest.spyOn(oauth, 'performAuthorizationCodeFlow').mockImplementation();

		const next = jest.fn();

		await authenticateWithOAuth(req, res as unknown as Response, next);

		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ACCESS_TOKEN',
			oauth.oauthCookieOptions,
		);
		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ID_TOKEN',
			oauth.oauthCookieOptions,
		);
		expect(oauth.performAuthorizationCodeFlow).toHaveBeenCalledWith(
			req,
			res,
			{
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes: oauth.scopes,
				returnPath: '/profile',
			},
		);
		expect(next).not.toHaveBeenCalled();
	});

	it('calls performAuthorizationCodeFlow if the access or ID tokens are invalid', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'invalid-access-token',
				GU_ID_TOKEN: 'invalid-id-token',
			},
			cookies: {},
			originalUrl: '/profile',
		} as Request;
		const res = {
			clearCookie: jest.fn(),
		};
		jest.spyOn(oauth, 'verifyAccessToken').mockResolvedValue({
			isExpired: () => true,
			claims: {
				scp: oauth.scopes as readonly oauth.Scopes[],
			},
		} as Jwt);
		jest.spyOn(oauth, 'verifyIdToken').mockResolvedValue({
			isExpired: () => true,
		} as Jwt);
		jest.spyOn(oauth, 'performAuthorizationCodeFlow').mockImplementation();
		const next = jest.fn();
		await authenticateWithOAuth(req, res as unknown as Response, next);
		expect(oauth.performAuthorizationCodeFlow).toHaveBeenCalledWith(
			req,
			res,
			{
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes: oauth.scopes,
				returnPath: '/profile',
			},
		);
		expect(next).not.toHaveBeenCalled();
	});

	it('calls performAuthorizationCodeFlow if IDAPI cookies are not set', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'id-token',
			},
			cookies: {},
			originalUrl: '/profile',
		} as Request;
		const res = {
			clearCookie: jest.fn(),
		};
		const idToken = {
			claims: {
				legacy_identity_id: 'legacy_identity_id',
				name: 'name',
				email: 'email',
			},
		} as unknown as Jwt;
		jest.spyOn(oauth, 'verifyAccessToken').mockResolvedValue({
			isExpired: () => false,
			claims: {
				scp: oauth.scopes as readonly oauth.Scopes[],
			},
		} as Jwt);
		jest.spyOn(oauth, 'verifyIdToken').mockResolvedValue(idToken);
		jest.spyOn(oauth, 'performAuthorizationCodeFlow').mockImplementation();
		const next = jest.fn();
		await authenticateWithOAuth(req, res as unknown as Response, next);
		expect(oauth.performAuthorizationCodeFlow).toHaveBeenCalledWith(
			req,
			res,
			{
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes: oauth.scopes,
				returnPath: '/profile',
			},
		);
		expect(next).not.toHaveBeenCalled();
	});

	it('sets local state and calls next() if the access and ID tokens are valid and IDAPI cookies are set', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'id-token',
			},
			cookies: {
				GU_U: 'gu_u',
				SC_GU_U: 'sc_gu_u',
				SC_GU_LA: 'sc_gu_la',
			},
			originalUrl: '/profile',
		} as Request;
		const res = {
			clearCookie: jest.fn(),
		};
		const idToken = {
			claims: {
				legacy_identity_id: 'legacy_identity_id',
				name: 'name',
				email: 'email',
			},
		} as unknown as Jwt;
		jest.spyOn(oauth, 'verifyAccessToken').mockResolvedValue({
			isExpired: () => false,
			claims: {
				scp: oauth.scopes as readonly oauth.Scopes[],
			},
		} as Jwt);
		jest.spyOn(oauth, 'verifyIdToken').mockResolvedValue(idToken);
		jest.spyOn(
			oauth,
			'setLocalStateFromIdTokenOrUserCookie',
		).mockImplementation();
		const next = jest.fn();
		await authenticateWithOAuth(req, res as unknown as Response, next);
		expect(oauth.setLocalStateFromIdTokenOrUserCookie).toHaveBeenCalledWith(
			req,
			res,
			idToken,
		);
		expect(next).toHaveBeenCalled();
	});
});

describe('authenticateWithOAuth middleware - route does not require signin', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('clears cookies and calls next() if GU_SO is set', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '1234567890',
			},
			originalUrl: '/help-centre',
		} as Request;

		const res = {
			clearCookie: jest.fn(),
		};

		const next = jest.fn();

		await authenticateWithOAuth(req, res as unknown as Response, next);

		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ACCESS_TOKEN',
			oauth.oauthCookieOptions,
		);
		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ID_TOKEN',
			oauth.oauthCookieOptions,
		);
		expect(next).toHaveBeenCalled();
	});

	it('sets local state and calls next() if GU_U is set', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_U: 'gu_u',
			},
			originalUrl: '/help-centre',
		} as Request;

		const res = {};

		jest.spyOn(
			oauth,
			'setLocalStateFromIdTokenOrUserCookie',
		).mockImplementation();
		const next = jest.fn();
		await authenticateWithOAuth(req, res as unknown as Response, next);
		expect(oauth.setLocalStateFromIdTokenOrUserCookie).toHaveBeenCalledWith(
			req,
			res,
		);
		expect(next).toHaveBeenCalled();
	});

	it('returns next() if the access and ID tokens are invalid or IDAPI cookies are missing', async () => {
		const req = {
			cookies: {},
			signedCookies: {},
			originalUrl: '/help-centre',
		} as Request;

		const next = jest.fn();

		await authenticateWithOAuth(req, {} as Response, next);

		expect(next).toHaveBeenCalled();
	});

	it('sets local state and calls next() if the access and ID tokens are valid and IDAPI cookies are set', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'id-token',
			},
			cookies: {
				GU_U: 'gu_u',
				SC_GU_U: 'sc_gu_u',
				SC_GU_LA: 'sc_gu_la',
			},
			originalUrl: '/help-centre',
		} as Request;
		const res = {
			clearCookie: jest.fn(),
		};
		const idToken = {
			claims: {
				legacy_identity_id: 'legacy_identity_id',
				name: 'name',
				email: 'email',
			},
		} as unknown as Jwt;
		jest.spyOn(oauth, 'verifyAccessToken').mockResolvedValue({
			isExpired: () => false,
			claims: {
				scp: oauth.scopes as readonly oauth.Scopes[],
			},
		} as Jwt);
		jest.spyOn(oauth, 'verifyIdToken').mockResolvedValue(idToken);
		jest.spyOn(
			oauth,
			'setLocalStateFromIdTokenOrUserCookie',
		).mockImplementation();
		const next = jest.fn();
		await authenticateWithOAuth(req, res as unknown as Response, next);
		expect(oauth.setLocalStateFromIdTokenOrUserCookie).toHaveBeenCalledWith(
			req,
			res,
			idToken,
		);
		expect(next).toHaveBeenCalled();
	});
});

/**
 * @jest-environment node
 */

import type { Request, Response } from 'express';
import { conf } from '@/server/config';
import * as identityMiddleware from '@/server/middleware/identityMiddleware';
import {
	performAuthorizationCodeFlow,
	verifyAccessToken,
	verifyIdToken,
} from '@/server/oauth';

const scopes = [
	'guardian.identity-api.user.read.self.secure',
	'guardian.identity-api.user.update.self.secure',
];

jest.mock('@/server/idapiConfig', () => ({
	getConfig: () => ({
		idapiBaseUrl: 'https://idapi.example.com',
	}),
}));
jest.mock('@/server/oktaConfig', () => ({
	getConfig: () => ({
		orgUrl: 'https://example.com',
		authServerId: 'foo',
		clientId: 'bar',
	}),
}));
jest.mock('@/server/oauth', () => ({
	verifyAccessToken: jest.fn().mockResolvedValue({
		isExpired: () => false,
		claims: {
			scp: scopes,
		},
	}),
	verifyIdToken: jest.fn().mockResolvedValue({}),
	scopes,
	performAuthorizationCodeFlow: jest.fn(),
	OAuthAccessTokenCookieName: 'GU_ACCESS_TOKEN',
	OAuthIdTokenCookieName: 'GU_ID_TOKEN',
}));

describe('sanitizeReturnPath', () => {
	it('returns / if the path is an absolute URL', () => {
		const path = identityMiddleware.sanitizeReturnPath(
			'https://www.theguardian.com',
		);
		expect(path).toEqual('/');
	});

	it('returns the path if it is valid', () => {
		const path = identityMiddleware.sanitizeReturnPath('/help-centre');
		expect(path).toEqual('/help-centre');
	});

	it('removes trailing slashes', () => {
		const path = identityMiddleware.sanitizeReturnPath('/help-centre/');
		expect(path).toEqual('/help-centre');
	});

	it('strips the query string', () => {
		const path = identityMiddleware.sanitizeReturnPath(
			'/help-centre?foo=bar',
		);
		expect(path).toEqual('/help-centre');
	});
});

describe('verifyOAuthCookies', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns the access and ID tokens if they are valid', async () => {
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'id-token',
			},
		};

		const verify = await identityMiddleware.verifyOAuthCookies(
			req as unknown as Request,
		);

		expect(verifyAccessToken).toHaveBeenCalledWith('access-token');
		expect(verifyIdToken).toHaveBeenCalledWith('id-token');
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
		(verifyAccessToken as jest.Mock).mockResolvedValue({
			isExpired: () => true,
			claims: {
				scp: scopes,
			},
		});

		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'invalid-access-token',
				GU_ID_TOKEN: 'id-token',
			},
		};

		const verify = await identityMiddleware.verifyOAuthCookies(
			req as unknown as Request,
		);

		expect(verifyAccessToken).toHaveBeenCalledWith('invalid-access-token');
		expect(verifyIdToken).toHaveBeenCalledWith('id-token');
		expect(verify).toEqual({});
	});

	it('returns an empty object if the ID token is invalid', async () => {
		(verifyIdToken as jest.Mock).mockResolvedValue(null);

		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'invalid-id-token',
			},
		};

		const verify = await identityMiddleware.verifyOAuthCookies(
			req as unknown as Request,
		);

		expect(verifyAccessToken).toHaveBeenCalledWith('access-token');
		expect(verifyIdToken).toHaveBeenCalledWith('invalid-id-token');
		expect(verify).toEqual({});
	});
});

describe('withOAuth middleware', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('returns next() if the route does not require sign in', async () => {
		const req = {
			signedCookies: {},
			originalUrl: '/help-centre',
		};

		const next = jest.fn();

		await identityMiddleware.withOAuth(
			req as unknown as Request,
			{} as unknown as Response,
			next,
		);

		expect(next).toHaveBeenCalled();
	});

	it('calls performAuthorizationCodeFlow if the GU_SO cookie is set', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '1234567890',
			},
			originalUrl: '/profile',
		};

		const res = {
			clearCookie: jest.fn(),
		};

		const next = jest.fn();

		await identityMiddleware.withOAuth(
			req as unknown as Request,
			res as unknown as Response,
			next,
		);

		expect(res.clearCookie).toHaveBeenCalledWith('GU_ACCESS_TOKEN', {
			signed: true,
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
		});
		expect(res.clearCookie).toHaveBeenCalledWith('GU_ID_TOKEN', {
			signed: true,
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
		});
		expect(performAuthorizationCodeFlow).toHaveBeenCalledWith(req, res, {
			redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
			scopes,
			returnPath: '/profile',
		});
		expect(next).not.toHaveBeenCalled();
	});

	it('calls performAuthorizationCodeFlow if the access or ID tokens are invalid', async () => {
		(verifyAccessToken as jest.Mock).mockResolvedValue({
			isExpired: () => true,
			claims: {
				scp: scopes,
			},
		});

		const req = {
			cookies: {
				SC_GU_U: 'sc_gu_u',
				SC_GU_LA: 'sc_gu_la',
				GU_U: 'gu_u',
			},
			signedCookies: {
				GU_ACCESS_TOKEN: 'invalid-access-token',
				GU_ID_TOKEN: 'id-token',
			},
			originalUrl: '/profile',
		};

		const res = {
			clearCookie: jest.fn(),
		};

		const next = jest.fn();

		await identityMiddleware.withOAuth(
			req as unknown as Request,
			res as unknown as Response,
			next,
		);

		expect(performAuthorizationCodeFlow).toHaveBeenCalledWith(req, res, {
			redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
			scopes,
			returnPath: '/profile',
		});
		expect(next).not.toHaveBeenCalled();
	});

	it('calls next() if the access and ID tokens are valid', async () => {
		(verifyAccessToken as jest.Mock).mockResolvedValue({
			isExpired: () => false,
			claims: {
				scp: scopes,
			},
		});
		(verifyIdToken as jest.Mock).mockResolvedValue({});
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: 'access-token',
				GU_ID_TOKEN: 'id-token',
			},
			cookies: {
				SC_GU_U: 'sc_gu_u',
				SC_GU_LA: 'sc_gu_la',
				GU_U: 'gu_u',
			},
			originalUrl: '/profile',
		};

		const res = {
			clearCookie: jest.fn(),
		};

		const mockSetLocalStateFromIdToken = jest.fn();

		jest.spyOn(
			identityMiddleware,
			'setLocalStateFromIdToken',
		).mockImplementation(mockSetLocalStateFromIdToken);

		const next = jest.fn();

		await identityMiddleware.withOAuth(
			req as unknown as Request,
			res as unknown as Response,
			next,
		);

		expect(mockSetLocalStateFromIdToken).toHaveBeenCalled();
		expect(next).toHaveBeenCalled();
		expect(performAuthorizationCodeFlow).not.toHaveBeenCalled();
	});
});

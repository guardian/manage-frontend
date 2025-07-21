/**
 * @jest-environment node
 */

import type { Jwt, JwtClaims } from '@okta/jwt-verifier';
import type OktaJwtVerifier from '@okta/jwt-verifier';
import type { Request, Response } from 'express';
import { conf } from '@/server/config';
import { authenticateWithOAuth } from '@/server/middleware/identityMiddleware';
import * as oauth from '@/server/oauth';
import type { OktaConfig } from '@/server/oktaConfig';
import type { Scopes, VerifiedOAuthCookies } from '../../oauthConfig';
import { oauthCookieOptions, scopes } from '../../oauthConfig';

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
jest.mock('@/server/oauth', () => ({
	...jest.requireActual('@/server/oauth'),
	verifyOAuthCookiesLocally: jest.fn(),
	performAuthorizationCodeFlow: jest.fn(),
	verifyIdToken: jest.fn(),
	verifyAccessToken: jest.fn(),
	setLocalStateFromIdTokenOrUserCookie: jest.fn(),
	idTokenIsRecent: jest.fn(),
	revokeAccessToken: jest.fn(),
}));
const mockedVerifyOAuthCookiesLocally = jest.mocked<
	(req: Request) => Promise<VerifiedOAuthCookies | undefined>
>(oauth.verifyOAuthCookiesLocally);
const mockedVerifyIdToken = jest.mocked<
	(token: string) => Promise<Jwt | undefined>
>(oauth.verifyIdToken);
const mockedVerifyAccessToken = jest.mocked<
	(token: string) => Promise<Jwt | undefined>
>(oauth.verifyAccessToken);
const mockedIdTokenIsRecent = jest.mocked<
	(token: OktaJwtVerifier.Jwt, maxAge: number) => boolean
>(oauth.idTokenIsRecent);
const mockedRevokeAccessToken = jest.mocked<(token: string) => Promise<void>>(
	oauth.revokeAccessToken,
);

const oktaConfig: OktaConfig = {
	useOkta: true,
	maxAge: 1800,
	orgUrl: 'https://example.com',
	authServerId: 'foo',
	clientId: 'bar',
	clientSecret: 'baz',
	cookieSecret: 'qux',
};

describe('authenticateWithOAuth middleware - route requires signin', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mock('@/shared/requiresSignin', () => ({
			requiresSignin: jest.fn().mockReturnValue(true),
		}));
	});

	it('clears cookies and calls performAuthorizationCodeFlow if GU_SO is set and is more recent than tokens', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '2000',
			},
			originalUrl: '/profile',
		} as unknown as Request;

		const res = {
			clearCookie: jest.fn(),
		};

		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					claims: {
						iat: 1000,
					} as JwtClaims,
				} as Jwt,
				idToken: {} as Jwt,
			}),
		);

		const next = jest.fn();

		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);

		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ACCESS_TOKEN',
			oauthCookieOptions,
		);
		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ID_TOKEN',
			oauthCookieOptions,
		);
		expect(oauth.performAuthorizationCodeFlow).toHaveBeenCalledWith(
			req,
			res,
			{
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes,
				returnPath: '/profile',
			},
		);
		expect(next).not.toHaveBeenCalled();
	});

	it('calls performAuthorizationCodeFlow if GU_SO is set, but is older than tokens, and IDAPI cookies are not set', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '1000',
			},
			originalUrl: '/profile',
		} as unknown as Request;

		const res = {
			clearCookie: jest.fn(),
		};

		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					claims: {
						iat: 2000,
					} as JwtClaims,
				} as Jwt,
				idToken: {} as Jwt,
			}),
		);

		mockedIdTokenIsRecent.mockReturnValue(true);

		const next = jest.fn();

		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);

		expect(oauth.performAuthorizationCodeFlow).toHaveBeenCalledWith(
			req,
			res,
			{
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes,
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
		} as unknown as Request;
		const res = {
			clearCookie: jest.fn(),
		};
		mockedVerifyAccessToken.mockResolvedValue({
			isExpired: () => true,
			claims: {
				scp: scopes as readonly Scopes[],
			},
		} as Jwt);
		mockedVerifyIdToken.mockResolvedValue({
			isExpired: () => true,
		} as Jwt);
		mockedIdTokenIsRecent.mockReturnValue(true);
		const next = jest.fn();
		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);
		expect(oauth.performAuthorizationCodeFlow).toHaveBeenCalledWith(
			req,
			res,
			{
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes,
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
		} as unknown as Request;
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
		mockedVerifyAccessToken.mockResolvedValue({
			isExpired: () => false,
			claims: {
				scp: scopes as readonly Scopes[],
			},
		} as Jwt);
		mockedVerifyIdToken.mockResolvedValue(idToken);
		mockedIdTokenIsRecent.mockReturnValue(true);
		const next = jest.fn();
		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);
		expect(oauth.performAuthorizationCodeFlow).toHaveBeenCalledWith(
			req,
			res,
			{
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes,
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
			},
			originalUrl: '/profile',
		} as unknown as Request;
		const res = {
			clearCookie: jest.fn(),
		};
		const idToken = {
			claims: {
				legacy_identity_id: 'legacy_identity_id',
				name: 'name',
				email: 'email',
			},
		};
		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					isExpired: () => false,
					claims: {
						scp: scopes as readonly Scopes[],
					},
				} as Jwt,
				idToken: idToken as unknown as Jwt,
			}),
		);
		mockedIdTokenIsRecent.mockReturnValue(true);
		const next = jest.fn();
		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);
		expect(oauth.setLocalStateFromIdTokenOrUserCookie).toHaveBeenCalledWith(
			req,
			res,
			idToken,
			oktaConfig.maxAge,
		);
		expect(next).toHaveBeenCalled();
	});

	it('revokes and deletes access token and redirects to /reauthenticate if the ID token is expired', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '1000',
			},
			originalUrl: '/profile',
		} as unknown as Request;

		const res = {
			clearCookie: jest.fn(),
			redirect: jest.fn(),
		};

		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					claims: {
						iat: 2000,
					} as JwtClaims,
				} as Jwt,
				idToken: {} as Jwt,
			}),
		);

		mockedIdTokenIsRecent.mockReturnValue(false);

		const next = jest.fn();

		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);

		expect(mockedRevokeAccessToken).toHaveBeenCalled();
		expect(res.clearCookie).toHaveBeenCalledTimes(2);
		expect(res.redirect).toHaveBeenCalledWith(
			expect.stringContaining('/reauthenticate'),
		);
		expect(oauth.performAuthorizationCodeFlow).not.toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});
});

describe('authenticateWithOAuth middleware - route does not require signin', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('clears cookies and calls next() if GU_SO is set and more recent than the tokens', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '2000',
			},
			originalUrl: '/help-centre',
		} as unknown as Request;

		const res = {
			clearCookie: jest.fn(),
		};

		const next = jest.fn();

		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					claims: {
						iat: 1000,
					} as JwtClaims,
				} as Jwt,
				idToken: {} as Jwt,
			}),
		);

		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);

		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ACCESS_TOKEN',
			oauthCookieOptions,
		);
		expect(res.clearCookie).toHaveBeenCalledWith(
			'GU_ID_TOKEN',
			oauthCookieOptions,
		);
		expect(next).toHaveBeenCalled();
	});

	it('sets local state and calls next() if GU_SO is set, but is older than the tokens', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '1000',
			},
			originalUrl: '/help-centre',
		} as unknown as Request;

		const res = {
			clearCookie: jest.fn(),
		};

		const next = jest.fn();

		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					claims: {
						iat: 2000,
					} as JwtClaims,
				} as Jwt,
				idToken: {} as Jwt,
			}),
		);

		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);

		expect(next).toHaveBeenCalled();
	});

	it('sets local state and calls next() if GU_U is set', async () => {
		const req = {
			cookies: {
				GU_U: 'gu_u',
			},
			originalUrl: '/help-centre',
		} as unknown as Request;

		const res = {};

		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve(undefined),
		);

		const next = jest.fn();
		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);
		expect(oauth.setLocalStateFromIdTokenOrUserCookie).toHaveBeenCalledWith(
			req,
			res,
			undefined,
			oktaConfig.maxAge,
		);
		expect(next).toHaveBeenCalled();
	});

	it('returns next() if the access and ID tokens are invalid or IDAPI cookies are missing', async () => {
		const req = {
			cookies: {},
			signedCookies: {},
			originalUrl: '/help-centre',
		} as unknown as Request;

		const next = jest.fn();

		await authenticateWithOAuth(
			req,
			{} as unknown as Response,
			next,
			oktaConfig,
		);

		expect(next).toHaveBeenCalled();
	});

	it('sets local state and calls next() if the access and ID tokens are valid and IDAPI cookies are set', async () => {
		const req = {
			cookies: {
				GU_U: 'gu_u',
				SC_GU_U: 'sc_gu_u',
			},
			originalUrl: '/help-centre',
		} as unknown as Request;
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
		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					isExpired: () => false,
					claims: {
						scp: scopes as readonly Scopes[],
					},
				} as Jwt,
				idToken: idToken as unknown as Jwt,
			}),
		);
		mockedIdTokenIsRecent.mockReturnValue(true);
		const next = jest.fn();
		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);
		expect(oauth.setLocalStateFromIdTokenOrUserCookie).toHaveBeenCalledWith(
			req,
			res,
			idToken,
			oktaConfig.maxAge,
		);
		expect(next).toHaveBeenCalled();
	});

	it('revokes and deletes access token and redirects to /reauthenticate if the ID token is expired', async () => {
		const req = {
			signedCookies: {},
			cookies: {
				GU_SO: '1000',
			},
			originalUrl: '/profile',
		} as unknown as Request;

		const res = {
			clearCookie: jest.fn(),
			redirect: jest.fn(),
		};

		mockedVerifyOAuthCookiesLocally.mockReturnValue(
			Promise.resolve({
				accessToken: {
					claims: {
						iat: 2000,
					} as JwtClaims,
				} as Jwt,
				idToken: {} as Jwt,
			}),
		);

		mockedIdTokenIsRecent.mockReturnValue(false);

		const next = jest.fn();

		await authenticateWithOAuth(
			req,
			res as unknown as Response,
			next,
			oktaConfig,
		);

		expect(mockedRevokeAccessToken).toHaveBeenCalled();
		expect(res.clearCookie).toHaveBeenCalledTimes(2);
		expect(res.redirect).toHaveBeenCalledWith(
			expect.stringContaining('/reauthenticate'),
		);
		expect(oauth.performAuthorizationCodeFlow).not.toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});
});

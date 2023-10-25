/**
 * @jest-environment node
 */

import type { Jwt } from '@okta/jwt-verifier';
import type { Request } from 'express';
import type { Scopes } from '../oauth';
import * as oauth from '../oauth';
import { scopes } from '../oauth';

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

		const verify = await oauth.verifyOAuthCookies(req);

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

		const verify = await oauth.verifyOAuthCookies(req);

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

		const verify = await oauth.verifyOAuthCookies(
			req as unknown as Request,
		);

		expect(spyOnVerifyAccessToken).toHaveBeenCalledWith('access-token');
		expect(spyOnVerifyIdToken).toHaveBeenCalledWith('invalid-id-token');
		expect(verify).toEqual({});
	});
});

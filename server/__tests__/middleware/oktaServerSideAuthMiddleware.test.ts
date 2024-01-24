import type { Request, Response } from 'express';
import {
	clearIdentityLocalState,
	getIdentityLocalState,
	setIdentityLocalState,
} from '@/server/identityLocalState';
import type { OktaValidationResponse } from '@/server/middleware/oktaServerSideAuthMiddleware';
import { withOktaServerSideValidation } from '@/server/middleware/oktaServerSideAuthMiddleware';
import { validateWithOkta } from '@/server/okta';
import type { OktaConfig } from '@/server/oktaConfig';
import { getConfig } from '@/server/oktaConfig';
import type { IdentityDetails } from '@/shared/globals';
import { requiresSignin } from '@/shared/requiresSignin';

jest.mock('@/server/log');
jest.mock('@/server/oauth', () => ({
	OAuthAccessTokenCookieName: 'GU_ACCESS_TOKEN',
}));
jest.mock('@/shared/requiresSignin', () => ({
	requiresSignin: jest.fn(),
}));
const mockedRequiresSignin =
	jest.mocked<(path: string) => boolean>(requiresSignin);
jest.mock('@/server/oktaConfig', () => ({
	getConfig: jest.fn(),
}));
const mockedGetOktaConfig = jest.mocked<() => Promise<OktaConfig>>(getConfig);
jest.mock('@/server/okta', () => ({
	validateWithOkta: jest.fn(),
}));
const mockedValidateWithOkta =
	jest.mocked<
		(params: {
			oktaConfig: OktaConfig;
			accessToken: string;
		}) => Promise<OktaValidationResponse>
	>(validateWithOkta);
jest.mock('@/server/identityLocalState', () => ({
	getIdentityLocalState: jest.fn(),
	setIdentityLocalState: jest.fn(),
	clearIdentityLocalState: jest.fn(),
}));
const mockedGetIdentityLocalState = jest.mocked<
	(res: Response) => IdentityDetails | undefined
>(getIdentityLocalState);
const mockedClearIdentityLocalState = jest.mocked<(res: Response) => void>(
	clearIdentityLocalState,
);

const accessToken = 'accessToken';

const setupOktaConfig = (useOkta: boolean) => {
	mockedGetOktaConfig.mockReturnValue(
		Promise.resolve({
			// This is so cursed but it works because at the moment
			// that mockReturnValue is being invoked, mockedGetOktaConfig
			// has not yet been mocked so just returns the original
			// implementation.
			...mockedGetOktaConfig(),
			useOkta,
		}),
	);
};

describe('withOktaServerSideValidation', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	it('should call next() when Okta is not enabled', async () => {
		setupOktaConfig(false);
		const req = {} as unknown as Request;
		const res = {} as unknown as Response;
		const next = jest.fn();

		await withOktaServerSideValidation(req, res, next);

		expect(next).toHaveBeenCalled();
	});

	it('should handle the case where there is no token/user, but signin is required', async () => {
		setupOktaConfig(true);
		mockedRequiresSignin.mockReturnValue(true);
		const mockedSendStatus = jest.fn();
		const req = {
			signedCookies: {},
		} as unknown as Request;
		const res = {
			locals: {},
			sendStatus: mockedSendStatus,
		} as unknown as Response;
		const next = jest.fn();

		await withOktaServerSideValidation(req, res, next);

		expect(mockedSendStatus).toHaveBeenCalledWith(500);
	});

	it('should handle the case where there is no token/user, and signin is not required', async () => {
		setupOktaConfig(true);
		mockedRequiresSignin.mockReturnValue(false);
		mockedGetIdentityLocalState.mockReturnValue(undefined);
		const req = {
			signedCookies: {},
		} as unknown as Request;
		const res = {
			locals: {},
		} as unknown as Response;
		const next = jest.fn();

		await withOktaServerSideValidation(req, res, next);

		expect(next).toHaveBeenCalled();
	});

	it('should handle the case where Okta validation fails', async () => {
		setupOktaConfig(true);
		mockedRequiresSignin.mockReturnValue(true);
		mockedGetIdentityLocalState.mockReturnValue({
			userId: 'userId',
			email: 'email',
			displayName: 'displayName',
			signInStatus: 'signedInRecently',
		});
		mockedValidateWithOkta.mockReturnValue(
			Promise.resolve({ ok: false, valid: false }),
		);
		const mockedSendStatus = jest.fn();
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: accessToken,
			},
		} as unknown as Request;
		const res = {
			locals: {},
			sendStatus: mockedSendStatus,
		} as unknown as Response;
		const next = jest.fn();

		await withOktaServerSideValidation(req, res, next);

		expect(mockedSendStatus).toHaveBeenCalledWith(500);
	});

	it('should handle the case where Okta validation succeeds, but token is invalid', async () => {
		setupOktaConfig(true);
		mockedRequiresSignin.mockReturnValue(true);
		mockedGetIdentityLocalState.mockReturnValue({
			userId: 'userId',
			email: 'email',
			displayName: 'displayName',
			signInStatus: 'signedInRecently',
		});
		const mockedSendStatus = jest.fn();
		mockedValidateWithOkta.mockReturnValue(
			Promise.resolve({ ok: true, valid: false }),
		);
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: accessToken,
			},
		} as unknown as Request;
		const res = {
			locals: {},
			sendStatus: mockedSendStatus,
		} as unknown as Response;
		const next = jest.fn();

		await withOktaServerSideValidation(req, res, next);

		expect(mockedClearIdentityLocalState).toHaveBeenCalled();
		expect(mockedSendStatus).toHaveBeenCalledWith(401);
	});

	it('should handle the case where Okta validation succeeds and token is valid', async () => {
		setupOktaConfig(true);
		mockedRequiresSignin.mockReturnValue(true);
		mockedGetIdentityLocalState.mockReturnValue({
			userId: 'userId',
			email: 'email',
			displayName: 'displayName',
			signInStatus: 'signedInRecently',
		});
		const mockedSendStatus = jest.fn();
		mockedValidateWithOkta.mockReturnValue(
			Promise.resolve({
				ok: true,
				valid: true,
				userId: 'newUserId',
				email: 'newEmail',
				displayName: 'newDisplayName',
			}),
		);
		const req = {
			signedCookies: {
				GU_ACCESS_TOKEN: accessToken,
			},
		} as unknown as Request;
		const res = {
			locals: {},
			sendStatus: mockedSendStatus,
		} as unknown as Response;
		const next = jest.fn();

		await withOktaServerSideValidation(req, res, next);

		expect(setIdentityLocalState).toHaveBeenCalledWith(res, {
			signInStatus: 'signedInRecently',
			userId: 'newUserId',
			email: 'newEmail',
			displayName: 'newDisplayName',
		});
		expect(next).toHaveBeenCalled();
	});
});

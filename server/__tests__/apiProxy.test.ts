/**
 * @jest-environment node
 */

import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { proxyApiHandler, straightThroughBodyHandler } from '../apiProxy';

jest.mock('node-fetch');
jest.mock('@/server/log');
jest.mock('@/server/oktaConfig', () => ({
	getConfig: () => ({ useOkta: true }),
}));

const mockedFetch = jest.mocked(fetch);

const buildFetchResponse = () =>
	({
		status: 200,
		ok: true,
		headers: { get: () => undefined },
		buffer: () => Promise.resolve(Buffer.from('{}')),
	} as unknown as Awaited<ReturnType<typeof fetch>>);

const buildRequest = (overrides: Partial<Request> = {}): Request =>
	({
		params: {},
		query: {},
		url: '/',
		originalUrl: '/',
		method: 'GET',
		body: undefined,
		header: () => undefined,
		// signedCookies: {},
		...overrides,
	} as unknown as Request);

const buildResponse = (): Response =>
	({
		locals: {},
		status: jest.fn(),
		header: jest.fn(),
		send: jest.fn(),
	} as unknown as Response);

const handler = proxyApiHandler('testurl.com')(straightThroughBodyHandler);

const getOutgoingUrl = () => mockedFetch.mock.calls[0][0] as string;

describe('proxyApiHandler - parameterised path building', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedFetch.mockResolvedValue(buildFetchResponse());
	});

	it('joins an array param with slashes', async () => {
		const req = buildRequest({
			params: { path: ['a', 'b', 'c'] },
		});

		await handler('proxy/:path', 'CODE', ['path'])(req, buildResponse());

		expect(getOutgoingUrl()).toBe('https://testurl.com/proxy/a/b/c');
	});

	it('replaces a missing param with an empty string and strips the trailing slash', async () => {
		const req = buildRequest({ params: {} });

		await handler('user-attributes/me/:productId', 'CODE', ['productId'])(
			req,
			buildResponse(),
		);

		expect(getOutgoingUrl()).toBe('https://testurl.com/user-attributes/me');
	});

	it('replaces named params', async () => {
		const req = buildRequest({
			params: { productId: 'abc', action: 'cancel' },
		});

		await handler('user-attributes/me/:productId/:action', 'CODE', [
			'productId',
			'action',
		])(req, buildResponse());

		expect(getOutgoingUrl()).toBe(
			'https://testurl.com/user-attributes/me/abc/cancel',
		);
	});

	it('strips a trailing slash from the final path', async () => {
		const req = buildRequest({ params: {} });

		await handler('final/', 'CODE')(req, buildResponse());

		expect(getOutgoingUrl()).toBe('https://testurl.com/final');
	});
});

/**
 * @jest-environment node
 */

const mockRouter = {
	use: jest.fn(),
	get: jest.fn(),
	put: jest.fn(),
	patch: jest.fn(),
	delete: jest.fn(),
	post: jest.fn(),
};

const mockIdapiProxyHandler = jest.fn((_: unknown) => 'proxyHandler');
const mockWithIdentity = jest.fn((_: number) => 'identityMiddleware');

jest.mock('express', () => ({
	Router: () => mockRouter,
}));

jest.mock('@/server/idapiProxy', () => ({
	idapiProxyHandler: (args: unknown) => mockIdapiProxyHandler(args),
}));

jest.mock('@/server/middleware/identityMiddleware', () => ({
	withIdentity: (status: number) => mockWithIdentity(status),
}));

jest.mock('@/server/util', () => ({
	csrfValidateMiddleware: 'csrfValidateMiddleware',
}));

describe('idapi routes', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('proxies GET /newsletters to Identity /newsletters-v2', async () => {
		await import('@/server/routes/idapi');

		expect(mockRouter.get).toHaveBeenCalledWith(
			'/newsletters',
			'csrfValidateMiddleware',
			'proxyHandler',
		);
		expect(mockIdapiProxyHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				url: '/newsletters-v2',
				sendAuthHeader: false,
			}),
		);
	});
});

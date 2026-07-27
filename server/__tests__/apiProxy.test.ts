/**
 * @jest-environment node
 */

jest.mock('node-fetch');
jest.mock('@/server/log');
jest.mock('@/server/oktaConfig', () => ({
	getConfig: () => ({ useOkta: true }),
}));

describe('proxyApiHandler - parameterised path building', () => {
	beforeEach(() => {});

	it('example of reduce', async () => {
		const params: Record<string, string> = {
			subscriptionName: 'A-S12312312',
		};

		const urlParamNamesToReplace = ['subscriptionName'];

		const path = 'subscriptions/:subscriptionName/change-plan/review';

		const parameterisedPath = urlParamNamesToReplace.reduce(
			(evolvingPath: string, urlParamName: string) =>
				evolvingPath.replace(':' + urlParamName, params[urlParamName]),
			path,
		);

		expect(parameterisedPath).toBe(
			'subscriptions/A-S12312312/change-plan/review',
		);
	});

	it('example of reduce', async () => {
		const params: Record<string, string> = {
			subscriptionName: 'A-S12312312',
		};

		const urlParamNamesToReplace = ['subscriptionName'];

		const path = 'subscriptions/:subscriptionName/change-plan/review';

		const parameterisedPath = urlParamNamesToReplace.reduce(
			(evolvingPath: string, urlParamName: string) =>
				evolvingPath.replace(
					':' + urlParamName,
					params[urlParamName] || '',
				),
			path,
		);

		expect(parameterisedPath).toBe(
			'subscriptions/A-S12312312/change-plan/review',
		);
	});
});

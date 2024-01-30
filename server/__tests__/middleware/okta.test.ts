import { enableFetchMocks } from 'jest-fetch-mock';
import { validateWithOkta } from '@/server/okta';
import type { OktaConfig } from '@/server/oktaConfig';

jest.mock('@/server/log');
jest.mock('@/server/oauth');

const oktaConfig: OktaConfig = {
	useOkta: true,
	maxAge: 1800,
	orgUrl: 'https://example.com',
	authServerId: 'foo',
	clientId: 'bar',
	clientSecret: 'baz',
	cookieSecret: 'qux',
};
const accessToken = 'accessToken';

describe('validateWithOkta', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		enableFetchMocks();
	});

	it('returns a valid response if the token is valid', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				sub: '00uid4BxXw6I6TV4m0g3',
				name: 'John Doe',
				nickname: 'Jimmy',
				given_name: 'John',
				middle_name: 'James',
				family_name: 'Doe',
				profile: 'https://example.com/john.doe',
				zoneinfo: 'America/Los_Angeles',
				locale: 'en-US',
				updated_at: 1311280970,
				email: 'john.doe@example.com',
				email_verified: true,
				address: {
					street_address: '123 Hollywood Blvd.',
					locality: 'Los Angeles',
					region: 'CA',
					postal_code: '90210',
					country: 'US',
				},
				phone_number: '+1 (425) 555-1212',
				// Guardian-specific fields
				legacy_identity_id: '1234567890',
			}),
			{
				status: 200,
			},
		);

		const response = await validateWithOkta({
			oktaConfig,
			accessToken,
		});

		expect(response).toEqual({
			ok: true,
			valid: true,
			userId: '1234567890',
			displayName: 'John Doe',
			email: 'john.doe@example.com',
		});
	});

	it('returns an invalid response if the token is invalid', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				error: 'invalid_token',
				error_description: 'The access token is invalid.',
			}),
			{
				status: 401,
			},
		);

		const response = await validateWithOkta({
			oktaConfig,
			accessToken,
		});

		expect(response).toEqual({
			ok: true,
			valid: false,
		});
	});

	it('returns an invalid response if the request is forbidden', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				error: 'insufficient_scope',
				error_description:
					'The access token must provide access to at least one of these scopes - profile, email, address or phone',
			}),
			{
				status: 403,
			},
		);

		const response = await validateWithOkta({
			oktaConfig,
			accessToken,
		});

		expect(response).toEqual({
			ok: true,
			valid: false,
		});
	});

	it('returns an invalid response if the request returns an unexpected status code', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				error: 'invalid_token',
				error_description: 'The access token is invalid.',
			}),
			{
				status: 500,
			},
		);

		const response = await validateWithOkta({
			oktaConfig,
			accessToken,
		});

		expect(response).toEqual({
			ok: false,
			valid: false,
		});
	});

	it('returns an invalid response if the request fails', async () => {
		fetchMock.mockRejectOnce(new Error('Network error'));

		const response = await validateWithOkta({
			oktaConfig,
			accessToken,
		});

		expect(response).toEqual({
			ok: false,
			valid: false,
		});
	});
});

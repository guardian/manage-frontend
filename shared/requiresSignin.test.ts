import { requiresSignin } from './requiresSignin';

describe('requiresSignin', () => {
	it('require sign-in for non-public path', () => {
		expect(requiresSignin('/api/private/path')).toEqual(true);
	});

	it('not require sign-in for public path', () => {
		expect(requiresSignin('/create-reminder/one-off')).toEqual(false);
	});

	it('not require sign-in for public path with querystring', () => {
		expect(requiresSignin('/create-reminder/one-off?test=blah')).toEqual(
			false,
		);
	});
});

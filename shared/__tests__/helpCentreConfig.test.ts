import { helpCentreHomeForDomain } from '../helpCentreConfig';

describe('helpCentreHomeForDomain', () => {
	test('returns the prod help centre for theguardian.com', () => {
		expect(helpCentreHomeForDomain('theguardian.com')).toBe(
			'https://help.theguardian.com',
		);
	});

	test.each(['code.dev-theguardian.com', 'thegulocal.com'])(
		'returns the code help centre for %s',
		(domain) => {
			expect(helpCentreHomeForDomain(domain)).toBe(
				'https://help.code.dev-theguardian.com',
			);
		},
	);
});

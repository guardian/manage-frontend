import { helpCentreHomeForDomain } from '../helpCentreConfig';

describe('helpCentreHomeForDomain', () => {
	test.each([
		'theguardian.com',
		'manage.theguardian.com',
		'www.theguardian.com',
	])('returns the prod help centre for %s', (domain) => {
		expect(helpCentreHomeForDomain(domain)).toBe(
			'https://help.theguardian.com',
		);
	});

	test.each([
		'code.dev-theguardian.com',
		'manage.code.dev-theguardian.com',
		'thegulocal.com',
		'',
		'unknown.example',
	])('returns the code help centre for non-prod domain %s', (domain) => {
		expect(helpCentreHomeForDomain(domain)).toBe(
			'https://help.code.dev-theguardian.com',
		);
	});
});

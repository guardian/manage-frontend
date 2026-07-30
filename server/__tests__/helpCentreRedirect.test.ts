import { shouldRetainHelpCentrePath } from '../helpCentreRedirect';

describe('shouldRetainHelpCentrePath', () => {
	test.each([
		'/contact-us',
		'/contact-us/',
		'/contact-us/billing',
		'/contact-us/billing/something',
		'/contact-us/a/b/c/d',
		'/diagnostic-information',
		'/diagnostic-information/',
		'/public-diagnostic-information',
		'/public-diagnostic-information/',
	])('retains %s on manage', (path) => {
		expect(shouldRetainHelpCentrePath(path)).toBe(true);
	});

	test.each([
		'/',
		'',
		'/article/some-article',
		'/topic/some-topic',
		'/unknown-page',
		'/contact-us-extra',
		'/diagnostic-information-extra',
		'/public-diagnostic-information-extra',
	])('does not retain %s', (path) => {
		expect(shouldRetainHelpCentrePath(path)).toBe(false);
	});
});

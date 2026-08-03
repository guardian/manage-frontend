import {
	helpCentreHomeForStage,
	redirectForPath,
	shouldRetainHelpCentrePath,
} from '../helpCentreRedirect';

describe('helpCentreHomeForStage', () => {
	test('returns the prod help centre for PROD', () => {
		expect(helpCentreHomeForStage('PROD')).toBe(
			'https://help.theguardian.com/',
		);
	});

	test.each(['CODE', 'DEV', 'code', ''])(
		'returns the code help centre for non-PROD stage %s',
		(stage) => {
			expect(helpCentreHomeForStage(stage)).toBe(
				'https://help.code.dev-theguardian.com/',
			);
		},
	);
});

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

describe('redirectForPath redirects to custom urls where specified', () => {
	expect(redirectForPath('/asdf')).toBe(
		'https://help.code.dev-theguardian.com/',
	);
	expect(redirectForPath('/article/i-need-to-pause-my-delivery')).toBe(
		'https://help.code.dev-theguardian.com/article/how-do-i-pause-my-delivery-for-a-holiday',
	);
});

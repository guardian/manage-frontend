import { conf } from './config';

export const helpCentreHomeForStage = (stage: string): string =>
	stage === 'PROD'
		? 'https://help.theguardian.com'
		: 'https://help.code.dev-theguardian.com';

/**
 * Paths under the `/help-centre` Express mount that should continue to be
 * served by manage-frontend (not redirected to the new help centre).
 *
 * `path` is the path within the mount (e.g. `/contact-us`, not `/help-centre/contact-us`).
 */
export const shouldRetainHelpCentrePath = (path: string): boolean => {
	const normalised =
		path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

	if (
		normalised === '/diagnostic-information' ||
		normalised === '/public-diagnostic-information'
	) {
		return true;
	}

	return (
		normalised === '/contact-us' || normalised.startsWith('/contact-us/')
	);
};

// we want to keep one redirect per line for clarity:
// prettier-ignore
const articleRedirects: Record<string, string> = {
	'contact-a-journalist-or-editorial-desk': 'how-do-i-contact-the-newsroom-or-pitch-a-story',
	'i-need-to-pause-my-delivery': 'how-do-i-pause-my-delivery-for-a-holiday',
	'i-want-to-cancel-my-subscription': 'how-do-i-cancel-my-subscription-or-recurring-contribution',
	'i-want-to-cancel-my-regular-payments-to-you': 'how-do-i-cancel-my-subscription-or-recurring-contribution',
	'im-a-print-subscriber-where-can-i-pick-up-my-papers': 'how-do-i-redeem-my-newspaper-vouchers',
	'guardian-editions-app': 'how-do-i-access-and-use-the-guardian-editions-app',
	'submit-an-idea-for-a-story': 'how-do-i-contact-the-newsroom-or-pitch-a-story',
	'why-am-i-still-seeing-adsbanners': 'why-am-i-still-seeing-ads-or-banners',
};

const customRedirects = Object.fromEntries(
	Object.entries(articleRedirects).map(([source, target]) => [
		`/article/${source}`,
		`/article/${target}`,
	]),
);

export function redirectForPath(path: string): string {
	const helpCentreRoot = helpCentreHomeForStage(conf.STAGE);
	const targetPath = customRedirects[path] ?? '/';
	return helpCentreRoot + targetPath;
}

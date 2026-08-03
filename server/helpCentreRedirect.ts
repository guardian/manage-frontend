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

const customRedirects: Record<string, string> = {
	'/article/contact-a-journalist-or-editorial-desk':
		'/article/how-do-i-contact-the-newsroom-or-pitch-a-story',
	'/article/i-need-to-pause-my-delivery':
		'/article/how-do-i-pause-my-delivery-for-a-holiday',
	'/article/i-want-to-cancel-my-subscription':
		'/article/how-do-i-cancel-my-subscription-or-recurring-contribution',
	'/article/i-want-to-cancel-my-regular-payments-to-you':
		'/article/how-do-i-cancel-my-subscription-or-recurring-contribution',
	'/article/im-a-print-subscriber-where-can-i-pick-up-my-papers':
		'/article/how-do-i-redeem-my-newspaper-vouchers',
	'/article/guardian-editions-app':
		'/article/how-do-i-access-and-use-the-guardian-editions-app',
	'/article/submit-an-idea-for-a-story':
		'/article/how-do-i-contact-the-newsroom-or-pitch-a-story',
};

export function redirectForPath(path: string): string {
	const helpCentreRoot = helpCentreHomeForStage(conf.STAGE);
	const targetPath = customRedirects[path] ?? '/';
	return helpCentreRoot + targetPath;
}

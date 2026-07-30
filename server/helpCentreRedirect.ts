export const NEW_HELP_CENTRE_HOME = 'https://help.theguardian.com/';

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

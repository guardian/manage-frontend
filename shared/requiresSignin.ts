import { normalize } from 'path'; // webpack polyfills this for the browser via node-polyfill-webpack-plugin

type PublicPath = string | { path: string; exclude: string };

// To avoid security vulnerabilities do not add public paths that do not end in a slash
const publicPaths: PublicPath[] = [
	'/api/contact-us/',
	'/api/known-issues/',
	'/api/reminders/cancel/',
	'/api/public/reminders/',
	'/api/help-centre/',
	'/api/csp-audit-report-endpoint/',
	'/cancel-reminders/',
	'/create-reminder/',
	{
		path: '/help-centre/',
		exclude: '/help-centre/diagnostic-information/signed-in/',
	},
	'/maintenance/',
	'/sign-in-error/',
];

export const requiresSignin = (path: string) => {
	const pathWithoutQuerystring = path.split('?')[0];
	const normalizedPath = normalize(pathWithoutQuerystring + '/');
	return !publicPaths.some((publicPath) => {
		if (typeof publicPath === 'string') {
			return normalizedPath.startsWith(publicPath);
		} else {
			return (
				normalizedPath.startsWith(publicPath.path) &&
				!normalizedPath.startsWith(publicPath.exclude)
			);
		}
	});
};

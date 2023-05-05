import { normalize } from 'path'; // webpack polyfills this for the browser via node-polyfill-webpack-plugin

// To avoid security vulnerabilities do not add public paths that do not end in a slash
const publicPaths = [
	'/api/contact-us/',
	'/api/known-issues/',
	'/api/reminders/cancel/',
	'/api/public/reminders/',
	'/api/help-centre/',
	'/cancel-reminders/',
	'/create-reminder/',
	'/help-centre/',
	'/maintenance/',
];

export const requiresSignin = (path: string) => {
	const pathWithoutQuerystring = path.split('?')[0];
	const normalizedPath = normalize(pathWithoutQuerystring + '/');
	return !publicPaths.some((publicPath) =>
		normalizedPath.startsWith(publicPath),
	);
};

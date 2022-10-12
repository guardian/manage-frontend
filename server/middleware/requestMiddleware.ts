import type { UrlWithParsedQuery } from 'url';
import url from 'url';

export interface MockableExpressRequest {
	baseUrl: string;
	path: string;
	get: (name: string) => string | undefined;
	header: (name: string) => string | undefined;
	query: any;
}

type QueryParameters = Record<string, string>;

// Names of query parameters to that facilitate sign-in on profile.
export const signInTokenQueryParameterNames = [
	'encryptedEmail',
	'autoSignInToken',
];

// Filter query parameters to include only those whose name satisfies the predicate p.
const filterQueryParametersByName = (
	params: QueryParameters,
	p: (name: string) => boolean,
): QueryParameters => {
	return Object.entries(params)
		.filter(([name, _]) => p(name))
		.reduce(
			(params2, [name, value]) => ({ ...params2, [name]: value }),
			{},
		);
};

// Adds the redirect url (if defined) as query parameter profileReferer,
// and removes the sign-in token query parameters since they are not required by manage
// (only used by profile if the user is redirected their to sign-in).
export const updateManageUrl = (
	req: MockableExpressRequest,
	useRefererHeader: boolean,
	redirectUrl?: UrlWithParsedQuery,
): string => {
	// It is vital that the sign-in query parameters are removed.
	// See the implementation of withIdentity() for more context.
	const queryParameters = filterQueryParametersByName(
		req.query,
		(name) => !signInTokenQueryParameterNames.includes(name),
	);

	const profileReferrer =
		redirectUrl && redirectUrl.path
			? redirectUrl.path.substring(1)
			: undefined;

	const refererHeader = req.header('referer');

	return useRefererHeader && refererHeader
		? refererHeader
		: url.format({
				protocol: 'https',
				host: req.get('host'),
				pathname: req.baseUrl + req.path,
				query: {
					...queryParameters,
					profileReferrer,
				},
		  });
};

export const augmentRedirectURL = (
	req: MockableExpressRequest,
	simpleRedirectURL: string,
	currentDomain: string,
	useRefererHeaderForReturnURL: boolean,
) => {
	const parsedSimpleURL = url.parse(
		// the replace below essentially allows DEV to use CODE IDAPI but still redirect to profile.thegulocal.com
		simpleRedirectURL.replace('code.dev-theguardian.com', currentDomain),
		true,
	);

	const returnUrl = updateManageUrl(
		req,
		useRefererHeaderForReturnURL,
		parsedSimpleURL,
	);

	// To avoid potential clashes with query parameters that have a special meaning on profile (e.g. error),
	// only forward specific query parameters to profile.
	const profileQueryParameterNames = [
		'INTCMP',
		// By passing these to profile, can measure the sign in rates across test segments.
		'abName',
		'abVariant',
		'journey',
		...signInTokenQueryParameterNames,
	];

	const profileQueryParameters = filterQueryParametersByName(
		req.query,
		(name) => profileQueryParameterNames.includes(name),
	);

	return url.format({
		protocol: parsedSimpleURL.protocol,
		host: parsedSimpleURL.host,
		pathname: parsedSimpleURL.pathname,
		query: {
			...parsedSimpleURL.query,
			...profileQueryParameters,
			returnUrl, // this is automatically URL encoded
		},
	});
};

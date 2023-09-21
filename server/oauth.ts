import crypto from 'crypto';
import { joinUrl } from '@guardian/libs';
import OktaJwtVerifier from '@okta/jwt-verifier';
import type { Request, Response } from 'express';
import ms from 'ms';
import type { IssuerMetadata } from 'openid-client';
import { generators, Issuer } from 'openid-client';
import type { OktaConfig } from '@/server/oktaConfig';
import { getConfig as getOktaConfig } from '@/server/oktaConfig';

export const OAuthAccessTokenCookieName = 'GU_ACCESS_TOKEN';
export const OAuthIdTokenCookieName = 'GU_ID_TOKEN';
export const OAuthStateCookieName = 'GU_oidc_auth_state';

// interface CookieOptions {
// 	domain: string;
// 	httpOnly: boolean;
// 	secure: boolean;
// 	signed: boolean;
// 	sameSite: 'lax';
// }

// export const cookieOptions = (key: string): CookieOptions => ({
// 	// If setting an OAuth cookie, we only want to set it for the subdomain,
// 	// otherwise for the root domain.
// 	domain: `${
// 		[OAuthAccessTokenCookieName, OAuthIdTokenCookieName].includes(key)
// 			? 'manage'
// 			: ''
// 	}.${getDomain().split(':')[0]}`,
// 	httpOnly: !['GU_U', 'GU_SO'].includes(key), // unless GU_U/GU_SO cookie, set to true
// 	secure: !['GU_U', 'GU_SO'].includes(key), // unless GU_U/GU_SO cookie, set to true
// 	signed: !['GU_U', 'GU_SO'].includes(key), // unless GU_U/GU_SO cookie, set to true
// 	sameSite: 'lax',
// });

// console.log('COOKIE OPTIONS (IDAPI): ', cookieOptions('GU_SO'));
// console.log('COOKIE OPTIONS (OAUTH): ', cookieOptions(OAuthIdTokenCookieName));

const oauthTokenVerifier = (oktaConfig: OktaConfig) =>
	new OktaJwtVerifier({
		issuer: joinUrl(oktaConfig.orgUrl, '/oauth2/', oktaConfig.authServerId),
	});

export const verifyAccessToken = async (token: string) => {
	const oktaConfig = await getOktaConfig();
	try {
		const jwt = await oauthTokenVerifier(oktaConfig).verifyAccessToken(
			token,
			// The aud claim in the access token must match the audience
			// set on the authorization server in Okta, which is the full URL
			// with trailing slash
			joinUrl(oktaConfig.orgUrl, '/'),
		);
		return jwt;
	} catch (error) {
		console.error('Okta | Access Token | Verification Error', error);
	}
};

export const verifyIdToken = async (token: string) => {
	const oktaConfig = await getOktaConfig();
	try {
		const jwt = await oauthTokenVerifier(oktaConfig).verifyIdToken(
			token,
			// The aud claim in the ID token must match the client ID
			oktaConfig.clientId,
		);
		return jwt;
	} catch (error) {
		console.error('Okta | ID Token | Verification Error', error);
	}
};

export type Scopes =
	| 'openid'
	| 'profile'
	| 'email'
	| 'guardian.avatar-api.read.self'
	| 'guardian.avatar-api.update.self'
	| 'guardian.identity-api.newsletters.read.self'
	| 'guardian.identity-api.newsletters.update.self'
	| 'guardian.identity-api.user.read.self.secure'
	| 'guardian.identity-api.user.update.self.secure'
	| 'guardian.identity-api.user.username.create.self.secure'
	| 'guardian.identity-api.consents.read.self'
	| 'guardian.identity-api.consents.update.self';

export const scopes: Scopes[] = [
	'openid',
	'profile',
	'email',
	'guardian.avatar-api.read.self',
	'guardian.avatar-api.update.self',
	'guardian.identity-api.newsletters.read.self',
	'guardian.identity-api.newsletters.update.self',
	'guardian.identity-api.user.read.self.secure',
	'guardian.identity-api.user.update.self.secure',
	'guardian.identity-api.user.username.create.self.secure',
	'guardian.identity-api.consents.read.self',
	'guardian.identity-api.consents.update.self',
];

export const ManageMyAccountOpenIdClient = async () => {
	const oktaConfig = await getOktaConfig();
	const issuer = joinUrl(
		oktaConfig.orgUrl,
		'/oauth2/',
		oktaConfig.authServerId,
	);
	const OIDC_METADATA: IssuerMetadata = {
		issuer,
		authorization_endpoint: joinUrl(issuer, '/v1/authorize'),
		token_endpoint: joinUrl(issuer, '/v1/token'),
		jwks_uri: joinUrl(issuer, '/v1/keys'),
		userinfo_endpoint: joinUrl(issuer, '/v1/userinfo'),
		registration_endpoint: joinUrl(issuer, '/oauth2/v1/clients'),
		introspection_endpoint: joinUrl(issuer, '/v1/introspect'),
		revocation_endpoint: joinUrl(issuer, '/v1/revoke'),
		end_session_endpoint: joinUrl(issuer, '/v1/logout'),
	};

	const OIDCIssuer = new Issuer(OIDC_METADATA);

	return new OIDCIssuer.Client({
		client_id: oktaConfig.clientId,
		client_secret: oktaConfig.clientSecret,
		redirect_uris: ['https://manage.thegulocal.com/oauth/callback'],
	});
};

/**
 * @param closeExistingSession (optional) - if true, we'll close any existing okta session before calling the authorization code flow
 * @param confirmationPagePath (optional) - page to redirect the user to after authentication
 * @param doNotSetLastAccessCookie (optional) - if true, does not update the SC_GU_LA cookie during update of Idapi cookies.  Default false.
 * @param idp (optional) - okta id of the social identity provider to use
 * @param prompt (optional) - if provided, we'll use this to set the prompt parameter, see https://developer.okta.com/docs/reference/api/oidc/#parameter-details for prompt parameter details, N.B `undefined` has a different meaning to `none`
 * @param redirectUri - the redirect uri to use for the /authorize endpoint
 * @param scopes (optional) - any scopes to use for the /authorize endpoint, defaults to ['openid']
 * @param sessionToken (optional) - if provided, we'll use this to set the session cookie
 */
interface PerformAuthorizationCodeFlowOptions {
	closeExistingSession?: boolean;
	confirmationPagePath?: string;
	doNotSetLastAccessCookie?: boolean;
	idp?: string;
	prompt?: 'login' | 'none';
	redirectUri: string;
	scopes: Scopes[];
	sessionToken?: string | null;
	returnUrl?: string;
}

/**
 * @name performAuthorizationCodeFlow
 * @description Helper method to perform the Authorization Code Flow
 *
 * Used for post authentication with the session token to set a session cookie.
 *
 * @param req - the express request object
 * @param res - the express response object
 * @param options - the options for the authorization code flow
 * @returns 303 redirect to the okta /authorize endpoint
 */
export const performAuthorizationCodeFlow = async (
	_req: Request,
	res: Response,
	{
		sessionToken,
		// confirmationPagePath,
		// idp,
		// closeExistingSession,
		// doNotSetLastAccessCookie = false,
		// prompt,
		scopes = ['openid'],
		redirectUri,
		returnUrl,
	}: PerformAuthorizationCodeFlowOptions,
) => {
	const OpenIdClient = await ManageMyAccountOpenIdClient();

	// Encode the redirectUri, a state token, and the PKCE code verifier into a state cookie
	const stateToken = crypto.randomBytes(16).toString('base64');
	const codeVerifier = generators.codeVerifier();
	const codeChallenge = generators.codeChallenge(codeVerifier);
	const codeChallengeMethod = 'S256';
	const state = {
		returnUrl,
		stateToken,
		codeVerifier,
	};
	const encodedState = Buffer.from(JSON.stringify(state)).toString('base64');
	res.cookie(OAuthStateCookieName, encodedState, {
		httpOnly: true,
		maxAge: ms('10m'),
		secure: true,
		signed: true,
	});

	// generate the /authorize endpoint url which we'll redirect the user to
	const authorizeUrl = OpenIdClient.authorizationUrl({
		// Should this always be 'login'?
		prompt: 'login',
		// The sessionToken from authentication to exchange for session cookie
		sessionToken,
		// we send the generated stateParam as the state parameter
		state: stateToken,
		// any scopes, by default the 'openid' scope is required
		scope: scopes.join(' '),
		// the redirect_uri is the callback location we'll redirect to after authentication
		redirect_uri: redirectUri, // /ouauth/authorization-code/callback
		// PKCE
		code_challenge: codeChallenge,
		code_challenge_method: codeChallengeMethod,
		response_type: 'code',
		// A max age of 30 minutes means that the user will be prompted to re-authenticate
		// after 30 minutes of inactivity
		max_age: ms('30m'),
	});

	console.log('  AUTHORIZE URL:', authorizeUrl);

	// redirect the user to the authorize URL
	return res.redirect(303, authorizeUrl);
};

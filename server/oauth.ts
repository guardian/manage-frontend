import crypto from 'crypto';
import { joinUrl } from '@guardian/libs';
import OktaJwtVerifier from '@okta/jwt-verifier';
import type { CookieOptions, Request, Response } from 'express';
import ms from 'ms';
import type { IssuerMetadata } from 'openid-client';
import { generators, Issuer } from 'openid-client';
import { conf } from '@/server/config';
import type { OktaConfig } from '@/server/oktaConfig';
import { getConfig as getOktaConfig } from '@/server/oktaConfig';
import { getConfig } from './idapiConfig';

export const OAuthAccessTokenCookieName = 'GU_ACCESS_TOKEN';
export const OAuthIdTokenCookieName = 'GU_ID_TOKEN';
export const OAuthStateCookieName = 'GU_oidc_auth_state';

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
	| 'guardian.identity-api.consents.update.self'
	| 'guardian.identity-api.cookies.create.self.secure'
	| 'guardian.members-data-api.complete.read.self.secure'
	| 'guardian.members-data-api.read.self'
	| 'guardian.members-data-api.update.self.secure';

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
	'guardian.identity-api.cookies.create.self.secure',
	'guardian.members-data-api.complete.read.self.secure',
	'guardian.members-data-api.read.self',
	'guardian.members-data-api.update.self.secure',
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
		redirect_uris: [`https://manage.${conf.DOMAIN}/oauth/callback`],
	});
};

/**
 * @param redirectUri - the redirect uri to use for the /authorize endpoint
 * @param scopes (optional) - any scopes to use for the /authorize endpoint, defaults to ['openid']
 * @param sessionToken (optional) - if provided, we'll use this to set the session cookie
 * @param returnPath (optional) - if provided, we'll use this as the return path after the /authorize callback
 */
interface PerformAuthorizationCodeFlowOptions {
	redirectUri: string;
	scopes: Scopes[];
	sessionToken?: string | null;
	returnPath?: string;
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
		scopes = ['openid'],
		redirectUri,
		returnPath,
	}: PerformAuthorizationCodeFlowOptions,
) => {
	const OpenIdClient = await ManageMyAccountOpenIdClient();

	// Encode the returnPath, a state token, and the PKCE code verifier into a state cookie
	const stateToken = crypto.randomBytes(16).toString('base64');
	const codeVerifier = generators.codeVerifier();
	const codeChallenge = generators.codeChallenge(codeVerifier);
	const codeChallengeMethod = 'S256';
	const state = {
		returnPath,
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
		// The sessionToken from authentication to exchange for session cookie
		sessionToken,
		// we send the generated stateParam as the state parameter
		state: stateToken,
		// any scopes, by default the 'openid' scope is required
		scope: scopes.join(' '),
		// the redirect_uri is the callback location we'll redirect to after authentication
		redirect_uri: redirectUri, // /oauth/callback
		// PKCE
		code_challenge: codeChallenge,
		code_challenge_method: codeChallengeMethod,
		response_type: 'code',
		// A max age of 30 minutes means that the user will be prompted to re-authenticate
		// after 30 minutes of inactivity
		max_age: ms('30m') / 1000,
	});

	console.log('  AUTHORIZE URL:', authorizeUrl);

	// redirect the user to the authorize URL
	return res.redirect(303, authorizeUrl);
};

export interface IdapiCookie {
	key: string;
	value: string;
	sessionCookie?: boolean;
}

export interface IdapiCookies {
	values: IdapiCookie[];
	expiresAt: string;
}

export const exchangeAccessTokenForCookies = async (token: string) => {
	let idapiConfig;
	try {
		idapiConfig = await getConfig();
	} catch (e) {
		throw new Error('Error loading a valid config');
	}
	try {
		const response = await fetch(
			`https://${idapiConfig.host}/auth/oauth-token?format=cookies&persist=true`,
			{
				method: 'POST',
				body: JSON.stringify({
					token,
				}),
			},
		);
		if (!response.ok) {
			throw new Error(
				`Error fetching cookies from IDAPI: status ${response.status}.`,
			);
		}
		const json = await response.json();
		return json.cookies;
	} catch (error) {
		throw new Error(error);
	}
};

const idapiCookieOptions = (key: string): CookieOptions => ({
	domain: `.${conf.DOMAIN}`,
	httpOnly: !['GU_U', 'GU_SO'].includes(key), // unless GU_U/GU_SO cookie, set to true
	secure: true,
	sameSite: 'lax',
	path: '/',
});

export const setIDAPICookies = (res: Response, cookies: IdapiCookies) => {
	const { values, expiresAt } = cookies;
	values.forEach(({ key, value, sessionCookie = false }) => {
		const expires: Date | undefined = (() => {
			if (key === 'SC_GU_LA') {
				// have SC_GU_LA cookie expire in 30 mins, despite the fact that it is a session cookie
				// this is to support the Native App logging in with an in-app browser, so the cookie
				// isn't immediately deleted when the in app browser is closed
				return new Date(Date.now() + 30 * 60 * 1000);
			}
			if (sessionCookie) {
				return undefined;
			}
			return new Date(expiresAt);
		})();

		console.log(
			"Cookie options for '" + key + "': ",
			idapiCookieOptions(key),
		);

		res.cookie(key, value, {
			expires,
			...idapiCookieOptions(key),
		});
	});
};

import crypto from 'crypto';
import { joinUrl } from '@guardian/libs';
import OktaJwtVerifier from '@okta/jwt-verifier';
import type { Request, Response } from 'express';
import ms from 'ms';
import type { Client, IssuerMetadata } from 'openid-client';
import { generators, Issuer } from 'openid-client';
import { conf } from '@/server/config';
import { setIdentityLocalState } from '@/server/identityLocalState';
import { log } from '@/server/log';
import type { Scopes, VerifiedOAuthCookies } from '@/server/oauthConfig';
import {
	IdTokenClaims,
	OAuthAccessTokenCookieName,
	oauthCookieOptions,
	OAuthIdTokenCookieName,
	OAuthStateCookieName,
	scopes,
} from '@/server/oauthConfig';
import type { OktaConfig } from '@/server/oktaConfig';
import { getConfig as getOktaConfig } from '@/server/oktaConfig';

/**
 * @function getOktaOrgUrl
 *
 * In PROD and CODE, our Okta org URL comes directly from the Okta config.
 * In DEV, we always want it to point to CODE, despite the fact that the Okta config
 * for DEV points to the DEV org URL. This is so we can use the same Okta auth server
 * in DEV and CODE.
 */
const getOktaOrgUrl = (oktaConfig: OktaConfig) => {
	const { orgUrl } = oktaConfig;
	switch (conf.STAGE) {
		case 'PROD':
		case 'CODE':
			return orgUrl;
		case 'DEV':
		default:
			return orgUrl.replace(
				'.thegulocal.com',
				'.code.dev-theguardian.com',
			);
	}
};

const sharedTokenVerifierOptions = (
	oktaConfig: OktaConfig,
): OktaJwtVerifier.VerifierOptions => ({
	issuer: joinUrl(
		getOktaOrgUrl(oktaConfig),
		'/oauth2/',
		oktaConfig.authServerId,
	),
	clientId: oktaConfig.clientId,
});

/**
 * By default, the access token is verified by checking:
 * - It has the correct audience (the URL of the resource server that should accept the token)
 *   This is checked using the expectedAudience parameter of the verifyAccessToken method.
 * - It has the correct issuer (the URL of the authorization server that issued the token)
 *   This is checked using the issuer property of the OktaJwtVerifier constructor.
 * Additionally, we check that the client ID (cid) matches the client ID of the MMA application.
 * This ensures that MMA only accepts access tokens that it has generated.
 * This is checked using the optional assertClaims parameter of the verifyAccessToken method.
 */
const oauthAccessTokenVerifier = (oktaConfig: OktaConfig) =>
	new OktaJwtVerifier({
		...sharedTokenVerifierOptions(oktaConfig),
		assertClaims: {
			cid: oktaConfig.clientId,
		},
	});

/**
 * By default, the ID token is verified by checking:
 * - Its client ID matches the client ID of the MMA application
 *   This is checked using the expectedClientId parameter of the verifyIdToken method.
 * - It has the correct issuer (the URL of the authorization server that issued the token)
 *   This is checked using the issuer property of the OktaJwtVerifier constructor.
 * We don't need to make any custom assertClaims checks for the ID token.
 */
const oauthIdTokenVerifier = (oktaConfig: OktaConfig) =>
	new OktaJwtVerifier({
		...sharedTokenVerifierOptions(oktaConfig),
	});

export const verifyAccessToken = async (token: string) => {
	const oktaConfig = await getOktaConfig();
	try {
		const jwt = await oauthAccessTokenVerifier(
			oktaConfig,
		).verifyAccessToken(token, joinUrl(getOktaOrgUrl(oktaConfig), '/'));
		return jwt;
	} catch (error) {
		log.error('OAuth / Access Token / Verification Error', error);
	}
};

export const verifyIdToken = async (token: string) => {
	const oktaConfig = await getOktaConfig();
	try {
		const jwt = await oauthIdTokenVerifier(oktaConfig).verifyIdToken(
			token,
			oktaConfig.clientId,
		);
		return jwt;
	} catch (error) {
		log.error('OAuth / ID Token / Verification Error', error);
	}
};
export const ManageMyAccountOpenIdClient = async (oktaConfig: OktaConfig) => {
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
 * @class DevManageMyAccountOpenIdClient
 *
 * DEV ONLY
 *
 * Uses two issuers: one based on the dev config, which is used for
 * routing to local Gateway for the authorization, and one pointing
 * directly to CODE, which is used for the token exchange.
 */
const DevManageMyAccountOpenIdClient = (oktaConfig: OktaConfig) => {
	const issuer = joinUrl(
		'https://profile.code.dev-theguardian.com/oauth2/',
		oktaConfig.authServerId,
	);
	const devIssuer = joinUrl(
		oktaConfig.orgUrl,
		'/oauth2/',
		oktaConfig.authServerId,
	);
	const OIDC_METADATA: IssuerMetadata = {
		issuer,
		authorization_endpoint: joinUrl(devIssuer, '/v1/authorize'),
		token_endpoint: joinUrl(devIssuer, '/v1/token'),
		jwks_uri: joinUrl(devIssuer, '/v1/keys'),
		userinfo_endpoint: joinUrl(devIssuer, '/v1/userinfo'),
		registration_endpoint: joinUrl(devIssuer, '/oauth2/v1/clients'),
		introspection_endpoint: joinUrl(devIssuer, '/v1/introspect'),
		revocation_endpoint: joinUrl(devIssuer, '/v1/revoke'),
		end_session_endpoint: joinUrl(devIssuer, '/v1/logout'),
	};

	const OIDCIssuer = new Issuer(OIDC_METADATA);

	return new OIDCIssuer.Client({
		client_id: oktaConfig.clientId,
		client_secret: oktaConfig.clientSecret,
		redirect_uris: [`https://manage.${conf.DOMAIN}/oauth/callback`],
	});
};

/**
 * @function getOpenIdClient
 *
 * Used to determine which OpenIdClient to get based on the stage and headers
 * In development, we use the dev issuer to simulate a custom domain, so we
 * want the DevProfileIdClient
 * In production, we use the production issuer, so we want the ManageMyAccountOpenIdClient
 */
export const getOpenIdClient = async (): Promise<Client> => {
	const oktaConfig = await getOktaConfig();
	if (conf.STAGE === 'DEV') {
		return DevManageMyAccountOpenIdClient(oktaConfig);
	}
	return ManageMyAccountOpenIdClient(oktaConfig);
};

/**
 * @param redirectUri - the redirect uri to use for the /authorize endpoint
 * @param scopes (optional) - any scopes to use for the /authorize endpoint, defaults to ['openid']
 * @param sessionToken (optional) - if provided, we'll use this to set the session cookie
 * @param returnPath (optional) - if provided, we'll use this as the return path after the /authorize callback
 */
interface PerformAuthorizationCodeFlowOptions {
	redirectUri: string;
	scopes: readonly Scopes[];
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
	const OpenIdClient = await getOpenIdClient();

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
		...oauthCookieOptions,
		maxAge: ms('10m'),
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
		max_age: Math.floor(ms('30m') / 1000),
	});

	// redirect the user to the authorize URL
	return res.redirect(303, authorizeUrl);
};

/**
 * @name verifyOAuthCookiesLocally
 *
 * This verifies the tokens locally, i.e. without making a request to the Okta API,
 * by verifying the signature and checking the claims and expiry and ensuring that
 * the scopes are all the ones we expect.
 *
 * @param req - the Express request object
 * @returns either an object containing the verified access and ID tokens, or an empty object
 */
export const verifyOAuthCookiesLocally = async (
	req: Request,
): Promise<VerifiedOAuthCookies | undefined> => {
	const accessTokenCookie = req.signedCookies[OAuthAccessTokenCookieName];
	const idTokenCookie = req.signedCookies[OAuthIdTokenCookieName];

	if (accessTokenCookie && idTokenCookie) {
		const accessToken = await verifyAccessToken(accessTokenCookie);
		const idToken = await verifyIdToken(idTokenCookie);
		if (
			// check access token is valid
			accessToken &&
			// check that the id token is valid
			idToken &&
			// check that the access token is not expired
			!accessToken.isExpired() &&
			// check that the scopes are all the ones we expect
			scopes.every((scope) => accessToken.claims.scp?.includes(scope))
		) {
			return {
				accessToken,
				idToken,
			};
		}
	}
};

export const setLocalStateFromIdTokenOrUserCookie = (
	req: Request,
	res: Response,
	idToken?: OktaJwtVerifier.Jwt,
) => {
	// Mirrors the response we got previously from the auth/redirect endpoint
	// in IDAPI. We store the user's ID, name and email on the identity object
	// of res.locals so that it can be used by the rest of the app.
	// signInStatus is always 'signedInRecently' because we only get here
	// if the access and ID tokens are valid, and they're only valid for 30 minutes.
	// If we have an ID token, we set the local state from that.
	// Otherwise, if the GU_U cookie exists, we simply set 'signInStatus',
	// but not the other fields. This will allow the frontend to show the
	// signed in menu, but not show the user's name or email.
	const hasIdTokenOrUserCookie = idToken || req.cookies['GU_U'];

	const result = IdTokenClaims.safeParse(idToken?.claims);
	setIdentityLocalState(res, {
		signInStatus: hasIdTokenOrUserCookie ? 'signedInRecently' : undefined,
		userId: result.success ? result.data.legacy_identity_id : undefined,
		displayName: result.success ? result.data.name : undefined,
		email: result.success ? result.data.email : undefined,
	});
};

// Sanitize the return path to prevent open redirects.
// Allows relative paths starting with '/' and strips trailing slashes and query params.
export const sanitizeReturnPath = (returnPath: string) => {
	try {
		if (returnPath.match(/^(https?:)?\/\//)) {
			return '/';
		}
		const url = new URL(`https://example.com${returnPath}`);
		if (url.pathname.endsWith('/')) {
			return url.pathname.slice(0, -1);
		} else {
			return url.pathname;
		}
	} catch (err) {
		return '/';
	}
};

export const allIdapiCookiesSet = (req: Request) => {
	const idapiCookies = ['GU_U', 'SC_GU_U', 'SC_GU_LA'];
	return idapiCookies.every((cookie) => req.cookies[cookie]);
};

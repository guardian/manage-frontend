import type OktaJwtVerifier from '@okta/jwt-verifier';
import type { CookieOptions } from 'express';
import { z } from 'zod';

export const OAuthAccessTokenCookieName = 'GU_ACCESS_TOKEN';
export const OAuthIdTokenCookieName = 'GU_ID_TOKEN';
export const OAuthStateCookieName = 'GU_oidc_auth_state';

export interface VerifiedOAuthCookies {
	accessToken: OktaJwtVerifier.Jwt;
	idToken: OktaJwtVerifier.Jwt;
}

export const oauthCookieOptions: CookieOptions = {
	signed: true,
	secure: true,
	httpOnly: true,
};

// Zod schema for the claims we expect to find in the ID token
// and in responses from the Okta /userinfo endpoint
export const IdTokenClaims = z.object({
	legacy_identity_id: z.string(),
	email: z.string(),
	name: z.optional(z.string()),
});

export const scopes = [
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
	'guardian.members-data-api.complete.read.self.secure',
	'guardian.members-data-api.read.self',
	'guardian.members-data-api.update.self.secure',
] as const;
export type Scopes = typeof scopes[number];

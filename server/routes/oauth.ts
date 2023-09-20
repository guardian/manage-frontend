import type { Request, Response } from 'express';
import { Router } from 'express';
import ms from 'ms';
import {
	exchangeAccessTokenForCookies,
	ManageMyAccountOpenIdClient,
	OAuthStateCookieName,
	setIDAPICookies,
} from '@/server/oauth';
import { conf } from '../config';

const router = Router();

const handleCallbackRouteError = (err: Error, res: Response) => {
	console.error('OAuth / Callback endpoint error: ', err);
	res.redirect('/maintenance');
};

router.get('/callback', async (req: Request, res: Response) => {
	// Read the state cookie
	if (!req.signedCookies[OAuthStateCookieName]) {
		return handleCallbackRouteError(
			new Error('No state cookie found.'),
			res,
		);
	}
	const state = JSON.parse(
		Buffer.from(
			req.signedCookies[OAuthStateCookieName],
			'base64',
		).toString(),
	);

	const OpenIdClient = await ManageMyAccountOpenIdClient();

	const callbackParams = OpenIdClient.callbackParams(req);

	try {
		// Exchange the auth code for access and ID tokens
		// and validate the state token and PKCE code verifier
		const tokenSet = await OpenIdClient.callback(
			// the redirectUri is the callback location (this route)
			`https://manage.${conf.DOMAIN}/oauth/callback`,
			// the params sent to the callback
			callbackParams,
			// checks to make sure that everything is valid
			{
				// we're doing the auth code flow, so check for the correct type
				response_type: 'code',
				// check that the state token is the same
				state: state.stateToken,
				// check that the PKCE code verifier is correct
				code_verifier: state.codeVerifier,
			},
		);

		if (!tokenSet.access_token) {
			throw new Error('No access token returned');
		}
		if (!tokenSet.id_token) {
			throw new Error('No ID token returned');
		}

		// Set the access token and ID tokens as cookies
		res.cookie('GU_ACCESS_TOKEN', tokenSet.access_token, {
			signed: true,
			secure: true,
			httpOnly: true,
			maxAge: ms('30m'), // Same expiry as set in Okta
		});
		res.cookie('GU_ID_TOKEN', tokenSet.id_token, {
			signed: true,
			secure: true,
			httpOnly: true,
			maxAge: ms('30m'), // Same expiry as set in Okta
		});

		// Delete state cookie, for it is no longer needed
		res.clearCookie(OAuthStateCookieName, {
			httpOnly: true,
			secure: true,
			signed: true,
		});

		// Exchange the access token for IDAPI cookies.  To maintain dual
		// running of new, OAuth-powered API routes and 'classic' IDAPI
		// cookie-powered routes, we need to ensure that GU_U, SC_GU_U and
		// SC_GU_LA cookies are set.  We mint fresh cookies on IDAPI and set
		// them here.
		const cookies = await exchangeAccessTokenForCookies(
			tokenSet.access_token,
		);
		if (cookies) {
			setIDAPICookies(res, cookies);
		} else {
			throw new Error('No cookies returned from IDAPI.');
		}

		// Redirect to the original return path, if set, or the homepage
		res.redirect(state.returnPath || '/');
	} catch (err) {
		return handleCallbackRouteError(err, res);
	}
});

export { router };

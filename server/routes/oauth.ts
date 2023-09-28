import { Router } from 'express';
import ms from 'ms';
import {
	ManageMyAccountOpenIdClient,
	OAuthStateCookieName,
} from '@/server/oauth';
import { conf } from '../config';

const router = Router();

router.get('/callback', async (req, res) => {
	console.log('OAUTH FLOW: 2. Hit callback route');
	// Read the state cookie
	if (!req.signedCookies[OAuthStateCookieName]) {
		res.status(400).send('No state cookie found');
		// TODO: Handle this properly
		return;
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

		// Set the access token and ID tokens as cookies
		res.cookie('GU_ACCESS_TOKEN', tokenSet.access_token, {
			signed: true,
			secure: true,
			httpOnly: true,
			maxAge: ms('30m'), // Same expiry as set in Okta
		});
		// TODO: Do we need to set the ID token?
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

		// call the IDAPI /auth/oauth-token endpoint
		// to exchange the access token for identity cookies
		// the idapi introspects the access token and if valid
		// will generate and sign cookies for the user the
		// token belonged to
		// const cookies = await exchangeAccessTokenForCookies(
		// 	tokenSet.access_token,
		// 	req.ip,
		// 	res.locals.requestId,
		// );

		// if (cookies) {
		// 	// adds set cookie headers
		// 	setIDAPICookies(res, cookies, authState.doNotSetLastAccessCookie);
		// } else {
		// 	logger.error('No cookies returned from IDAPI', undefined, {
		// 		request_id: res.locals.requestId,
		// 	});
		// }

		console.log('  RETURN URL', state.returnUrl);

		// Redirect to the original return URL
		res.redirect(state.returnUrl);

		// res.json({
		// 	...tokenSet,
		// 	state,
		// });
	} catch (err) {
		console.log(err);
		res.json(err);
	}
});

export { router };

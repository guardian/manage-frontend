import { joinUrl } from '@guardian/libs';
import type { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import { conf } from '@/server/config';
import {
	clearIdentityLocalState,
	getIdentityLocalState,
	setIdentityLocalState,
} from '@/server/IdentityLocalState';
import {
	OAuthAccessTokenCookieName,
	performAuthorizationCodeFlow,
	sanitizeReturnPath,
	scopes,
} from '@/server/oauth';
import { getConfig as getOktaConfig } from '@/server/oktaConfig';
import { requiresSignin } from '../../shared/requiresSignin';

declare const CYPRESS: string;
//TODO remove all the extra console.log everywhere (not just on this file)
type UserInfo = {
	legacy_identity_id: string;
	email: string;
	name: string;
};

export const withOktaSeverSideValidation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const signinRequired = () => requiresSignin(req.originalUrl);

	//TODO I have no idea how this works and how safe it is
	if (CYPRESS === 'SKIP_IDAPI') {
		return next();
	}

	console.log(`Validating token server side for url: ${req.url}`);

	const locallyValidatedIdentityData = getIdentityLocalState(res);
	const accessToken = req.signedCookies[OAuthAccessTokenCookieName];
	if (
		!accessToken ||
		!locallyValidatedIdentityData ||
		!locallyValidatedIdentityData.userId
	) {
		if (signinRequired()) {
			//TODO what is the proper way to log errors ? console.error ?
			console.log(
				'error: no access token or user in request for a sign-in required endpoint! this should have failed local validation',
			);
			res.send(500);
		}
		return {};
	}

	// -------
	// this code is copied from oauth.ts, maybe this server side validation code could be moved there?
	// or maybe this could be extracted somewhere or exported.
	// In some way we should remove this duplication probably
	const oktaConfig = await getOktaConfig();
	const issuerUrl = joinUrl(
		oktaConfig.orgUrl,
		'/oauth2/',
		oktaConfig.authServerId,
	);
	// ------

	const oktaResponse = await fetch(`${issuerUrl}/v1/userinfo/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	console.log(`okta response status: ${oktaResponse.status}`);
	if (oktaResponse.status != 200) {
		clearIdentityLocalState(res);

		if (signinRequired()) {
			// TODO maybe extract this to a common location with the local validation ? (what to do when credentials are not valid)

			// TODO I'm not sure this even works because most of the places we do server side would not redirect properly even if local validation failed
			// they would just throw an error and you would have to reload the whole page

			// Get the path of the current page and use it as our returnPath after the OAuth callback.
			return performAuthorizationCodeFlow(req, res, {
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes,
				returnPath: sanitizeReturnPath(req.originalUrl),
			});
		}
		return {};
	} else {
		const userInfo = await oktaResponse.json<UserInfo>();
		if (
			userInfo.legacy_identity_id != locallyValidatedIdentityData.userId
		) {
			console.log("userId in token doesn't match userInfo response!");
			res.send(500);
			return {};
		}
		setIdentityLocalState(res, {
			signInStatus: 'signedInRecently', // TODO can I hardcode this here or do I need to check something else ?
			userId: userInfo.legacy_identity_id,
			name: userInfo.name,
			email: userInfo.email,
		});

		return next();
	}
};

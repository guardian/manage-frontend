import { joinUrl } from '@guardian/libs';
import type { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
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
	const locallyValidatedUserId = res.locals?.identity?.userId;

	if (!locallyValidatedUserId) {
		if (signinRequired()) {
			console.log(
				'error: could not find user id in request, expected local token validation to happen before server side check!',
			);
			res.send(500);
		} else {
			console.log(
				' no credentials, but they were optional so server side validation is skipped!',
			);
		}
		return {};
	}

	console.log(`MY USELESS MIDDLEWARE WAS CALLED with url  ${req.url}`);
	const authHeader = `Bearer ${req.signedCookies['GU_ACCESS_TOKEN']}`;
	// maybe move the actual okta code to oauth.ts or maybe rename to something that makes sense?
	const oktaConfig = await getOktaConfig();
	const issuerUrl = joinUrl(
		oktaConfig.orgUrl,
		'/oauth2/',
		oktaConfig.authServerId,
	);

	const oktaResponse = await fetch(`${issuerUrl}/v1/userinfo/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: authHeader,
		},
	});
	console.log(`n=>> response from okta was status: ${oktaResponse.status}`);
	if (oktaResponse.status != 200) {
		console.log('invalid credentials! failing server side validation!');
		res.send(401);
		return {};
	} else {
		const userInfo = await oktaResponse.json<UserInfo>();

		if (userInfo.legacy_identity_id != locallyValidatedUserId) {
			console.log("userId in token doesn't match userInfo response!");
			res.send(500);
			return {};
		}

		res.locals.identity = {
			signInStatus: 'signedInRecently',
			userId: userInfo.legacy_identity_id,
			name: userInfo.name,
			email: userInfo.email,
		};
		return next();
	}
};

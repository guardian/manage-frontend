import type { Request, Response } from 'express';
import type { MockableExpressRequest } from './middleware/requestMiddleware';
import { signInTokenQueryParameterNames } from './middleware/requestMiddleware';

export interface RedirectResponseBody extends IdentityDetails {
	signInStatus: string;
	redirect?: {
		url: string;
	};
}

export const containsSignInTokenQueryParameters = (
	req: MockableExpressRequest,
): boolean =>
	signInTokenQueryParameterNames.some(
		(name) => req.query[name] !== undefined,
	);

export const redirectOrCustomStatusCode = (
	res: Response,
	redirectURL: string,
	statusCode?: number,
) =>
	statusCode
		? res.status(statusCode).header('Location', redirectURL).send()
		: res.redirect(redirectURL);

export const getCookiesOrEmptyString = (req: Request) =>
	req.header('cookie') || '';

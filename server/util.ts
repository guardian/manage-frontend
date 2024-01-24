import type { IncomingMessage } from 'http';
import csrf from 'csurf';
import type {
	Response as ExpressResponse,
	NextFunction,
	Request,
} from 'express';

export const CLIENTSIDE_CSRF_COOKIE_NAME = 'XSRF-TOKEN';

export const csrfSendTokenMiddleware = (
	res: ExpressResponse,
	req: Request,
	next: NextFunction,
) => {
	res.cookie(CLIENTSIDE_CSRF_COOKIE_NAME, req.csrfToken(), {
		secure: true,
		sameSite: 'strict',
	});
	next();
};

export const csrfValidateMiddleware = csrf({
	cookie: {
		key: '_csrf',
		sameSite: true,
		secure: true,
		httpOnly: true,
	},
});

export const handleError = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the range of possible types for the error attribute?
	error: any,
	res: ExpressResponse,
	next: NextFunction,
) => {
	res.status(500).send({ status: 500, message: 'Internal service error' });
	next(error);
};

export const mimicResponse = (
	sourceResponse: IncomingMessage,
	targetResponse: ExpressResponse,
) => {
	if (sourceResponse.statusCode) {
		targetResponse.status(sourceResponse.statusCode);
	}
	targetResponse.set(sourceResponse.headers);
};

export const jsonOrEmpty = async (response: Response) => {
	try {
		return await response.json();
	} catch (e) {
		return {};
	}
};

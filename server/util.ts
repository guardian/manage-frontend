import type { IncomingMessage } from 'http';
import csrf from 'csurf';
import type { NextFunction, Response } from 'express';

export const crsfMiddleware = csrf({
	cookie: {
		key: '_csrf',
		sameSite: true,
		secure: true,
		httpOnly: true,
	},
});

export const handleError = (error: any, res: Response, next: NextFunction) => {
	res.status(500).send({ status: 500, message: 'Internal service error' });
	next(error);
};

export const mimicResponse = (
	sourceResponse: IncomingMessage,
	targetResponse: Response,
) => {
	if (sourceResponse.statusCode) {
		targetResponse.status(sourceResponse.statusCode);
	}
	targetResponse.set(sourceResponse.headers);
};

import type { Response } from 'express';
import type { IdentityDetails } from '@/shared/globals';

export const setIdentityLocalState = (
	res: Response,
	identityLocalState: IdentityDetails,
) => {
	res.locals.identity = identityLocalState;
};
export const getIdentityLocalState = (
	res: Response,
): IdentityDetails | undefined => {
	return res.locals?.identity;
};
export const clearIdentityLocalState = (res: Response) => {
	delete res.locals.identity;
};

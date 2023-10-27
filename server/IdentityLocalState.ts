import type { Response } from 'express';

//could this be unified with IdentityDetails in globalstate.ts ?
interface IdentityLocalState {
	userId?: string;
	email?: string;
	name?: string;
	signInStatus?: string;
}

export const setIdentityLocalState = (
	res: Response,
	identityLocalState: IdentityLocalState,
): void => {
	res.locals.identity = identityLocalState;
};
export const getIdentityLocalState = (
	res: Response,
): IdentityLocalState | undefined => {
	return res.locals.identity;
};
export const clearIdentityLocalState = (res: Response): void => {
	//TODO is this the best way to do this?
	delete res.locals.identity;
};

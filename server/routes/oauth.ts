import type { Request, Response } from 'express';
import { Router } from 'express';
import { withIdentity } from '../middleware/identityMiddleware';

const router = Router();

// TODO: Change this to withOAuth from rk/oauth-migration
router.get('/signin', withIdentity, (req: Request, res: Response) => {
	// This route essentially does nothing, but triggers the OAuth signin flow.
	// It is used by 'Sign In' buttons on the frontend, which pass a 'returnUrl'
	// query parameter to this route which is then handled by the middleware.

	// If we've fallen through to here, we're signed in - redirect.
	const returnUrl = (req.query.returnUrl as string) || '/';
	res.redirect(returnUrl);
});

export { router };

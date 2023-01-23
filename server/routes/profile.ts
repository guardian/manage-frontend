import type { Response } from 'express';
import { Router } from 'express';
import { conf } from '../config';
import { withIdentity } from '../middleware/identityMiddleware';

const router = Router();

router.get('/user', withIdentity(), (_, res: Response) =>
	res.locals.identity && res.locals.identity.userId
		? res.redirect(
				`https://profile.${conf.DOMAIN}/user/id/${res.locals.identity.userId}`,
		  )
		: res.status(500).send(),
);

export { router };

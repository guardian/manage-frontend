import type { Response } from 'express';
import { Router } from 'express';
import { withIdentity } from '../middleware/identityMiddleware';

const routeProvider = (apiPathPrefix: string) => {
	const router: Router = Router();

	router.get(
		`${apiPathPrefix}/fetchSavedArticles`,
		withIdentity(401), // 1/ middleware authenticates against identity
		(_, res: Response) =>
			// 2/ Make call to SFL API to fetch articles list - Need to forward Okta token credtentials tbc

			// 3/ use SFL response to query capi for article data and return to the client JSON data in the form required by client.
			//    TODO:config set up for capi api keys

			res.send('hello - you have hit the saved articles server route'),
	);

	return router;
};

export { routeProvider };

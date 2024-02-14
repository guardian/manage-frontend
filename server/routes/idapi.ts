import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import type { ConsentAPIResponse } from '@/client/components/mma/identity/idapi/consents';
import type { NewsletterAPIResponse } from '@/client/components/mma/identity/idapi/newsletters';
import type { NewsletterSubscriptions } from '@/client/components/mma/identity/idapi/newsletterSubscriptions';
import type {
	ConsentPatchRequest,
	NewsletterPatchRequest,
} from '../idapiProxy';
import { idapiProxyHandler } from '../idapiProxy';
import { withIdentity } from '../middleware/identityMiddleware';
import { csrfValidateMiddleware } from '../util';

const router = Router();

router.use(withIdentity(401));

router.get(
	'/user',
	idapiProxyHandler({
		url: '/user/me',
		sendAuthHeader: true,
	}),
);

router.put(
	'/user',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/user/me',
		method: 'POST',
		sendAuthHeader: true,
	}),
);

router.get(
	'/user/newsletters',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterSubscriptions>({
		url: '/users/me/newsletters',
		sendAuthHeader: true,
	}),
);

router.get(
	'/newsletters',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterAPIResponse[]>({
		url: '/newsletters',
		sendAuthHeader: false,
	}),
);

router.get(
	'/newsletters/restricted',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterAPIResponse[]>({
		url: '/newsletters/restricted',
		sendAuthHeader: false,
	}),
);

router.patch(
	'/user/newsletters',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterPatchRequest>({
		url: '/users/me/newsletters',
		method: 'PATCH',
		sendAuthHeader: true,
	}),
);

router.get(
	'/consents',
	csrfValidateMiddleware,
	idapiProxyHandler<ConsentAPIResponse[]>({
		url: '/consents?filter=all',
		sendAuthHeader: false,
	}),
);

router.patch(
	'/user/consents',
	csrfValidateMiddleware,
	idapiProxyHandler<ConsentPatchRequest>({
		url: '/users/me/consents',
		method: 'PATCH',
		sendAuthHeader: true,
	}),
);

router.delete(
	'/user/telephone-number',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/user/me/telephoneNumber',
		method: 'DELETE',
		sendAuthHeader: true,
	}),
);

router.delete(
	'/user/consents/all',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/remove/consent/all',
		method: 'POST',
		sendAuthHeader: true,
	}),
);

router.post(
	'/user/username',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/user/me/username',
		method: 'POST',
		sendAuthHeader: true,
	}),
);

router.post(
	'/user/username',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/user/me/username',
		method: 'POST',
	}),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the range of possible types for the err argument?
router.use((err: any, _: Request, res: Response, next: NextFunction) => {
	if (err.code && err.code === 'EBADCSRFTOKEN') {
		res.sendStatus(403);
	}
	next(err);
});

export { router };

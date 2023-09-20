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
import { withOAuth } from '../middleware/identityMiddleware';
import { csrfValidateMiddleware } from '../util';

const router = Router();

router.use(withOAuth);

router.get(
	'/user',
	idapiProxyHandler({
		url: '/user/me',
	}),
);

router.put(
	'/user',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/user/me',
		method: 'POST',
	}),
);

router.get(
	'/user/newsletters',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterSubscriptions>({
		url: '/users/me/newsletters',
	}),
);

router.get(
	'/newsletters',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterAPIResponse[]>({
		url: '/newsletters',
	}),
);

router.get(
	'/newsletters/restricted',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterAPIResponse[]>({
		url: '/newsletters/restricted',
	}),
);

router.patch(
	'/user/newsletters',
	csrfValidateMiddleware,
	idapiProxyHandler<NewsletterPatchRequest>({
		url: '/users/me/newsletters',
		method: 'PATCH',
	}),
);

router.get(
	'/user/consents',
	csrfValidateMiddleware,
	idapiProxyHandler<ConsentAPIResponse[]>({
		url: '/consents?filter=all',
	}),
);

router.patch(
	'/user/consents',
	csrfValidateMiddleware,
	idapiProxyHandler<ConsentPatchRequest>({
		url: '/users/me/consents',
		method: 'PATCH',
	}),
);

router.delete(
	'/user/telephone-number',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/user/me/telephoneNumber',
		method: 'DELETE',
	}),
);

router.delete(
	'/user/consents/all',
	csrfValidateMiddleware,
	idapiProxyHandler({
		url: '/remove/consent/all',
		method: 'POST',
	}),
);

router.use((err: any, _: Request, res: Response, next: NextFunction) => {
	if (err.code && err.code === 'EBADCSRFTOKEN') {
		res.sendStatus(403);
	}
	next(err);
});

export { router };

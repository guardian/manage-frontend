import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import type { FileAttachment } from '@/shared/fileUploadUtils';
import {
	base64ToBlob,
	MAX_AVATAR_FILE_SIZE_KB,
	validateFileAttachment,
} from '@/shared/fileUploadUtils';
import { getConfig } from '../idapiConfig';
import { setOptions } from '../idapiProxy';
import { withOAuth } from '../middleware/identityMiddleware';
import { handleError, jsonOrEmpty } from '../util';

interface AvatarAPIErrorResponse {
	message: string;
	errors: string[];
}

const sendAvatarAPIErrorResponse = (
	json: AvatarAPIErrorResponse,
	status: number,
	res: Response,
) => {
	res.status(status).send(json);
};

const router = Router();

router.use(withOAuth);

router.get(
	'/avatar',
	async (req: Request, res: Response, next: NextFunction) => {
		let config;
		try {
			config = await getConfig();
		} catch (e) {
			handleError(e, res, next);
			return;
		}
		const options = setOptions({
			useOAuth: !!res.locals.identity.accessToken,
			path: '/v1/avatars/user/me/active',
			subdomain: 'avatar',
			method: 'GET',
			cookies: req.cookies,
			signedCookies: req.signedCookies,
			config,
		});
		try {
			const response = await fetch(options.route, {
				method: options.method,
				headers: options.headers,
			});
			const json = await jsonOrEmpty(response);
			if (!response.ok) {
				res.status(response.status).send(json);
			} else if (response.status === 204) {
				return res.sendStatus(204);
			} else {
				res.json(json);
			}
		} catch (error) {
			sendAvatarAPIErrorResponse(
				{
					message: 'Error.',
					errors: [error],
				},
				500,
				res,
			);
		}
	},
);

/**
 * Proxies a FormData payload sent from the client to Avatar API.
 * Receives a payload of type FileAttachment:
 *     {
 * 	       name: string,
 * 		   type: string,
 * 		   contents: string,
 *     }
 * Where `contents` is a Base64-encoded string of the file contents.
 * We use this behaviour rather than a standard file upload using
 * multipart/form-data becasuse the existing file upload form attached
 * to the Help Centre contact form uses this method, and the server is
 * already set up to handle it.
 */
router.post(
	'/avatar',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = JSON.parse(req.body) as FileAttachment;
			if (!validateFileAttachment(body, MAX_AVATAR_FILE_SIZE_KB)) {
				throw new Error('Invalid file.');
			}
			let config;
			try {
				config = await getConfig();
			} catch (e) {
				handleError(e, res, next);
				return;
			}
			const options = setOptions({
				useOAuth: !!res.locals.identity.accessToken,
				path: '/v1/avatars',
				subdomain: 'avatar',
				method: 'POST',
				cookies: req.cookies,
				signedCookies: req.signedCookies,
				config,
			});
			// Recerate a FormData payload from the Base64-encoded file contents string.
			// FormData expects a Blob (a File is a type of Blob) so we need to convert
			// the string to a Blob.
			const formData = new FormData();
			formData.append('file', base64ToBlob(body.contents), body.name);
			// Manually delete the Content-Type header from the options object.
			// We need to do this because the Content-Type for a FormData object is akin to:
			//     Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
			// And the boundary section is generated internally by the Fetch API to make sure it doesn't
			// appear in the file data. If we set the Content-Type header ourselves, we don't set the
			// boundary and the request becomes invalid. We also can't set it to undefined because the
			// Fetch API will then send it as the string 'undefined'.
			delete options.headers['Content-Type'];
			const response = await fetch(options.route, {
				method: options.method,
				headers: options.headers,
				body: formData,
			});
			const json = await jsonOrEmpty(response);
			if (!response.ok) {
				res.status(response.status).send(json);
			} else if (response.status === 204) {
				return res.sendStatus(204);
			} else {
				res.json(json);
			}
		} catch (error) {
			sendAvatarAPIErrorResponse(
				{
					message: 'Unexpected error.',
					errors: [error.message],
				},
				500,
				res,
			);
			return;
		}
	},
);

export { router };

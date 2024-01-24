import { captureMessage } from '@sentry/node';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { contactUsConfig } from '../shared/contactUsConfig';
import type { ContactUsReq } from '../shared/contactUsTypes';
import {
	validateBase64FileSize,
	validateImageFileExtension,
} from '../shared/fileUploadUtils';
import { isEmail } from '../shared/validationUtils';
import { getContactUsAPIHostAndKey } from './apiGatewayDiscovery';
import { log } from './log';
import { recaptchaConfigPromise } from './recaptchaConfig';

export const contactUsFormHandler = async (req: Request, res: Response) => {
	const validBody = await parseAndValidate(req.body);
	if (!validBody) {
		// This could indicate we have a bug in our code or an external system is making invalid requests to this endpoint
		const errorMessage = `Could not parse and validate Contact Us request body.`;
		log.error(errorMessage);
		captureMessage(errorMessage);
		return res.status(400).send();
	}

	const apiConfig = await getContactUsAPIHostAndKey();
	if (!apiConfig) {
		const errorMessage = 'Could not obtain contact-us-api host/key.';
		log.error(errorMessage);
		captureMessage(errorMessage);
		return res.status(500).send();
	}

	fetch(apiConfig.host, {
		method: 'POST',
		body: JSON.stringify(validBody),
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': apiConfig.apiKey,
		},
	})
		.then((contactUsAPIResponse) => {
			if (!contactUsAPIResponse.ok) {
				const errorMessage = `Unexpected error from contact-us-api endpoint. ${contactUsAPIResponse.status} ${contactUsAPIResponse.statusText}`;
				log.error(errorMessage);
				captureMessage(errorMessage);
			}
			res.status(contactUsAPIResponse.status).send();
		})
		.catch((error) => {
			const errorMessage =
				'Unexpected error when trying to contact contact-us-api endpoint.';
			log.error(errorMessage, error);
			captureMessage(errorMessage);
			res.status(500).send();
		});
};

const parseAndValidate = async (
	body: any,
): Promise<ContactUsReq | undefined> => {
	try {
		const bodyAsJson = body ? JSON.parse(body) : '{}';
		const isBodyValid = await validateContactUsFormBody(bodyAsJson);
		return isBodyValid ? buildContactUsReqBody(bodyAsJson) : undefined;
	} catch (error) {
		return undefined;
	}
};

const validateCaptchaToken = async (token: string) => {
	const captchaConfigPromise = await recaptchaConfigPromise;
	if (!captchaConfigPromise) {
		captureMessage('Could not retrieve recaptcha config');
		return false;
	}
	const recaptchaSecret = captchaConfigPromise?.secretKey;
	const captchaValidationResponse = await fetch(
		'https://www.google.com/recaptcha/api/siteverify',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `secret=${recaptchaSecret}&response=${token}`,
		},
	);
	const json = await captchaValidationResponse.json();
	return json.success;
};

const validateFileAttachment = (fileName: string, base64String: string) =>
	validateBase64FileSize(base64String) &&
	validateImageFileExtension(fileName);

const validateContactUsFormBody = async (body: any): Promise<boolean> =>
	body &&
	body.topic &&
	validateTopics(body.topic, body.subtopic, body.subsubtopic) &&
	body.name &&
	body.email &&
	isEmail(body.email) &&
	body.subject &&
	body.message &&
	body.captchaToken &&
	(await validateCaptchaToken(body.captchaToken)) &&
	(body.attachment
		? validateFileAttachment(body.attachment.name, body.attachment.contents)
		: true);

const validateTopics = (
	reqTopic: unknown,
	reqSubtopic: unknown,
	reqSubsubtopic: unknown,
): boolean => {
	// Validate topic
	const topic = contactUsConfig.find(
		(topicEntry) => topicEntry.id === reqTopic,
	);
	if (!topic || topic.noForm) {
		return false;
	}

	// Validate subtopic
	const subtopicList = topic.subtopics;
	if (subtopicList) {
		if (!reqSubtopic) {
			return false;
		}

		const subtopic = subtopicList.find(
			(subtopicEntry) => subtopicEntry.id === reqSubtopic,
		);
		if (!subtopic || subtopic.noForm) {
			return false;
		}

		// Validate subsubtopic
		const subsubtopicList = subtopic.subsubtopics;
		if (subsubtopicList) {
			if (!reqSubsubtopic) {
				return false;
			}

			const subsubtopic = subsubtopicList.find(
				(subsubtopicEntry) => subsubtopicEntry.id === reqSubsubtopic,
			);
			if (!subsubtopic || subsubtopic.noForm) {
				return false;
			}
		} else if (reqSubsubtopic) {
			return false;
		}
	} else if (reqSubtopic || reqSubsubtopic) {
		return false;
	}

	return true;
};

const buildContactUsReqBody = (body: any): ContactUsReq => {
	const attachment =
		body.attachment?.name && body.attachment?.contents
			? {
					name: body.attachment.name,
					contents: body.attachment.contents,
			  }
			: undefined;

	return {
		topic: body.topic,
		...(body.subtopic && {
			subtopic: body.subtopic,
		}),
		...(body.subsubtopic && {
			subsubtopic: body.subsubtopic,
		}),
		name: (body.name as string).substr(0, 50),
		email: (body.email as string).substr(0, 50),
		subject: (body.subject as string).substr(0, 100),
		message: (body.message as string).substr(0, 2500),
		...(attachment && {
			attachment,
		}),
	};
};

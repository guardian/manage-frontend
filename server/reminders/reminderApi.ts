import crypto from 'crypto';
import { captureMessage } from '@sentry/node';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { s3ConfigPromise } from '../awsIntegration';
import { conf } from '../config';
import type { ReminderType } from './reminderData';
import { addReminderPeriod } from './reminderData';

const COUNTRY_CODE_HEADER = 'X-GU-GeoIP-Country-Code';

interface RemindersConfig {
	reminderHmacKey: string;
}

const reminderConfigPromise = s3ConfigPromise<RemindersConfig>()('reminders');

const getReminderHmacKey = (): Promise<string> =>
	reminderConfigPromise.then((result) => {
		if (result?.reminderHmacKey) {
			return result.reminderHmacKey;
		} else {
			return Promise.reject(new Error('Failed to get reminder Hmac key'));
		}
	});

export const createOneOffReminderHandler = (req: Request, res: Response) =>
	createReminder('ONE_OFF', req.body, req.header(COUNTRY_CODE_HEADER)).then(
		(response) => {
			if (!response.ok) {
				captureMessage(
					'Reminder sign up failed at the point of request',
				);
			}
			res.sendStatus(response.status);
		},
	);

interface CreateReminderRequest {
	reminderData: string;
	token: string;
}

const parseCreateReminderRequest = (
	req: Request,
): CreateReminderRequest | undefined => {
	try {
		const { reminderData, token } = JSON.parse(req.body);

		if (reminderData && token) {
			return { reminderData, token };
		}
		return undefined;
	} catch {
		return undefined;
	}
};

const isValidReminderToken = (
	request: CreateReminderRequest,
	key: string,
): boolean => {
	const hash = crypto
		.createHmac('sha1', key)
		.update(request.reminderData)
		.digest('hex');

	return hash === request.token;
};

// Instead of requiring the user to be signed in, this endpoint verifies the token
export const publicCreateReminderHandler =
	(reminderType: ReminderType) => async (req: Request, res: Response) => {
		getReminderHmacKey()
			.then(async (reminderHmacKey) => {
				const requestData = parseCreateReminderRequest(req);
				if (
					requestData &&
					isValidReminderToken(requestData, reminderHmacKey)
				) {
					const reminderDataWithReminderPeriod = addReminderPeriod(
						reminderType,
						JSON.parse(requestData.reminderData),
					);

					return createReminder(
						reminderType,
						JSON.stringify(reminderDataWithReminderPeriod),
						req.header(COUNTRY_CODE_HEADER),
					).then((response) => {
						if (!response.ok) {
							captureMessage(
								'Reminder sign up failed at the point of request',
							);
							return response.status;
						}
						return 200;
					});
				} else {
					return 400;
				}
			})
			.then((statusCode) => {
				res.sendStatus(statusCode);
			})
			.catch((err) => {
				captureMessage(`Reminder sign up failed: ${err}`);
				res.sendStatus(500);
			});
	};

export const cancelReminderHandler = (req: Request, res: Response) =>
	cancelReminder(req.body).then((response) => {
		if (!response.ok) {
			captureMessage('Cancel failed at the point of request');
		}
		res.sendStatus(response.status);
	});

export const reactivateReminderHandler = (req: Request, res: Response) =>
	reactivateReminder(req.body).then((response) => {
		if (!response.ok) {
			captureMessage('Reactivate failed at the point of request');
		}
		res.sendStatus(response.status);
	});

const isProd = conf.STAGE === 'PROD';

const baseReminderEndpoint = isProd
	? 'https://support.theguardian.com/reminders/'
	: 'https://support.code.dev-theguardian.com/reminders/';

const createOneOffReminderEndpoint = baseReminderEndpoint + 'create/one-off';
const createRecurringReminderEndpoint =
	baseReminderEndpoint + 'create/recurring';
const cancelRemindersEndpoint = baseReminderEndpoint + 'cancel';
const reactivateRemindersEndpoint = baseReminderEndpoint + 'reactivate';

const createReminder = (
	reminderType: ReminderType,
	reminderData: string,
	country: string | undefined,
) => {
	const url =
		reminderType === 'ONE_OFF'
			? createOneOffReminderEndpoint
			: createRecurringReminderEndpoint;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};
	if (country) {
		headers[COUNTRY_CODE_HEADER] = country;
	}
	return fetch(url, {
		method: 'POST',
		headers,
		body: reminderData,
	});
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the range of possible types for the body argument?
const cancelReminder = (body: any) =>
	fetch(cancelRemindersEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the range of possible types for the body argument?
const reactivateReminder = (body: any) =>
	fetch(reactivateRemindersEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});

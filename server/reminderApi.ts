import crypto from 'crypto';
import { captureMessage } from '@sentry/node';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { s3ConfigPromise } from './awsIntegration';
import { conf } from './config';

interface RemindersConfig {
	reminderHmacKey: string;
}

const reminderConfigPromise = s3ConfigPromise<RemindersConfig>()('reminders');

const getReminderHmacKey = (): Promise<string> =>
	reminderConfigPromise.then((result) => {
		if (result?.reminderHmacKey) {
			return result.reminderHmacKey;
		} else {
			return Promise.reject('Failed to get reminder Hmac key');
		}
	});

const verifyReminderToken = (
	reminderData: string,
	token: string,
	key: string,
): boolean => {
	const hash = crypto
		.createHmac('sha1', key)
		.update(reminderData)
		.digest('hex');

	return hash === token;
};

export const createOneOffReminderHandler = (req: Request, res: Response) =>
	createOneOffReminder(req.body).then((response) => {
		if (!response.ok) {
			captureMessage('Reminder sign up failed at the point of request');
		}
		res.sendStatus(response.status);
	});

// Instead of requiring the user to be signed in, this endpoint verifies the token
export const publicCreateReminderHandler =
	(reminderType: 'ONE_OFF' | 'RECURRING') =>
	async (req: Request, res: Response) => {
		const { reminderData, token } = JSON.parse(req.body);

		if (reminderData && token) {
			const reminderHmacKey = await getReminderHmacKey();
			if (verifyReminderToken(reminderData, token, reminderHmacKey)) {
				const response = await (reminderType === 'ONE_OFF'
					? createOneOffReminder(reminderData)
					: createRecurringReminder(reminderData));
				if (!response.ok) {
					captureMessage(
						'Reminder sign up failed at the point of request',
					);
				}
				res.sendStatus(response.status);
			} else {
				captureMessage('Failed to verify token for reminder signup');
				res.sendStatus(400);
			}
		} else {
			captureMessage('Invalid request for reminder signup');
			res.sendStatus(400);
		}
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

const createOneOffReminder = (reminderData: string) =>
	fetch(createOneOffReminderEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: reminderData,
	});

const createRecurringReminder = (reminderData: string) =>
	fetch(createRecurringReminderEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: reminderData,
	});

const cancelReminder = (body: any) =>
	fetch(cancelRemindersEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});

const reactivateReminder = (body: any) =>
	fetch(reactivateRemindersEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});

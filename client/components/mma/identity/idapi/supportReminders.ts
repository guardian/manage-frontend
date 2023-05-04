import * as Sentry from '@sentry/browser';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import type { ConsentOption } from '../models';
import { ConsentOptionType } from '../models';

export type ReminderType = 'ONE_OFF' | 'RECURRING';

interface ReminderStatusApiResponse {
	recurringStatus: 'NotSet' | 'Active' | 'Cancelled';
	recurringReminderCode?: string;
}

let recurringReminderCode = '';

const REMINDERS_STATUS_ENDPOINT = '/api/reminders/status';
const CANCEL_REMINDERS_ENDPOINT = '/api/reminders/cancel';
const REACTIVATE_REMINDERS_ENDPOINT = '/api/reminders/reactivate';
const CREATE_ONE_OFF_REMINDER_ENDPOINT = '/api/reminders/create-public/one-off';
const CREATE_RECURRING_REMINDER_ENDPOINT =
	'/api/reminders/create-public/recurring';

const getConsent = (isActive: boolean): ConsentOption => ({
	id: 'support_reminder',
	description:
		'We will invite you to make a contribution in support of Guardian journalism, using the cadence you picked when you last signed up.',
	name: 'Contribution reminder emails',
	type: ConsentOptionType.SUPPORT_REMINDER,
	subscribed: isActive,
});

export const read = async (): Promise<ConsentOption[]> => {
	const response = await fetchWithDefaultParameters(
		REMINDERS_STATUS_ENDPOINT,
	);
	const reminderStatus = (await response.json()) as ReminderStatusApiResponse;
	if (reminderStatus.recurringStatus === 'NotSet') {
		return [];
	}

	recurringReminderCode = reminderStatus.recurringReminderCode ?? '';

	return [getConsent(reminderStatus.recurringStatus === 'Active')];
};

export const update = async (id: string, subscribed: boolean = true) => {
	if (!recurringReminderCode) {
		Sentry.captureMessage(
			`No recurringReminderCode to update consent: ${id}`,
		);
		return;
	}

	if (!subscribed) {
		await sendReminderCancellation(recurringReminderCode);
	} else {
		await sendReminderReactivation(recurringReminderCode);
	}
};

export const sendReminderCancellation = (reminderCode: string) =>
	fetch(CANCEL_REMINDERS_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ reminderCode }),
	});

const sendReminderReactivation = (reminderCode: string) =>
	fetch(REACTIVATE_REMINDERS_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ reminderCode }),
	});

export const sendReminderCreation = (
	reminderType: ReminderType,
	reminderData: string,
	token: string,
) => {
	const path =
		reminderType === 'ONE_OFF'
			? CREATE_ONE_OFF_REMINDER_ENDPOINT
			: CREATE_RECURRING_REMINDER_ENDPOINT;
	return fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ reminderData, token }),
	});
};

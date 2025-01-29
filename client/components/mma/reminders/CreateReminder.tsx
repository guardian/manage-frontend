import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import type { ReminderType } from '../identity/idapi/supportReminders';
import { sendReminderCreation } from '../identity/idapi/supportReminders';
import { getReminderParams } from './reminders';

const containerStyle = css`
	margin: 0 5px;
	${from.desktop} {
		margin-left: 20%;
	}

	max-width: 400px;
	display: flex;
	flex-direction: column;
	margin-bottom: 80px;
`;
const headingStyle = css`
	border-bottom: 1px solid #c4c4c4;
	font-size: 28px;
	margin-bottom: 0;
	margin-top: 10px;
	padding-bottom: 10px;
`;
const linkStyle = css`
	margin-top: 20px;
`;

type Status = 'PENDING' | 'SUCCESS' | 'FAILURE';

interface CreateReminderProps {
	reminderType: ReminderType;
}

/**
 * This is the destination for reminder signup links in Braze emails.
 * Attempts to create a reminder and displays a progress message.
 *
 * Expects the querystring to contain two params:
 * - reminderData - stringified JSON payload for the reminders API
 * - token - hashed version of the payload (using a key shared with Braze)
 */
export const CreateReminder = ({ reminderType }: CreateReminderProps) => {
	const [status, setStatus] = useState<Status>('PENDING');

	useEffect(() => {
		const params = getReminderParams(window.location.search);

		if (!params) {
			setStatus('FAILURE');
			Sentry.captureMessage(
				`Failed to create reminder for request with querystring: ${params}`,
			);
		} else {
			const b64Token = params.token.replace(' ', '+'); // + gets encoded as space in querystring
			sendReminderCreation(reminderType, params.reminderData, b64Token)
				.then((response) => {
					if (!response.ok) {
						return Promise.reject(
							new Error(`Received status ${response.status}`),
						);
					} else {
						setStatus('SUCCESS');
					}
				})
				.catch((err) => {
					setStatus('FAILURE');
					Sentry.captureMessage(
						`Failed to create reminder for request with data: ${params.reminderData}. Error: ${err}`,
					);
				});
		}
	}, [reminderType]);

	const successCopy =
		reminderType === 'ONE_OFF'
			? 'Your reminder has been created. Look out for an email from us soon.'
			: 'Your monthly reminder has been created. Look out for an email from us next month.';

	return (
		<div css={containerStyle}>
			{status === 'PENDING' && (
				<h3 css={headingStyle}>Creating reminder...</h3>
			)}

			{status === 'SUCCESS' && (
				<>
					<h3 css={headingStyle}>{successCopy}</h3>
					<div css={linkStyle}>
						<a
							css={css`
								text-decoration: underline;
							`}
							href="/email-prefs"
						>
							Manage your email preferences
						</a>
					</div>
				</>
			)}

			{status === 'FAILURE' && (
				<>
					<h3 css={headingStyle}>Sorry, something went wrong</h3>
					<div>
						We were unable to create your reminder.{' '}
						<a
							css={css`
								text-decoration: underline;
							`}
							href="/help-centre/contact-us/tech/s15"
						>
							Please report the issue
						</a>{' '}
						and we'll do our best to resolve it for you.
					</div>
				</>
			)}
		</div>
	);
};

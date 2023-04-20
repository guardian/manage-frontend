import { css } from '@emotion/react';
import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sendReminderCreation } from '../identity/idapi/supportReminders';

const containerStyle = css`
	width: 100%;
	margin-left: 20%;

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

/**
 * This is the destination for reminder signup links in Braze emails.
 * Attempts to create a reminder and displays a progress message.
 *
 * Expects the querystring to contain two params:
 * - reminderData - stringified JSON payload for the reminders API
 * - token - hashed version of the payload (using a key shared with Braze)
 */
export const CreateReminder = () => {
	const [status, setStatus] = useState<Status>('PENDING');
	const [params] = useSearchParams();

	useEffect(() => {
		const reminderData = params.get('reminderData');
		const token = params.get('token');

		if (!reminderData || !token) {
			setStatus('FAILURE');
			Sentry.captureMessage(
				`Failed to create reminder for request with querystring: ${params}`,
			);
		} else {
			sendReminderCreation(reminderData, token)
				.then((response) => {
					if (!response.ok) {
						return Promise.reject(
							`Received status ${response.status}`,
						);
					} else {
						setStatus('SUCCESS');
					}
				})
				.catch((err) => {
					setStatus('FAILURE');
					Sentry.captureMessage(
						`Failed to create reminder for request with data: ${reminderData}. Error: ${err}`,
					);
				});
		}
	});

	return (
		<div css={containerStyle}>
			{status === 'PENDING' && (
				<h3 css={headingStyle}>Creating reminder...</h3>
			)}

			{status === 'SUCCESS' && (
				<>
					<h3 css={headingStyle}>Reminder created</h3>
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

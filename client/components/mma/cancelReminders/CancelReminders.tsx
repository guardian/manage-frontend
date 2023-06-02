import { css } from '@emotion/react';
import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { sendReminderCancellation } from '../identity/idapi/supportReminders';

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

type CancelStatus = 'PENDING' | 'SUCCESS' | 'FAILURE';

export const CancelReminders = () => {
	const { reminderCode } = useParams();
	const [cancelStatus, setCancelStatus] = useState<CancelStatus>('PENDING');

	useEffect(() => {
		if (reminderCode) {
			sendReminderCancellation(reminderCode).then((response) => {
				if (!response.ok) {
					setCancelStatus('FAILURE');
					Sentry.captureMessage(
						`Failed to cancel reminders for code: ${reminderCode}`,
					);
				} else {
					setCancelStatus('SUCCESS');
				}
			});
		} else {
			setCancelStatus('FAILURE');
		}
	});

	return (
		<div css={containerStyle}>
			{cancelStatus === 'PENDING' && (
				<h3 css={headingStyle}>Unsubscribing...</h3>
			)}

			{cancelStatus === 'SUCCESS' && (
				<>
					<h3 css={headingStyle}>You've been unsubscribed</h3>
					<div>
						We will no longer send you contribution reminder emails.
						Please note this may take 24/48 hours to take effect.
					</div>
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

			{cancelStatus === 'FAILURE' && (
				<>
					<h3 css={headingStyle}>Sorry, something went wrong</h3>
					<div>
						You're still subscribed to reminder emails.{' '}
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

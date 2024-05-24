import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Button, Radio, RadioGroup } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type * as React from 'react';
import { useNavigate } from 'react-router';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../styles/ButtonStyles';
import { trackEventInOphanOnly } from '../../../utilities/analytics';
import { getGeoLocation } from '../../../utilities/geolocation';

const containerStyles = css`
	padding-bottom: ${space[24]}px;
`;

const setReminderContainerStyles = css`
	& > * + * {
		margin-top: ${space[9]}px;
	}
`;

const formContainerStyles = css`
	& > * + * {
		margin-top: ${space[6]}px;
	}
`;

interface ReminderSignup {
	reminderPeriod: string;
	reminderOption: string;
}

interface ReminderChoice {
	signup: ReminderSignup;
	label: string;
	thankYouMessage: string;
}

const REMINDER_ENDPOINT = '/api/reminders/create';
const REMINDER_PLATFORM = 'MMA';
const REMINDER_STAGE = 'WINBACK';
const REMINDER_COMPONENT = 'CANCELLATION';

const getReminderPeriod = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // javascript dates run from 0-11, we want 1-12
	const paddedMonth = month.toString().padStart(2, '0');

	return `${year}-${paddedMonth}-01`;
};

const getReminderOption = (monthsUntilDate: number) =>
	`${monthsUntilDate}-months`;

const getDefaultLabel = (date: Date, monthsUntilDate: number, now: Date) => {
	const month = date.toLocaleDateString('default', { month: 'long' });
	const year =
		now.getFullYear() === date.getFullYear()
			? ''
			: ` ${date.getFullYear()}`;

	return `in ${monthsUntilDate} months (${month}${year})`;
};

const getDefaultThankYouMessage = (date: Date) =>
	date.toLocaleDateString('default', {
		month: 'long',
	});

const getDefaultReminderChoice = (monthsUntilDate: number): ReminderChoice => {
	const now = new Date();
	const date = new Date(now.getFullYear(), now.getMonth() + monthsUntilDate);

	return {
		label: getDefaultLabel(date, monthsUntilDate, now),
		thankYouMessage: getDefaultThankYouMessage(date),
		signup: {
			reminderPeriod: getReminderPeriod(date),
			reminderOption: getReminderOption(monthsUntilDate),
		},
	};
};

const getDefaultReminderChoices = (): ReminderChoice[] => [
	getDefaultReminderChoice(3),
	getDefaultReminderChoice(6),
	getDefaultReminderChoice(9),
];

export const CancellationContributionReminder: React.FC = () => {
	const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(0);
	const [hasSetReminder, setHasSetReminder] = useState(false);

	const navigate = useNavigate();

	const email = window.guardian.identityDetails.email;
	const reminderChoices = getDefaultReminderChoices();
	const selectedChoice = reminderChoices[selectedChoiceIndex];

	const setReminder = () =>
		fetch(REMINDER_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				country: getGeoLocation(),
				reminderPlatform: REMINDER_PLATFORM,
				reminderComponent: REMINDER_COMPONENT,
				reminderStage: REMINDER_STAGE,
				...selectedChoice.signup,
			}),
		});

	const onSubmit = () => {
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow',
			eventAction: 'click',
			eventLabel: `set_reminder__${selectedChoice.signup.reminderOption}`,
		});

		setReminder();
		setHasSetReminder(true);
	};

	useEffect(() => {
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow',
			eventAction: 'view',
			eventLabel: `set_reminder`,
		});
	}, []);

	return (
		<div css={containerStyles}>
			{hasSetReminder ? (
				<p>
					Thank you for setting up support reminder. We will be in
					touch in {selectedChoice.thankYouMessage}, so look out for a
					message from the Guardian in your inbox.
				</p>
			) : (
				<div css={setReminderContainerStyles}>
					<p>
						We can invite you to support our journalism again at a
						later date, when it might suit you better. This will be
						no more than two emails, with no obligation to give.
					</p>

					<div css={formContainerStyles}>
						<RadioGroup
							name="reminder"
							label="I'd like to be reminded in:"
						>
							{reminderChoices.map((choice, index) => (
								<Radio
									key={`reminderRadio${index}`}
									value={`${index}`}
									label={choice.label}
									checked={selectedChoiceIndex === index}
									onChange={() =>
										setSelectedChoiceIndex(index)
									}
								/>
							))}
						</RadioGroup>
						<div css={stackedButtonLayoutCss}>
							<Button
								onClick={onSubmit}
								cssOverrides={buttonCentredCss}
							>
								Set my reminder
							</Button>
							<Button
								priority="tertiary"
								onClick={() => navigate('/')}
								cssOverrides={buttonCentredCss}
							>
								Back to your account
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

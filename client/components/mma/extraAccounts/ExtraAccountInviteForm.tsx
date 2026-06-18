import { css } from '@emotion/react';
import { from, palette, space, textSans17 } from '@guardian/source/foundations';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	TextInput,
} from '@guardian/source/react-components';
import { useState } from 'react';
import { useWindowWidth } from '@/client/utilities/hooks/useWindowWidth';
import { isEmail } from '../../../../shared/validationUtils';

const formCss = css`
	margin: ${space[5]}px 0 ${space[4]}px 0;
	width: 100%;

	${from.tablet} {
		max-width: 70%;
	}
`;

const formCssOverrides = css`
	margin-top: 0;
`;

const introCss = css`
	${textSans17};
	margin: 0 0 ${space[3]}px 0;
`;

const checkboxBoxCss = css`
	background-color: ${palette.neutral[97]};
	padding: ${space[3]}px;
	margin: ${space[5]}px 0 ${space[5]}px 0;
	border-radius: ${space[2]}px;
`;

const actionsCss = css`
	display: flex;
	gap: ${space[4]}px;
	flex-direction: column;

	${from.tablet} {
		flex-direction: row;
	}
`;

const sendInvitationCss = css`
	color: ${palette.brand[500]};
	font-weight: normal;
`;

interface ExtraAccountInviteFormProps {
	isFormOpen: boolean;
	onOpen: () => void;
	onCancel: () => void;
	onSent: (email: string) => void;
	sendInvitation: (email: string) => Promise<boolean>;
	isSubmitting: boolean;
}

export const ExtraAccountInviteForm = ({
	isFormOpen,
	onOpen,
	onCancel,
	onSent,
	sendInvitation,
	isSubmitting,
}: ExtraAccountInviteFormProps) => {
	const [email, setEmail] = useState('');
	const [confirmedConsent, setConfirmedConsent] = useState(false);
	const [emailError, setEmailError] = useState<string | undefined>();
	const [consentError, setConsentError] = useState<string | undefined>();

	const { windowWidthIsGreaterThan, windowWidthIsLessThan } =
		useWindowWidth();
	const isFormOpenOnDesktop =
		isFormOpen && windowWidthIsGreaterThan('tablet');
	const isFormOpenOnTablet = isFormOpen && windowWidthIsLessThan('tablet');

	const handleSend = async () => {
		const trimmedEmail = email.trim();
		const isEmailValid = !!trimmedEmail && isEmail(trimmedEmail);
		const isConsentValid = confirmedConsent;

		setEmailError(
			isEmailValid
				? undefined
				: trimmedEmail
				? 'Please enter a valid email address.'
				: 'Please enter an email address.',
		);
		setConsentError(
			isConsentValid
				? undefined
				: 'Please tick this box to confirm before sending the invitation.',
		);

		if (!isEmailValid || !isConsentValid) {
			return;
		}

		const ok = await sendInvitation(trimmedEmail);
		if (ok) {
			onSent(trimmedEmail);
		}
	};

	if (!isFormOpen) {
		return (
			<Button
				priority="subdued"
				size="small"
				cssOverrides={sendInvitationCss}
				onClick={onOpen}
			>
				Send invitation
			</Button>
		);
	}

	return (
		<div css={[formCss, isFormOpenOnTablet ? formCssOverrides : undefined]}>
			{isFormOpenOnDesktop && (
				<p css={introCss}>
					Enter the email address of the people you'd like to invite.
				</p>
			)}

			<TextInput
				label="Recipient's email address"
				type="email"
				value={email}
				error={emailError}
				onChange={(e) => {
					setEmail(e.target.value);
					if (emailError) {
						setEmailError(undefined);
					}
				}}
			/>

			<div css={checkboxBoxCss}>
				<CheckboxGroup name="consentConfirmation" error={consentError}>
					<Checkbox
						checked={confirmedConsent}
						onChange={(e) => {
							setConfirmedConsent(e.target.checked);
							if (e.target.checked && consentError) {
								setConsentError(undefined);
							}
						}}
						label="By ticking this box you're confirming that the person receiving this invitation is happy for the Guardian to email them."
						name="consentConfirmation"
						value="consentConfirmation"
					/>
				</CheckboxGroup>
			</div>

			<div css={actionsCss}>
				<Button
					priority="primary"
					size="small"
					isLoading={isSubmitting}
					disabled={isSubmitting}
					onClick={() => void handleSend()}
				>
					Send invitation
				</Button>
				<Button priority="tertiary" size="small" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</div>
	);
};

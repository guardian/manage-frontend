import { css } from '@emotion/react';
import { palette, space, textSans17 } from '@guardian/source/foundations';
import { Button, Checkbox, TextInput } from '@guardian/source/react-components';
import { useState } from 'react';

const formCss = css`
	margin: ${space[5]}px 0 ${space[4]}px 0;
	max-width: 70%;
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
`;

interface ExtraAccountInviteFormProps {
	onCancel: () => void;
	onSent: (email: string) => void;
	sendInvitation: (email: string) => Promise<boolean>;
	isSubmitting: boolean;
}

export const ExtraAccountInviteForm = ({
	onCancel,
	onSent,
	sendInvitation,
	isSubmitting,
}: ExtraAccountInviteFormProps) => {
	const [email, setEmail] = useState('');
	const [confirmedConsent, setConfirmedConsent] = useState(false);

	const handleSend = async () => {
		const ok = await sendInvitation(email);
		if (ok) {
			onSent(email);
		}
	};

	return (
		<div css={formCss}>
			<p css={introCss}>
				Enter the email address of the persons you'd like to invite.
			</p>

			<TextInput
				label="Recipient's email address"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<div css={checkboxBoxCss}>
				<Checkbox
					checked={confirmedConsent}
					onChange={(e) => setConfirmedConsent(e.target.checked)}
					label="By ticking this box you're confirming that the person receiving this invitation is happy for the Guardian to email them."
					name="consentConfirmation"
					value="consentConfirmation"
				/>
			</div>

			<div css={actionsCss}>
				<Button
					priority="primary"
					size="small"
					isLoading={isSubmitting}
					disabled={!email || !confirmedConsent || isSubmitting}
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

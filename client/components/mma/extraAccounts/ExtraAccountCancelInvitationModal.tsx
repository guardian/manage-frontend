import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useState } from 'react';
import type { ExtraAccount } from '../../../stores/ExtraAccountsStore';
import { useToastStore } from '../../../stores/ToastStore';

type ExtraAccountWithEmail = Extract<
	ExtraAccount,
	{ status: 'pending' | 'active' }
>;

const instigatorCss = css`
	color: ${palette.brand[500]};
	font-weight: normal;
`;

const overlayCss = css`
	position: fixed;
	inset: 0;
	z-index: 9999;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	background: rgba(18, 18, 18, 0.6);

	${from.tablet} {
		align-items: center;
		justify-content: center;
	}
`;

const containerCss = css`
	position: relative;
	overflow: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	max-height: calc(100vh - ${space[6]}px);
	padding: ${space[3]}px;
	padding-bottom: ${space[8]}px;
	background: ${palette.neutral[100]};
	border-radius: ${space[2]}px;
	color: ${palette.neutral[7]};

	${from.tablet} {
		max-width: 60%;
		padding: ${space[3]}px ${space[5]}px ${space[6]}px ${space[5]}px;
	}
`;

const closeButtonCss = css`
	display: flex;
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
	color: ${palette.neutral[7]};
	margin-left: auto;

	svg {
		width: 30px;
		height: 30px;
		fill: currentColor;
	}
`;

const titleCss = css`
	${headlineBold24};
	margin: 0;
	margin-bottom: ${space[3]}px;
`;

const bodyCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
`;

const paragraphCss = css`
	${textSans17};
	margin: 0;
`;

const emailCss = css`
	${textSansBold17};
`;

const footerCss = css`
	display: flex;
	flex-direction: column-reverse;
	gap: ${space[4]}px;
	margin-top: ${space[8]}px;

	${from.tablet} {
		flex-direction: row;
		justify-content: flex-end;
		gap: ${space[5]}px;
	}
`;

const footerButtonCss = css`
	justify-content: center;
	width: 100%;

	${from.tablet} {
		width: auto;
	}
`;

interface ModalCopy {
	title: string;
	confirmLabel: string;
	dismissLabel: string;
	instigatorLabel: string;
	successMessage: string;
	confirm: (invitationCode: string) => Promise<boolean>;
}

const ModalBody = ({
	isActive,
	email,
	remainingInvitations,
}: {
	isActive: boolean;
	email: string;
	remainingInvitations: number;
}) => {
	const invitationsLabel = `${remainingInvitations} invitation${
		remainingInvitations === 1 ? '' : 's'
	} remaining`;

	return (
		<div css={bodyCss}>
			<p css={paragraphCss}>
				If you {isActive ? 'remove access' : 'cancel this invitation'},{' '}
				<span css={emailCss}>{email}</span> won't be able to{' '}
				{isActive ? 'use ' : 'accept it or access '}Guardian premium
				benefits through your subscription.
			</p>
			<p css={paragraphCss}>
				We'll let them know by email that their{' '}
				{isActive
					? 'access has been removed'
					: 'invitation has been cancelled'}
				. You can re-invite them at any time.
			</p>
			<p css={paragraphCss}>
				If you proceed, this invitation slot will become available again
				and you'll have {invitationsLabel}.
			</p>
		</div>
	);
};

interface ExtraAccountCancelInvitationModalProps {
	account: ExtraAccountWithEmail;
	cancelInvitation: (invitationCode: string) => Promise<boolean>;
	removeAccess: (invitationCode: string) => Promise<boolean>;
	isSubmitting: boolean;
	remainingInvitations: number;
}

export const ExtraAccountCancelInvitationModal = ({
	account,
	cancelInvitation,
	removeAccess,
	isSubmitting,
	remainingInvitations,
}: ExtraAccountCancelInvitationModalProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { showToast } = useToastStore();

	const isActive = account.status === 'active';

	const copy: ModalCopy = isActive
		? {
				title: 'Remove access?',
				confirmLabel: 'Remove access',
				dismissLabel: 'Cancel',
				instigatorLabel: 'Remove access',
				successMessage: `Access removed for ${account.email}`,
				confirm: removeAccess,
		  }
		: {
				title: 'Cancel invitation?',
				confirmLabel: 'Yes, cancel invitation',
				dismissLabel: 'Keep invitation',
				instigatorLabel: 'Cancel invitation',
				successMessage: `Invitation cancelled for ${account.email}`,
				confirm: cancelInvitation,
		  };

	const close = () => setIsOpen(false);

	const handleConfirm = () => {
		void copy.confirm(account.invitationCode).then((ok) => {
			if (ok) {
				close();
				showToast({ message: copy.successMessage });
			}
		});
	};

	return (
		<>
			<Button
				priority="subdued"
				size="small"
				cssOverrides={instigatorCss}
				onClick={() => setIsOpen(true)}
			>
				{copy.instigatorLabel}
			</Button>

			{isOpen && (
				<div css={overlayCss} onClick={close}>
					<div
						css={containerCss}
						role="dialog"
						aria-modal="true"
						aria-label={copy.title}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							css={closeButtonCss}
							aria-label="Close"
							onClick={close}
						>
							<svg viewBox="0 0 30 30" aria-hidden="true">
								<path d="M21 9.8l-.8-.8-5.2 4.8-5.2-4.8-.8.8 4.8 5.2-4.8 5.2.8.8 5.2-4.8 5.2 4.8.8-.8-4.8-5.2 4.8-5.2" />
							</svg>
						</button>

						<h2 css={titleCss}>{copy.title}</h2>

						<ModalBody
							isActive={isActive}
							email={account.email}
							remainingInvitations={remainingInvitations}
						/>

						<div css={footerCss}>
							<Button
								priority="tertiary"
								onClick={close}
								disabled={isSubmitting}
								cssOverrides={footerButtonCss}
							>
								{copy.dismissLabel}
							</Button>
							<Button
								priority="primary"
								isLoading={isSubmitting}
								disabled={isSubmitting}
								onClick={handleConfirm}
								cssOverrides={footerButtonCss}
							>
								{copy.confirmLabel}
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

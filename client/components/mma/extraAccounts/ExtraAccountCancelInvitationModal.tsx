import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import { Modal } from '@/client/components/shared/Modal';
import type { HideFunction } from '@/client/components/shared/Modal';

const modalContainerCss = css`
	padding: ${space[5]}px;
	padding-bottom: ${space[8]}px;
	max-width: 40%;
	width: 100%;
`;

interface ExtraAccountCancelInvitationModalProps {
	email: string;
	title: string;
	confirmLabel: string;
	onConfirm: (email: string) => Promise<boolean>;
	isSubmitting: boolean;
	cssOverrides?: SerializedStyles;
	instigator: ReactNode;
	onSuccess: () => void;
	children: ReactNode;
}

export const ExtraAccountCancelInvitationModal = ({
	email,
	title,
	confirmLabel,
	onConfirm,
	isSubmitting,
	cssOverrides,
	instigator,
	onSuccess,
	children,
}: ExtraAccountCancelInvitationModalProps) => {
	const confirmButton = (hide: HideFunction) => (
		<div
			css={css`
				display: inline-block;
				margin-top: 10px;
				margin-right: 10px;
			`}
		>
			<Button
				isLoading={isSubmitting}
				disabled={isSubmitting}
				onClick={() => {
					void onConfirm(email).then((ok) => {
						if (ok) {
							hide();
							onSuccess();
						}
					});
				}}
			>
				{confirmLabel}
			</Button>
		</div>
	);

	return (
		<div css={cssOverrides}>
			<Modal
				title={title}
				alternateOkText="Cancel"
				additionalButton={confirmButton}
				instigator={instigator}
				containerCssOverrides={modalContainerCss}
				hideCloseButton
			>
				{children}
			</Modal>
		</div>
	);
};

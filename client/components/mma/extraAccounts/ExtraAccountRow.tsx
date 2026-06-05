import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, space, textSans17 } from '@guardian/source/foundations';
import {
	Button,
	SvgPersonPlus,
	SvgPersonRoundFilled,
} from '@guardian/source/react-components';
import { useState } from 'react';
import type {
	ExtraAccount,
	ExtraAccountStatus,
} from '../../../stores/ExtraAccountsStore';
import { Pill } from '../../shared/Pill';
import { ExtraAccountCancelInvitationModal } from './ExtraAccountCancelInvitationModal';
import { ExtraAccountInviteForm } from './ExtraAccountInviteForm';

const rowCss = css`
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
	padding: ${space[3]}px 0;
`;

const avatarCss = css`
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: ${space[14]}px;
		height: ${space[14]}px;
	}
`;

const emptyAvatarCss = css`
	border: 2px solid ${palette.neutral[60]};
	border-radius: 50%;
	margin: ${space[2]}px;

	svg {
		width: ${space[9]}px;
		height: ${space[9]}px;
	}
`;

const identityCss = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${space[2]}px;
`;

const emailCss = css`
	${textSans17};
`;

const sendInvitationCss = css`
	color: ${palette.brand[500]};
	font-weight: normal;
`;

const actionCss = css`
	margin-left: auto;
`;

interface ExtraAccountRowProps {
	account: ExtraAccount;
	sendInvitation: (email: string) => Promise<boolean>;
	cancelInvitation: (email: string) => Promise<boolean>;
	removeAccess: (email: string) => Promise<boolean>;
	isSubmitting: boolean;
	onSuccessfulAction: (message: string) => void;
}

const Avatar = ({
	status,
	cssOverrides,
}: {
	status: ExtraAccountStatus;
	cssOverrides?: SerializedStyles;
}) => {
	if (status === 'empty') {
		return (
			<span css={[avatarCss, emptyAvatarCss, cssOverrides]}>
				<SvgPersonPlus theme={{ fill: palette.neutral[46] }} />
			</span>
		);
	}

	return (
		<span css={[avatarCss, cssOverrides]}>
			<SvgPersonRoundFilled
				theme={{
					fill:
						status === 'active'
							? palette.brand[400]
							: palette.neutral[60],
				}}
			/>
		</span>
	);
};

export const ExtraAccountRow = ({
	account,
	sendInvitation,
	cancelInvitation,
	removeAccess,
	isSubmitting,
	onSuccessfulAction,
}: ExtraAccountRowProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	if (account.status === 'empty') {
		return (
			<div css={rowCss}>
				<Avatar
					status="empty"
					cssOverrides={css`
						align-self: ${isFormOpen ? 'flex-start' : 'center'};
					`}
				/>
				{isFormOpen ? (
					<ExtraAccountInviteForm
						sendInvitation={sendInvitation}
						isSubmitting={isSubmitting}
						onCancel={() => setIsFormOpen(false)}
						onSent={(email) => {
							setIsFormOpen(false);
							onSuccessfulAction(
								`Invitation successfully sent to ${email}`,
							);
						}}
					/>
				) : (
					<Button
						priority="subdued"
						size="small"
						cssOverrides={sendInvitationCss}
						onClick={() => setIsFormOpen(true)}
					>
						Send invitation
					</Button>
				)}
			</div>
		);
	}

	const isActive = account.status === 'active';

	return (
		<div css={rowCss}>
			<Avatar status={account.status} />
			<div css={identityCss}>
				<span css={emailCss}>{account.email}</span>
				<Pill
					copy={isActive ? 'Active' : 'Pending'}
					colour={
						isActive
							? palette.success[400]
							: palette.specialReportAlt[300]
					}
					copyColour={palette.neutral[97]}
				/>
			</div>
			{isActive ? (
				<ExtraAccountCancelInvitationModal
					email={account.email ?? ''}
					title="Remove access?"
					confirmLabel="Remove access"
					onConfirm={removeAccess}
					isSubmitting={isSubmitting}
					cssOverrides={actionCss}
					onSuccess={() =>
						onSuccessfulAction(
							`Access removed for ${account.email}`,
						)
					}
					instigator={
						<Button
							priority="subdued"
							size="small"
							cssOverrides={sendInvitationCss}
						>
							Remove access
						</Button>
					}
				>
					Lorem Ipsum
				</ExtraAccountCancelInvitationModal>
			) : (
				<ExtraAccountCancelInvitationModal
					email={account.email ?? ''}
					title="Cancel this invitation?"
					confirmLabel="Cancel invitation"
					onConfirm={cancelInvitation}
					isSubmitting={isSubmitting}
					cssOverrides={actionCss}
					onSuccess={() =>
						onSuccessfulAction(
							`Invitation cancelled for ${account.email}`,
						)
					}
					instigator={
						<Button
							priority="subdued"
							size="small"
							cssOverrides={sendInvitationCss}
						>
							Cancel invitation
						</Button>
					}
				>
					Lorem Ipsum
				</ExtraAccountCancelInvitationModal>
			)}
		</div>
	);
};

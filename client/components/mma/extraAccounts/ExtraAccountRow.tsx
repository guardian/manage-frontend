import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	SvgPersonPlus,
	SvgPersonRoundFilled,
} from '@guardian/source/react-components';
import { useState } from 'react';
import { useWindowWidth } from '@/client/utilities/hooks/useWindowWidth';
import type {
	ExtraAccount,
	ExtraAccountStatus,
} from '../../../stores/ExtraAccountsStore';
import { useToastStore } from '../../../stores/ToastStore';
import { Pill } from '../../shared/Pill';
import { ExtraAccountCancelInvitationModal } from './ExtraAccountCancelInvitationModal';
import { ExtraAccountInviteForm } from './ExtraAccountInviteForm';

const rowCss = css`
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
	padding: ${space[3]}px 0;
`;

const rowCssOverrides = css`
	flex-direction: column;
`;

const userRowCss = css`
	display: flex;
	align-items: flex-start;
	gap: ${space[2]}px;
	padding: ${space[3]}px 0;

	${from.tablet} {
		align-items: center;
	}
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
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
	width: 100%;
	min-width: 0;
	margin-top: ${space[3]}px;

	${from.tablet} {
		flex-direction: row;
		align-items: center;
		margin-top: 0;
		gap: ${space[3]}px;
		flex: 1;
	}
`;

const piiContainerCss = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-right: auto;
	min-width: 0;
`;

const piiCss = css`
	${textSans17};
	overflow-wrap: anywhere;
`;

const piiCssBold = css`
	${textSansBold17};
	overflow-wrap: anywhere;
`;

const spacerCss = css`
	height: ${space[6]}px;
	border-right: 1px solid ${palette.neutral[86]};
	margin: 0 ${space[5]}px;
`;

const introCss = css`
	${textSans17};
	margin: 0;
`;

interface ExtraAccountRowProps {
	account: ExtraAccount;
	sendInvitation: (email: string) => Promise<boolean>;
	cancelInvitation: (invitationCode: string) => Promise<boolean>;
	removeAccess: (invitationCode: string) => Promise<boolean>;
	isSubmitting: boolean;
	remainingInvitations: number;
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
	remainingInvitations,
}: ExtraAccountRowProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { showToast } = useToastStore();

	const { windowWidthIsLessThan, windowWidthIsGreaterThan } =
		useWindowWidth();
	const isFormOpenOnTablet = isFormOpen && windowWidthIsLessThan('tablet');

	const avatarContainerCss = css`
		align-self: ${isFormOpen ? 'flex-start' : 'center'};
		${isFormOpenOnTablet
			? css`
					display: flex;
					flex-direction: row;
					align-items: center;
			  `
			: undefined}
	`;

	if (account.status === 'empty') {
		return (
			<div
				css={[rowCss, isFormOpenOnTablet ? rowCssOverrides : undefined]}
			>
				<div css={avatarContainerCss}>
					<Avatar status="empty" />
					{isFormOpenOnTablet && (
						<p css={introCss}>
							Enter the email address of the people you'd like to
							invite.
						</p>
					)}
				</div>
				<ExtraAccountInviteForm
					isFormOpen={isFormOpen}
					onOpen={() => setIsFormOpen(true)}
					sendInvitation={sendInvitation}
					isSubmitting={isSubmitting}
					onCancel={() => setIsFormOpen(false)}
					onSent={(email) => {
						setIsFormOpen(false);
						showToast({
							message: `Invitation successfully sent to ${email}`,
						});
					}}
				/>
			</div>
		);
	}

	const isActive = account.status === 'active';

	return (
		<div css={userRowCss}>
			<Avatar status={account.status} />
			<div css={identityCss}>
				<div css={piiContainerCss}>
					{isActive && <span css={piiCssBold}>{account.name}</span>}
					<span css={piiCss}>{account.email}</span>
				</div>
				<Pill
					copy={isActive ? 'Active' : 'Pending'}
					colour={
						isActive
							? palette.success[400]
							: palette.specialReportAlt[300]
					}
					copyColour={palette.neutral[97]}
				/>

				{windowWidthIsGreaterThan('tablet') && <div css={spacerCss} />}
				<ExtraAccountCancelInvitationModal
					account={account}
					cancelInvitation={cancelInvitation}
					removeAccess={removeAccess}
					isSubmitting={isSubmitting}
					remainingInvitations={remainingInvitations}
				/>
			</div>
		</div>
	);
};

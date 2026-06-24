import { css } from '@emotion/react';
import { palette, space, textSans14 } from '@guardian/source/foundations';
import type { FC } from 'react';
import { Button } from '../../shared/Buttons';
import { IdentityLocations } from '../IdentityLocations';
import { PageSection } from '../PageSection';

interface EmailSettingsSectionProps {
	actionHandler: () => void;
	removed: boolean;
	email: string;
}

const text = css`
	${textSans14};
	lineheight: 18px;
`;
const linkCss = css`
	${text}
	color: ${palette.sport[300]};
	border-bottom: 1px solid ${palette.neutral[86]};
	transition: border-color .15s ease-out;
	:hover: {
		border-bottom: 1px solid ${palette.sport[300]};
	},
`;

const successMessage = (
	<div
		css={css`
			${text}
			border-bottom: 1px solid ${palette.success[400]};
			border-top: 1px solid ${palette.success[400]};
			color: ${palette.success[400]};
			margin-top: 6px;
			padding: 7px 8px;
		`}
	>
		You've been unsubscribed from all Guardian marketing newsletters and
		emails.
	</div>
);
const unsubscribeButton = (clickHandler: () => void) => (
	<Button text="Unsubscribe from all emails" onClick={clickHandler} />
);
export const EmailSettingsSection: FC<EmailSettingsSectionProps> = (props) => {
	const { actionHandler, email, removed } = props;
	return (
		<PageSection title={'Email settings'}>
			<p
				css={css`
					${text} margin-bottom: ${space[2]}px
				`}
			>
				You are receiving newsletters, notifications and all other
				emails to <strong data-qm-masking="blocklist">{email}</strong>
			</p>
			<p
				css={css`
					${text} margin-bottom: ${space[5]}px
				`}
			>
				<a css={linkCss} href={IdentityLocations.MANAGE_JOB_ALERTS}>
					Manage your Jobs alerts
				</a>
			</p>
			{removed ? successMessage : unsubscribeButton(actionHandler)}
		</PageSection>
	);
};

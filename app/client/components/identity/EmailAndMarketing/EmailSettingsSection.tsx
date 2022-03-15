import { FC } from 'react';
import palette from '../../../colours';
import { sans } from '../../../styles/fonts';
import { Button } from '../../buttons';
import { IdentityLocations } from '../IdentityLocations';
import { PageSection } from '../PageSection';

interface EmailSettingsSectionProps {
	actionHandler: () => void;
	removed: boolean;
	email: string;
}

const text = {
	fontSize: '14px',
	lineHeight: '18px',
	fontFamily: sans,
};
const linkCss = {
	...text,
	color: palette.blue.dark,
	borderBottom: `1px solid ${palette.neutral['5']}`,
	transition: 'border-color .15s ease-out',
	'&:hover': {
		borderBottom: `1px solid ${palette.blue.dark}`,
	},
};

const successMessage = (
	<div
		css={{
			...text,
			borderBottom: `1px solid ${palette.green.light}`,
			borderTop: `1px solid ${palette.green.light}`,
			color: palette.green.medium,
			marginTop: '6px',
			padding: '7px 8px',
		}}
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
			<p css={{ ...text, marginBottom: '8px' }}>
				You are receiving newsletters, notifications and all other
				emails to <strong>{email}</strong>
			</p>
			<p css={{ ...text, marginBottom: '2px' }}>
				<a css={linkCss} href={IdentityLocations.CHANGE_EMAIL}>
					Change your email address
				</a>
			</p>
			<p css={{ ...text, marginBottom: '20px' }}>
				<a css={linkCss} href={IdentityLocations.MANAGE_JOB_ALERTS}>
					Manage your Jobs alerts
				</a>
			</p>
			{removed ? successMessage : unsubscribeButton(actionHandler)}
		</PageSection>
	);
};

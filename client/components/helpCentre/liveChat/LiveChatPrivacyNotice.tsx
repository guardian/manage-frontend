import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import { conf } from '../../../../server/config';

export const LiveChatPrivacyNotice = () => {
	let domain: string;
	if (typeof window !== 'undefined' && window.guardian) {
		domain = window.guardian.domain;
	} else {
		domain = conf.DOMAIN;
	}

	const containerCss = css`
		margin-top: ${space[9]}px;
		padding: ${space[3]}px;
		${from.desktop} {
			padding: ${space[6]}px;
		}
		background-color: #ecf3fe;
	`;
	const titleCss = css`
		margin: 0;
		${textSansBold15};
	`;
	const paragraphCss = css`
		${textSans15};
		max-width: 830px;
		margin: 0;
		a {
			color: ${palette.brand[500]};
			text-decoration: underline;
		}
	`;
	return (
		<div css={containerCss} id="livechatPrivacyNotice">
			<h2 css={titleCss}>Data privacy notice</h2>
			<p css={paragraphCss}>
				We use a Software Development Kit (SDK) from Salesforce for our
				Live Chat service which relies on cookies to ensure that it
				works correctly and meets your expectations. It cannot be
				switched off but it is removed at the end of the chat. If you do
				not wish for this cookie to be dropped on your device, please
				email or phone us instead. Live chats and phone calls will be
				recorded for monitoring and training purposes. Please do not
				disclose personal data of a sensitive nature in the live chat,
				such as health or financial information. A copy of the chat
				transcript will be emailed to you unless the chat contains
				payment card information, in which case no transcript will be
				sent. Click to find out more in our{' '}
				<a href={`https://${domain}/info/privacy`}>privacy policy</a>{' '}
				and <a href={`https://${domain}/info/cookies`}>cookie policy</a>
				.
			</p>
		</div>
	);
};

export const LiveChatPrivacyNoticeLink = () => {
	const privacyNoticeLinkCss = css`
		margin-bottom: ${space[2]}px;
		text-align: right;
		a {
			${textSans15};
			color: ${palette.brand[500]};
			text-decoration: underline;
		}
	`;
	return (
		<div css={privacyNoticeLinkCss}>
			<a href="#livechatPrivacyNotice">data privacy notice</a>
		</div>
	);
};

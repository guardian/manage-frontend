import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, space, textSansBold17 } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { trackEvent } from '../../../utilities/analytics';
import { InfoIconDark } from '../../mma/shared/assets/InfoIconDark';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';

interface SelfServicePromptProps {
	copy: string[];
	linkCopy: string;
	linkHref: string;
	topicReferer: string;
	linkAsButton?: boolean;
	showContacts?: boolean;
	additionalCss?: SerializedStyles;
}

export const SelfServicePrompt = (props: SelfServicePromptProps) => {
	const divCss = css`
		display: block;
		${textSansBold17};
		border: 4px solid ${palette.brand[500]};
		padding: ${space[5]}px ${space[5]}px ${space[5]}px 53px;
		margin: ${space[3]}px 0;
		position: relative;
		word-break: break-word;
		${props.additionalCss}
	`;

	const pCss = css`
		padding: 0;
		margin: 0 0 ${space[5]}px 0;
	`;

	const linkCss = css`
		margin-top: ${space[5]}px;
		text-decoration: underline;
		font-weight: normal;
		color: ${palette.brand[500]};
	`;

	const onServicelinkClick = () =>
		trackEvent({
			eventCategory: 'ContactUs',
			eventAction: 'servicelink_click',
			eventLabel: props.topicReferer,
		});

	return (
		<div css={divCss}>
			<i
				css={css`
					width: 21px;
					height: 21px;
					position: absolute;
					top: ${space[5]}px;
					left: ${space[5]}px;
				`}
			>
				<InfoIconDark fillColor={palette.brand[500]} />
			</i>
			{props.copy.map((paragraph, index) => (
				<p key={`ssb-${index}`} css={pCss}>
					{paragraph}
				</p>
			))}
			{props.showContacts && <CallCentreEmailAndNumbers />}
			{props.linkAsButton ? (
				<LinkButton
					href={props.linkHref}
					cssOverrides={css`
						margin-top: ${space[5]}px;
					`}
					onClick={onServicelinkClick}
				>
					{props.linkCopy}
				</LinkButton>
			) : (
				<a
					href={props.linkHref}
					onClick={onServicelinkClick}
					css={linkCss}
				>
					{props.linkCopy} &gt;
				</a>
			)}
		</div>
	);
};

import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ErrorIcon } from '../mma/shared/assets/ErrorIcon';
import { getHelpSectionIcon } from '../mma/shared/assets/HelpSectionIcons';
import { StartLiveChatButton } from './liveChat/LiveChat';

interface HelpCentreContactBoxProps {
	iconId: string;
	title: string;
	subtitle: string;
	subTitleIsWarning?: boolean;
	compactLayout?: boolean;
	children: ReactNode;
}

const contactBoxContainerCss = css`
	display: flex;
	flex-direction: column;
	border: 1px solid ${palette.neutral[86]};
	${textSans17};
	${from.phablet} {
		width: calc(50% - ${space[5] / 2}px);
	}
`;

const contactBoxHeadingCss = css`
	${textSansBold20};
	color: ${palette.neutral[20]};
	position: relative;
	margin: 0;
	padding: 18px 0 18px 60px;
`;

const contactBoxHeadingWideCss = css`
	${from.desktop} {
		padding: 22px 0 22px 64px;
	}
`;

const contactBoxIconCss = css`
	position: absolute;
	top: ${space[3]}px;
	left: ${space[3]}px;
`;

const contactBoxIconWideCss = css`
	${from.desktop} {
		top: ${space[4]}px;
		left: ${space[4]}px;
	}
`;

const contactBoxSubtitleCss = css`
	display: none;
	margin: 0 ${space[4]}px ${space[3]}px ${space[4]}px;
`;

const contactBoxSubtitleWideCss = css`
	${from.wide} {
		display: block;
	}
`;

const contactBoxSubtitleWarningCss = css`
	position: relative;
	color: ${palette.error[400]};
	font-weight: bold;
	margin: 0 ${space[4]}px ${space[3]}px ${space[4]}px;
	padding-left: ${space[5] + space[2]}px;
`;

const contactBoxDetailsCss = (includeTopBorder: boolean = true) => css`
	border-top: ${includeTopBorder ? `1px solid ${palette.neutral[86]}` : '0'};
	padding: ${space[3]}px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	& p {
		margin-bottom: 0;
	}
`;

const contactBoxDetailsWideCss = css`
	${from.wide} {
		padding: ${space[3]}px 0 0;
		margin: 0 ${space[4]}px ${space[4]}px;
	}
`;

const HelpCentreContactBox = (props: HelpCentreContactBoxProps) => {
	return (
		<div css={contactBoxContainerCss}>
			<div>
				<h2
					css={[
						contactBoxHeadingCss,
						!props.compactLayout && contactBoxHeadingWideCss,
					]}
				>
					<i
						css={[
							contactBoxIconCss,
							!props.compactLayout && contactBoxIconWideCss,
						]}
					>
						{getHelpSectionIcon(props.iconId)}
					</i>
					{props.title}
				</h2>
				<p
					css={
						props.subTitleIsWarning
							? contactBoxSubtitleWarningCss
							: [
									contactBoxSubtitleCss,
									!props.compactLayout &&
										contactBoxSubtitleWideCss,
							  ]
					}
				>
					{props.subTitleIsWarning && (
						<i
							css={css`
								position: absolute;
								top: 0;
								left: 0;
							`}
						>
							<ErrorIcon />
						</i>
					)}
					{props.subtitle}
				</p>
			</div>
			<div
				css={[
					contactBoxDetailsCss(!props.subTitleIsWarning),
					!props.compactLayout && contactBoxDetailsWideCss,
				]}
			>
				{props.children}
			</div>
		</div>
	);
};

interface HelpCentreEmailAndLiveChatProps {
	compactLayout?: boolean;
}

const emailAndLiveChatFlexContainerCss = css`
	display: flex;
	flex-direction: column;
	${from.phablet} {
		flex-direction: row-reverse;
		justify-content: space-between;
	}
	& > * {
		margin-bottom: ${space[5]}px;
	}
`;

const emailAndLiveChatPCss = css`
	font-weight: bold;
	margin-bottom: ${space[9]}px !important;
`;

const emailAndLiveChatButtonCss = css`
	margin-bottom: ${space[5]}px;
	margin-top: ${space[1]}px;
	${from.tablet} {
		margin-bottom: ${space[9]}px;
	}
`;

export const HelpCentreEmailAndLiveChat = (
	props: HelpCentreEmailAndLiveChatProps,
) => {
	const [isLiveChatAvailable, setIsLiveChatAvailable] =
		useState<boolean>(true);
	return (
		<>
			<div css={emailAndLiveChatFlexContainerCss}>
				<HelpCentreContactBox
					title="Chat with us"
					subtitle={
						isLiveChatAvailable
							? 'Chat with one of our customer service agents.'
							: 'Something went wrong. Please refresh or switch browsers.'
					}
					subTitleIsWarning={!isLiveChatAvailable}
					iconId="chat-with-us"
					compactLayout={props.compactLayout}
				>
					{isLiveChatAvailable && (
						<StartLiveChatButton
							liveChatButtonCss={emailAndLiveChatButtonCss}
							setIsLiveChatAvailable={setIsLiveChatAvailable}
						/>
					)}
				</HelpCentreContactBox>
				<HelpCentreContactBox
					iconId="email-us"
					title="Email us"
					subtitle="Send a message to one of our customer service agents."
					compactLayout={props.compactLayout}
				>
					<p css={emailAndLiveChatPCss}>
						customer.help@theguardian.com
					</p>
				</HelpCentreContactBox>
			</div>
		</>
	);
};

import { css } from '@emotion/core';
import { neutral, space, text } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import React, { ReactNode, useState } from 'react';
import { minWidth } from '../../styles/breakpoints';
import { StartLiveChatButton } from '../liveChat/liveChat';
import { ErrorIcon } from '../svgs/errorIcon';
import { getHelpSectionIcon } from '../svgs/helpSectionIcons';

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
	border: 1px solid ${neutral[86]};
	${textSans.medium()};
	${minWidth.phablet} {
		width: calc(50% - ${space[5] / 2}px);
	}
`;

const contactBoxHeadingCss = css`
	${textSans.large({ fontWeight: 'bold' })};
	color: ${neutral[20]};
	position: relative;
	margin: 0;
	padding: 18px 0 18px 60px;
`;

const contactBoxHeadingWideCss = css`
	${minWidth.desktop} {
		padding: 22px 0 22px 64px;
	}
`;

const contactBoxIconCss = css`
	position: absolute;
	top: ${space[3]}px;
	left: ${space[3]}px;
`;

const contactBoxIconWideCss = css`
	${minWidth.desktop} {
		top: ${space[4]}px;
		left: ${space[4]}px;
	}
`;

const contactBoxSubtitleCss = css`
	display: none;
	margin: 0 ${space[4]}px ${space[3]}px ${space[4]}px;
`;

const contactBoxSubtitleWideCss = css`
	${minWidth.wide} {
		display: block;
	}
`;

const contactBoxSubtitleWarningCss = css`
	position: relative;
	color: ${text.error};
	font-weight: bold;
	margin: 0 ${space[4]}px ${space[3]}px ${space[4]}px;
	padding-left: ${space[5] + space[2]}px;
`;

const contactBoxDetailsCss = (includeTopBorder: boolean = true) => css`
	border-top: ${includeTopBorder ? `1px solid ${neutral[86]}` : '0'};
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
	${minWidth.wide} {
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
	${minWidth.phablet} {
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
	${minWidth.tablet} {
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

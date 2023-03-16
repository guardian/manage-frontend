import { css } from '@emotion/react';
import { headline, textSans } from '@guardian/source-foundations';
// import BulletPointPng from './shared/BulletPoint.svg'

export const dataPrivacyHeadingCss = css`
	margin: 0;
	margin-bottom: 0.5rem;
	${headline.xxsmall()}
`;

export const dataPrivacyParagraphCss = css`
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
	${textSans.small()}
`;

export const dataPrivacyUnorderedListCss = css`
	margin: 0;
	${textSans.small()}
`;

export const dataPrivacyVideoCss = css`
	width: 100%;
`;

export const dataPrivacyVideoOverlayContainer = css`
	background-color: red;
	width: 100%;
	position: relative;
	video {
		width: 100%;
		display: block;
	}
`;

export const dataPrivacyVideoOverlay = css`
	background-color: red;
	position: absolute;
	background-color: rgba(0, 0, 0, 0.46);
	z-index: 2;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

export const dataPrivacyVideoTextHeadline = css`
	${headline.medium()};
	align-self: center;
`;

export const dataPrivacyFooter = css`
	color: white;
	display: flex;
	flex-direction: row;
	width: 100%;
	padding-left: 1rem;
	padding-bottom: 0.5rem;
	height: 20%;
`;

export const dataPrivacyMarketingToggleCss = css`
	margin-top: 0;
	position: relative;
`;

export const dataPrivacySvgImage = css`
	max-width: 100%;
	max-height: 100%;
	width: 95%;
	height: 95%;
`;

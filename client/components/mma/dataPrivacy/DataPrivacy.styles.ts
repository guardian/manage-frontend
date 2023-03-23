import { css } from '@emotion/react';
import { headline, textSans, until } from '@guardian/source-foundations';
// import Ellipse from './shared/Ellipse.jpg'
// import Ellipse from './shared/Ellipse.svg'
// import { PlayButton } from './PlayButton';

export const dataPrivacyHeadingCss = css`
	margin: 0;
	margin-bottom: 0.5rem;
	${headline.xxsmall({ fontWeight: 'bold' })}
`;

export const dataPrivacyParagraphCss = css`
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
	${textSans.small()}
`;

export const dataPrivacyUnorderedListCss = css`
	margin: 0;
	${textSans.small()}
	li::before {
		display: inline-block;
		content: '';
		border-radius: 50%;
		height: 13px;
		width: 13px;
		background-color: #dcdcdc;
		margin-left: -20px;
		margin-right: 7px;
	}
`;

export const dataPrivacyVideoCss = css`
	width: 100%;
`;

export const dataPrivacyVideoOverlayContainer = css`
	width: 100%;
	position: relative;
	video {
		width: 100%;
		display: block;
	}
`;

export const dataPrivacyVideoOverlay = css`
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
	${headline.medium({ fontWeight: 'bold' })};
	left: 25%;
	bottom: 0;
	position: absolute;
	${until.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
	${until.mobileMedium} {
		${headline.xxsmall({ fontWeight: 'bold' })};
	}
`;

export const dataPrivacyFooter = css`
	color: white;
	width: 100%;
	height: 20%;
`;

export const dataPrivacyPlayButtonWrapper = css`
	height: 20%;
	left: 0;
	bottom: 0;
	position: absolute;
	margin-left: 1%;
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

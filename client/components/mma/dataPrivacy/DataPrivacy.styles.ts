import { css } from '@emotion/react';

export const dataPrivacyHeadingCss = css`
	margin: 0;
	margin-bottom: 0.5rem;
`;

export const dataPrivacyParagraphCss = css`
	/* margin: 0; */
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
`;

export const dataPrivacyUnorderedListCss = css`
	margin: 0;
`;

export const dataPrivacyVideoCss = css`
	width: 100%;
`;

export const dataPrivacyVideoOverlayContainer = css`
	background-color: red;
	width: 100%;
	position: relative;
	/* width: 500px; */
	/* margin: 0 auto; */
	/* padding: 20px; */

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
`;

export const dataPrivacyFooter = css`
	position: absolute;
	bottom: 0;
	color: white;
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: baseline;
	padding-left: 1rem;
	padding-bottom: 0.5rem;
`;

export const dataPrivacyMarketingToggleCss = css`
	margin-top: 0;
	position: relative;
`;
import { css } from '@emotion/react';
import { brand, headline, space, textSans } from '@guardian/source-foundations';

export const sectionSpacing = css`
	margin-top: ${space[4]}px;
`;

export const linkCss = css`
	${textSans.medium()};
	color: ${brand[400]};
	font-style: normal;
	font-weight: 700;
	line-height: 135%; /* 22.95px */
	text-decoration-line: underline;
	margin-left: 20px;
	margin-top: 10px;
`;

export const headingCSS = css`
	${headline.medium({ fontWeight: 'bold' })};
	margin-top: 0;
	margin-bottom: 0;
`;

export const paragraphCss = css`
	margin-bottom: 32px;
	font-size: 17px;
	font-style: normal;
	font-weight: 400;
	line-height: 130%;
`;

export const withMarginParagraphCss = css`
	margin-bottom: 32px;
	font-size: 17px;
	font-style: normal;
	font-weight: 400;
	line-height: 130%;
	margin-left: 36px;
`;

export const iconTextCss = css`
	font-size: 17px;
	font-style: normal;
	font-weight: 700;
	line-height: 130%; /* 22.1px */
	margin-top: 4px;
`;

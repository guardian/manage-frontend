import { css } from '@emotion/react';
import { brand, from, space, textSans } from '@guardian/source-foundations';

export const linkCss = css`
	${textSans.medium()};
	color: ${brand[400]};
	font-weight: 700;
	text-decoration-line: underline;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	${from.tablet} {
		margin-left: 20px;
	}
`;

export const withMarginParagraphCss = css`
	${textSans.medium()};
	margin-left: 36px;
	margin-bottom: ${space[3]}px;
`;

export const iconTextCss = css`
	font-size: 17px;
	font-style: normal;
	font-weight: 700;
	line-height: 130%; /* 22.1px */
	margin-top: 4px;
`;

import { css } from '@emotion/react';
import {
	brand,
	from,
	headline,
	space,
	textSans,
} from '@guardian/source-foundations';

export const sectionSpacing = css`
	margin-top: ${space[4]}px;
`;

export const linkCss = css`
	${textSans.medium()};
	color: ${brand[400]};
	font-weight: 700;
	text-decoration-line: underline;
	margin-top: 10px;
	margin-left: 20px;
	display: flex;
	justify-content: center;
`;

export const headingCSS = css`
	${from.desktop} {
      ${headline.medium({ fontWeight: 'bold' })};
      margin-bottom: 0;
    }

	${from.mobile}{
		${headline.xsmall({ fontWeight: 'bold' })}
		margin-bottom: 0;
`;

export const withMarginParagraphCss = css`
	${textSans.medium()};
	margin-left: 36px;
`;

export const iconTextCss = css`
	font-size: 17px;
	font-style: normal;
	font-weight: 700;
	line-height: 130%; /* 22.1px */
	margin-top: 4px;
`;

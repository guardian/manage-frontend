import { css } from '@emotion/react';
import { space, until } from '@guardian/source-foundations';

export const errorSummaryOverrideCss = css`
	${until.tablet} {
		border-radius: 6px;
	}
`;

export const errorSummaryLinkCss = css`
	color: currentColor;
	text-decoration: underline;
`;

export const errorSummaryBlockLinkCss = css`
	display: block;
	margin-top: ${space[3]}px;
`;

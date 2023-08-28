import { css } from '@emotion/react';
import { from, palette, space, until } from '@guardian/source-foundations';

export const listWithDividersCss = css`
	li + li {
		> svg {
			padding-top: ${space[2]}px;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
		> span {
			flex-grow: 1;
			padding-top: ${space[2]}px;
			border-top: 1px solid ${palette.neutral[86]};
			min-width: 0;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
	}
`;

export const buttonCentredCss = css`
	justify-content: center;
`;

export const buttonMutedCss = css`
	${until.tablet} {
		border: none;
	}
`;

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

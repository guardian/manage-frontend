import { css } from '@emotion/react';
import { space, until } from '@guardian/source-foundations';

export const buttonCentredCss = css`
	justify-content: center;
`;

export const buttonMutedCss = css`
	${until.tablet} {
		border: none;
	}
`;

export const errorSummaryBlockLinkCss = css`
	display: block;
	margin-top: ${space[3]}px;
`;

import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';

export const buttonCentredCss = css`
	justify-content: center;
`;

export const buttonMutedCss = css`
	${until.tablet} {
		border: none;
	}
`;

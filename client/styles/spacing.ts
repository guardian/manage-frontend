import { css } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';

export const sectionSpacing = css`
	margin-top: ${space[6]}px;
	${from.tablet} {
		margin-top: ${space[9]}px;
	}
`;

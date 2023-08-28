import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';

export const errorSummaryOverrideCss = css`
	${until.tablet} {
		border-radius: 6px;
	}
`;

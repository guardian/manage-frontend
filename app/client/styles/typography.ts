import { css } from '@emotion/react';
import { from, headline, palette } from '@guardian/source-foundations';

export const heading = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	margin-top: 0;
	margin-bottom: 0;
	border-top: 1px solid ${palette.neutral[86]};
	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	} ;
`;

export const measure = {
	regular: css`
		max-width: 60ch;
	`,
	medium: css`
		max-width: 30ch;
	`,
};

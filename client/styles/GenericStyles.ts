import { css } from '@emotion/react';
import { from, headline, palette, space } from '@guardian/source-foundations';

export const sectionSpacing = css`
	margin-top: ${space[6]}px;
	${from.tablet} {
		margin-top: ${space[9]}px;
	}
`;

export const headingCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	margin-top: 0;
	margin-bottom: 0;

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}

	span {
		display: block;
		color: ${palette.brand['500']};
	}
`;

export const whatHappensNextCss = css`
	li > svg {
		fill: ${palette.brand[500]};
	}
`;

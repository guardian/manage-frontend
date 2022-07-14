import { css } from '@emotion/react';
import {
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { minWidth } from '../../styles/breakpoints';

export const colour = {
	background: {
		hero: '#e3edfe',
	},
};

export const headingCss = css`
	border-top: 1px solid ${palette.neutral[86]};
	${headline.xsmall({ fontWeight: 'bold' })};
	margin-top: ${space[6]}px;
	margin-bottom: ${space[3]}px;
	${minWidth.tablet} {
		${headline.small({ fontWeight: 'bold' })};
		margin-top: ${space[9]}px;
	} ;
`;

export const standfirstCss = css`
	${textSans.medium()};
	margin: 0;
	max-width: 60ch;
`;

export const listCss = css`
	${textSans.medium()};
	margin: 0;
	padding-left: ${space[4]}px;
	list-style-position: outside;

	> * + * {
		margin-top: ${space[2]}px;
	}
`;

export const tickListCss = css`
	list-style: none;
	padding-left: 0;

	li {
		display: flex;
		align-items: start;
	}

	svg {
		flex-shrink: 0;
		margin-right: ${space[2]}px;
		fill: ${palette.brand[500]};
	}
`;

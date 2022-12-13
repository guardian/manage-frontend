import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';

export const colour = {
	background: {
		hero: '#e3edfe',
	},
};

export const pageTopCss = css`
	margin-top: ${space[6]}px;
	${from.tablet} {
		margin-top: ${space[9]}px;
	}
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

export const buttonFullWidthOnMobileCss = css`
	${until.tablet} {
		width: 100%;
		justify-content: center;
	}
`;

export const buttonHideChevronOnMobileCss = css`
	${until.tablet} {
		div,
		svg {
			display: none;
		}
	}
`;

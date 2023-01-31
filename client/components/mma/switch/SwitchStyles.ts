import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';

export const productTitleCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

export const iconListCss = css`
	${textSans.medium()};
	list-style: none;
	margin: 0 0 0 -${space[1]}px;
	padding: 0;

	> li {
		display: flex;
		align-items: flex-start;

		> svg {
			flex-shrink: 0;
			margin-right: ${space[2]}px;
			fill: currentColor;
		}

		> span strong {
			display: block;
		}
	}

	> li + li {
		margin-top: ${space[2]}px;
	}
`;

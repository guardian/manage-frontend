import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';

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

export const iconListCss = css`
	${textSans.medium()};
	list-style: none;
	padding: 0;
	margin-bottom: 0;

	li + li {
		margin-top: ${space[2]}px;
		${from.tablet} {
			margin-top: ${space[3]}px;
		}
	}

	li {
		display: flex;
		margin-left: -4px;
		align-items: flex-start;

		> svg {
			flex-shrink: 0;
			margin-right: 8px;
			fill: currentColor;
		}
	}
`;

export const productTitleCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

export const smallPrintCss = css`
	${textSans.xxsmall()};
	margin-top: 0;
	margin-bottom: 0;
	color: #606060;
	> a {
		color: inherit;
		text-decoration: underline;
	}
	& + & {
		margin-top: ${space[1]}px;
	}
`;

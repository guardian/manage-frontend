import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans12,
	textSans17,
	until,
} from '@guardian/source/foundations';

export const sectionSpacing = css`
	margin-top: ${space[6]}px;
	${from.tablet} {
		margin-top: ${space[9]}px;
	}
`;

export const headingCss = css`
	${headlineBold24};
	margin-top: 0;
	margin-bottom: 0;
	${from.tablet} {
		${headlineBold28};
	}
	span {
		display: block;
		color: ${palette.brand['500']};
	}
`;

export const whatHappensNextIconCss = css`
	li > svg {
		fill: ${palette.brand[500]};
	}
`;

export const iconListCss = css`
	${textSans17};
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
	${headlineBold24};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
	${from.tablet} {
		${headlineBold28};
	}
`;

export const smallPrintCss = css`
	${textSans12};
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

export const listWithDividersCss = css`
	li + li {
		> svg {
			padding-top: ${space[2]}px;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
		> span {
			flex-grow: 1;
			padding-top: ${space[2]}px;
			border-top: 1px solid ${palette.neutral[86]};
			min-width: 0;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
	}
`;

export const paragraphListCss = css`
	${textSans17};
	${from.tablet} {
		span {
			display: block;
		}
	}
`;

export const twoColumnChoiceCardMobile = css`
	> div {
		${until.mobileLandscape} {
			display: grid;
			column-gap: ${space[2]}px;
			grid-template-columns: repeat(2, 1fr);
		}
	}
`;

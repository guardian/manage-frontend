import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';

export const sectionSpacing = css`
	margin-top: ${space[6]}px;
	${from.tablet} {
		margin-top: ${space[9]}px;
	}
`;

export const cardSectionCss = css`
	margin-top: ${space[5]}px;
	${from.tablet} {
		padding-top: ${space[5]}px;
		border-top: 1px solid ${palette.neutral[86]};
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

export const newAmountCss = css`
	${textSans.medium({ fontWeight: 'bold' })};
	padding-top: ${space[3]}px;
	margin-top: ${space[4]}px;
	margin-bottom: 0;
	border-top: 1px solid ${palette.neutral[86]};
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

export const buttonCentredCss = css`
	justify-content: center;
`;

export const buttonLayoutCss = css`
	> * + * {
		margin-left: ${space[3]}px;
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

export const productSubtitleCss = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
`;

export const cardHeaderDivCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

export const headingCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	margin-top: 0;
	margin-bottom: 0;

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
		span {
			display: block;
		}
	}
`;

export const buttonContainerCss = css`
	${until.tablet} {
		display: flex;
		flex-direction: column;
	}
`;

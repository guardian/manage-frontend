import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';

export const cardSectionCss = css`
	margin-top: ${space[5]}px;
	${from.tablet} {
		padding-top: ${space[5]}px;
		border-top: 1px solid ${palette.neutral[86]};
	}
`;

export const newAmountCss = css`
	${textSans.medium({ fontWeight: 'bold' })};
	padding-top: ${space[3]}px;
	margin-top: ${space[4]}px;
	margin-bottom: 0;
	border-top: 1px solid ${palette.neutral[86]};
`;

export const buttonCentredCss = css`
	justify-content: center;
`;

export const buttonLayoutCss = css`
	> * + * {
		margin-left: ${space[3]}px;
	}
`;

export const stackedButtonLayoutCss = css`
	display: flex;
	flex-direction: column;
	margin-top: ${space[5]}px;
	> * + * {
		margin-top: ${space[3]}px;
	}
	${from.tablet} {
		flex-direction: row;
		> * + * {
			margin-top: 0;
			margin-left: ${space[3]}px;
		}
	}
`;

export const reverseStackedButtonLayoutCss = css`
	display: flex;
	flex-direction: column-reverse;
	margin-top: ${space[5]}px;
	padding-top: 32px;
	> * + * {
		margin-bottom: ${space[3]}px;
	}
	${from.tablet} {
		flex-direction: row;
		justify-content: flex-end;
		> * + * {
			margin-top: 0;
			margin-left: ${space[3]}px;
		}
	}
`;

export const stackedButtonLeftLayoutCss = css`
	display: flex;
	flex-direction: column-reverse;
	margin-top: ${space[5]}px;
	padding-top: 32px;
	> * + * {
		margin-bottom: ${space[3]}px;
	}
	${from.tablet} {
		flex-direction: row;
		> * + * {
			margin-top: 0;
			margin-left: ${space[3]}px;
		}
	}
`;

export const productSubtitleCss = css`
	${textSans.large({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
`;

export const cardHeaderDivCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

export const buttonContainerCss = css`
	${until.tablet} {
		display: flex;
		flex-direction: column;
	}
`;

export const buttonMutedCss = css`
	${until.tablet} {
		border: none;
	}
`;

export const wideButtonCss = css`
	${from.tablet} {
		flex-grow: 1;
		max-width: 300px;
	}
`;

export const paragraphListCss = css`
	${textSans.medium()};
	${from.tablet} {
		span {
			display: block;
		}
	}
`;

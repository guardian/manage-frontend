import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';

export const productTitleCss = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin-top: 0;
	margin-bottom: ${space[1]}px;
	max-width: calc(100% - 97px); // Leave space for gift ribbon

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

export const sectionHeadingCss = css`
	${textSans.medium({ fontWeight: 'bold' })};
	margin-top: 0;
	margin-bottom: ${space[2]}px;
`;

export const productDetailLayoutCss = css`
	> * + * {
		margin-top: ${space[5]}px;
	}

	${from.tablet} {
		display: flex;
		flex-direction: row;
		> * + * {
			margin-top: 0;
			margin-left: auto;
			padding-left: ${space[4]}px;
		}
	}
`;

export const keyValueCss = css`
	${textSans.medium()};
	margin: 0;

	div + div {
		margin-top: ${space[1]}px;
	}

	dt {
		display: inline-block;
		margin-right: 0.5ch;
		:after {
			content: ':';
		}
	}

	dd {
		display: inline-block;
		margin-left: 0;
	}
`;

export const buttonLayoutCss = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	> * + * {
		margin-top: ${space[3]}px;
	}
`;

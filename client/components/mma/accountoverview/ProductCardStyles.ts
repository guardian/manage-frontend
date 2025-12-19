import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { textColour } from './ProductCardConfiguration';

export const productCardTitleCss = (dark?: boolean) => css`
	${headlineBold20};
	color: ${dark ? textColour.dark : textColour.light};
	margin-top: 0;
	margin-bottom: ${space[1]}px;
	max-width: calc(100% - 97px); // Leave space for gift ribbon

	${from.tablet} {
		${headlineBold24};
	}
`;

export const sectionHeadingCss = css`
	${textSansBold17};
	margin-top: 0;
	margin-bottom: ${space[1]}px;
`;

export const productDetailLayoutCss = css`
	> * + * {
		margin-top: ${space[6]}px;
	}

	${from.tablet} {
		display: flex;
		flex-direction: row;
		margin-bottom: ${space[2]}px;

		> * + * {
			margin-top: 0;
			margin-left: auto;
			padding-left: ${space[4]}px;
		}
	}
`;

export const keyValueCss = css`
	${textSans17};
	margin: 0;
	margin-bottom: ${space[2]}px;

	${from.tablet} {
		margin-bottom: 0;
	}

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

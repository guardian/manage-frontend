import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans17,
	textSansBold12,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import type { ProductCardConfiguration } from './ProductCardConfiguration';
import { textColour } from './ProductCardConfiguration';

export const productCardTitleCss = (dark?: boolean) => css`
	${headlineBold20};
	color: ${dark ? textColour.dark : textColour.light};
	margin-top: 0;
	margin-bottom: ${space[1]}px;

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

export const promoPillCss = css`
	${textSansBold12};
	margin-top: 0;

	${from.tablet} {
		${textSansBold15};
		margin-top: ${space[0]}px;
	}
`;
export const giftRibbonCss = css`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 0;
`;

export const benefitsTextCss = css`
	${textSans17};
	margin: 0;
	margin-bottom: ${space[2]}px;
`;

export const benefitsSectionBackgroundColour = '#edf5fa';

export const centeredButtonCss = css`
	justify-content: center;
`;

export const giftRibbonColour = (cardConfig: ProductCardConfiguration) =>
	cardConfig.invertText ? palette.brand[400] : palette.brandAlt[400];
export const giftRibbonCopyColour = (cardConfig: ProductCardConfiguration) =>
	cardConfig.invertText ? palette.brandAlt[400] : palette.brand[400];

export const sharedMembershipTextCss = css`
	${textSans17};
	margin: 0;
`;

export const centeredActionCss = css`
	display: flex;
	justify-content: flex-end;
`;

export const sharedMembershipLeaveButtonCss = css`
	justify-content: flex-end;
	background: transparent;
	text-decoration: underline;
`;

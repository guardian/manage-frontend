import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';

export const benefitsCss = css`
	${textSans.medium()};
	color: ${palette.neutral[7]};
	list-style: none;
	margin: 0 0 0 -4px;
	padding: 0;

	li + li {
		margin-top: ${space[2]}px;
	}

	li {
		display: flex;
		align-items: flex-start;
	}

	svg {
		flex-shrink: 0;
		margin-right: ${space[2]}px;
		fill: ${palette.brand[500]};
	}
`;

export const lineBreakCss = css`
	${from.tablet} {
		display: none;
	}
`;

export const benefitsButtonCss = css`
	${textSans.small()}
	margin-top: ${space[1]}px;
	padding: 0;
	color: ${palette.brand[500]};
	border-bottom: 1px solid ${palette.brand[500]};
`;

export const unavailableBenefitsCss = css`
	color: ${palette.neutral[46]};
	svg {
		fill: ${palette.neutral[46]};
	}
`;

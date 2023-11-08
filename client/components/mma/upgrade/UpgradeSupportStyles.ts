import { css } from '@emotion/react';
import { from, palette, textSans } from '@guardian/source-foundations';

export const linkCss = css`
	${textSans.medium()};
	a {
		color: ${palette.brand[400]};
	}
	color: ${palette.brand[400]};
	font-weight: 700;
	text-decoration-line: underline;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	${from.tablet} {
		margin-left: 20px;
	}
`;

export const nonLinkCss = css`
	${textSans.medium()};
	color: ${palette.neutral[46]};
	margin-top: 10px;
	display: flex;
	justify-content: center;
	${from.tablet} {
		margin-left: 20px;
	}
`;

export const linkAdditionCss = css`
	${textSans.medium()};
	a {
		color: ${palette.brand[400]};
	}
	color: ${palette.brand[400]};
	font-weight: 700;
	text-decoration-line: underline;
	display: inline;
	justify-content: center;
	${from.tablet} {
		margin-left: 20px;
	}
`;

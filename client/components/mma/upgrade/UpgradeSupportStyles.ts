import { css } from '@emotion/react';
import { from, palette, textSans } from '@guardian/source-foundations';

export const linkCss = css`
	${textSans.medium()};
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

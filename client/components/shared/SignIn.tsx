import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';

export const signInCss = css`
	display: grid;
	overflow: hidden;
	background-color: ${palette.brand[500]};
	border-radius: 8px;
	> * {
		grid-area: 1 / 1;
	}
	> svg {
		place-self: end;
		height: 0;
		min-height: 100%;
	}
`;

export const signInHeadingCss = css`
	${textSansBold17};
	margin: 0;
`;

export const signInParaCss = css`
	${textSans17};
	margin: 0;
	max-width: 64%;
`;

export const signInContentContainerCss = css`
	padding: ${space[3]}px;
	color: ${palette.neutral[100]};
`;

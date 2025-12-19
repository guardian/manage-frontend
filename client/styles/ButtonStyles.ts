import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';

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

export const wideButtonLayoutCss = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-bottom: ${space[2]}px;

	${from.tablet} {
		margin-bottom: 0;
	}

	> * + * {
		margin-top: ${space[3]}px;
	}
`;

import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans14,
	textSans15,
} from '@guardian/source/foundations';

export const textSmall = css`
	font-size: 14px;
`;

export const standardSansText = css`
	${textSans15};
	line-height: 1.333;
`;

export const toggleDescriptionPadding = css`
	margin: 0;
	padding: 2.88px 90px 0 0;
`;

const lightBorder = css`
	border: 1px solid ${palette.neutral[86]};
`;

const errorBorder = css`
	border: 1px solid ${palette.error[400]};
`;

export const aCss = css`
	color: ${palette.sport[300]};
	border-bottom: 1px solid ${palette.neutral[86]};
	transition: border-color 0.15s ease-out;
	:hover {
		border-bottom: 1px solid ${palette.sport[300]};
	}
`;

const inputCss = css`
	${textSans14};
	box-shadow: none;
	box-sizing: border-box;
	color: ${palette.neutral[7]};
	display: inline-block;
	padding: ${space[2]}px ${space[2]}px 7px;
	lineheight: 1.4;
	outline: none;
	border-radius: 0;
	width: 100%;
	margin-top: ${space[1]}px;
`;

const textareaCss = css`
	vertical-align: top;
	min-height: 108px;
	overflow: auto;
	resize: vertical;
	margin-top: ${space[1]}px;
`;

const selectCss = css`
	font: inherit;
	display: block;
	margin-top: 4px;
`;

export const labelCss = css`
	margin: 5px 0 24px 0;
	display: block;
	width: 100%;
	& input:not([type='file']), & textarea: ${[inputCss, lightBorder]};
	& input[type='file']: ${inputCss};
	& textarea: ${textareaCss};
	& select: ${selectCss};
`;

export const errorMessageCss = css`
	font-size: 14px;
	line-height: 18px;
	background-color: #ffe1e1;
	border-bottom: 1px solid ${palette.error[400]};
	border-top: 1px solid ${palette.error[400]};
	color: ${palette.error[400]};
	margin-top: 6px;
	padding: 7px 8px;
`;

export const formFieldErrorCss = css`
	input:not([type='file']),
	textarea,
	input {
		${errorBorder}
	}
	p {
		${textSmall};
		color: ${palette.error[400]};
		margin-top: 6px;
	}
`;

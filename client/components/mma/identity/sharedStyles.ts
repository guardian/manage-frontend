import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { sans } from '../../../styles/fonts';

export const textSmall = css({
	fontSize: '14px',
});

export const standardSansText = css({
	fontFamily: sans,
	fontSize: '14px',
	lineHeight: '1.333',
});

export const toggleDescriptionPadding = css({
	margin: '0',
	padding: '2.88px 90px 0 0',
});

const lightBorder = css({
	border: `1px solid ${palette.neutral[86]}`,
});

const errorBorder = css({
	border: `1px solid ${palette.error[400]}`,
});

export const aCss = css({
	color: palette.sport[300],
	borderBottom: `1px solid ${palette.neutral[86]}`,
	transition: 'border-color .15s ease-out',
	'&:hover': {
		borderBottom: `1px solid ${palette.sport[300]}`,
	},
});

const inputCss = css({
	boxShadow: 'none',
	boxSizing: 'border-box',
	color: palette.neutral[7],
	display: 'inline-block',
	padding: '8px 8px 7px',
	fontSize: '14px',
	lineHeight: '1.4',
	outline: 'none',
	borderRadius: '0',
	width: '100%',
	marginTop: '4px',
});

const textareaCss = css({
	verticalAlign: 'top',
	minHeight: '108px',
	overflow: 'auto',
	resize: 'vertical',
	marginTop: '4px',
});

const selectCss = css({
	font: 'inherit',
	display: 'block',
	marginTop: '4px',
});

export const labelCss = css({
	margin: '5px 0 24px 0',
	display: 'block',
	width: '100%',
	"& input:not([type='file']), & textarea": [inputCss, lightBorder],
	"& input[type='file']": inputCss,
	'& textarea': textareaCss,
	'& select': selectCss,
});

export const errorMessageCss = css({
	fontSize: '13px',
	lineHeight: '18px',
	backgroundColor: '#ffe1e1',
	borderBottom: `1px solid ${palette.error[400]}`,
	borderTop: `1px solid ${palette.error[400]}`,
	color: palette.error[400],
	marginTop: '6px',
	padding: '7px 8px',
});

export const formFieldErrorCss = css({
	"& input:not([type='file']), & textarea, & input": errorBorder,
	'& p': [
		textSmall,
		{
			color: palette.error[400],
			marginTop: '6px',
		},
	],
});

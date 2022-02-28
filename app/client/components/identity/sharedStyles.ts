import { css } from '@emotion/react';
import palette from '../../colours';

export const textSmall = css({
	fontSize: '14px',
});

const lightBorder = css({
	border: `1px solid ${palette.neutral['5']}`,
});

const errorBorder = css({
	border: `1px solid ${palette.red.medium}`,
});

export const aCss = css({
	color: palette.blue.dark,
	borderBottom: `1px solid ${palette.neutral['5']}`,
	transition: 'border-color .15s ease-out',
	'&:hover': {
		borderBottom: `1px solid ${palette.blue.dark}`,
	},
});

const inputCss = css({
	boxShadow: 'none',
	boxSizing: 'border-box',
	color: palette.neutral['1'],
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
	"& input:not([type='file']), & textarea": [ inputCss, lightBorder ],
	"& input[type='file']": inputCss,
	'& textarea': textareaCss,
	'& select': selectCss,
});

export const errorMessageCss = css({
	fontSize: '13px',
	lineHeight: '18px',
	backgroundColor: '#ffe1e1',
	borderBottom: `1px solid ${palette.red.light}`,
	borderTop: `1px solid ${palette.red.light}`,
	color: palette.red.medium,
	marginTop: '6px',
	padding: '7px 8px',
});

export const formFieldErrorCss = css({
	"& input:not([type='file']), & textarea, & input": errorBorder,
	'& p': [
		textSmall,
		{
			color: palette.red.medium,
			marginTop: '6px',
		}
	],
});

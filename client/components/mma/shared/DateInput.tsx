import { css } from '@emotion/react';
import { palette, until } from '@guardian/source/foundations';
import { sans } from '../../../styles/fonts';

const inputBoxCss = css({
	fontFamily: sans,
	border: 0,
	width: '50px',
	fontSize: '16px',
	appearance: 'textfield',
	textAlign: 'center',
	padding: 0,
	margin: 0,
});

const dayMonthCss = css(inputBoxCss, {
	width: '25px',
});

const dividerCss = css({
	display: 'inline-block',
	fontSize: '16px',
	padding: 0,
	margin: 0,
});

export interface DateInputProps {
	date: Date;
	labelText: string;
	disabled?: boolean;
}

export const DateInput = (props: DateInputProps) => (
	<>
		<div
			css={{
				fontFamily: sans,
				fontSize: '14px',
				[until.desktop]: {
					display: 'none',
				},
			}}
		>
			{props.labelText}
			<br />
		</div>
		<fieldset
			css={{
				border: '1px solid' + palette.neutral[86],
				padding: '5px',
				whiteSpace: 'nowrap',
				margin: 0,
			}}
			aria-describedby="validation-message"
			disabled={props.disabled}
		>
			<input
				css={dayMonthCss}
				aria-label="day"
				value={props.date.getDate()}
				readOnly // TODO: remove and replace with onChange when input boxes become active
			/>
			<div css={dividerCss}>/</div>
			<input
				css={dayMonthCss}
				aria-label="month"
				value={props.date.getMonth() + 1}
				readOnly // TODO: remove and replace with onChange when input boxes become active
			/>
			<div css={dividerCss}>/</div>
			<input
				css={inputBoxCss}
				aria-label="year"
				value={props.date.getFullYear()}
				readOnly // TODO: remove and replace with onChange when input boxes become active
			/>
		</fieldset>
	</>
);

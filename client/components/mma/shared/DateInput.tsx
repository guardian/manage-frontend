import { css } from '@emotion/react';
import {
	palette,
	textSans14,
	textSans17,
	until,
} from '@guardian/source/foundations';

const inputBoxCss = css`
	${textSans17};
	border: 0;
	width: 50px;
	appearance: textfield;
	text-align: center;
	padding: 0;
	margin: 0;
`;

const dayMonthCss = css`
	width: 25px;
`;

const dividerCss = css`
	${textSans17};
	display: inline-block;
	padding: 0;
	margin: 0;
`;

export interface DateInputProps {
	date: Date;
	labelText: string;
	disabled?: boolean;
}

export const DateInput = (props: DateInputProps) => (
	<>
		<div
			css={css`
				${textSans14};
				${until.desktop} {
					display: none;
				}
			`}
		>
			{props.labelText}
			<br />
		</div>
		<fieldset
			css={css`
				border: 1px solid ${palette.neutral[86]};
				padding: 5px;
				white-space: nowrap;
				margin: 0;
			`}
			aria-describedby="validation-message"
			disabled={props.disabled}
		>
			<input
				css={css`
					${inputBoxCss};
					${dayMonthCss};
				`}
				aria-label="day"
				value={props.date.getDate()}
				readOnly // TODO: remove and replace with onChange when input boxes become active
			/>
			<div css={dividerCss}>/</div>
			<input
				css={css`
					${inputBoxCss};
					${dayMonthCss};
				`}
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

import { css, SerializedStyles } from '@emotion/core';
import { focusHalo } from '@guardian/src-foundations/accessibility';
import { error, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import * as React from 'react';
import { ErrorIcon } from '../../svgs/errorIcon';

type setStateFunc = (value: string) => void;

interface SelectOption {
	name: string;
	value: string;
}

interface SelectProps {
	label: string;
	options: SelectOption[];
	width: number;
	value: string;
	additionalCSS?: SerializedStyles;
	changeSetState?: setStateFunc;
	inErrorState?: boolean;
	errorMessage?: string;
}

export const Select = (props: SelectProps) => (
	<label
		css={css`
			display: block;
			color: ${neutral['7']};
			${textSans.medium()} ${props.additionalCSS};
			font-weight: bold;
		`}
	>
		{props.label}
		{props.inErrorState && (
			<span
				css={css`
					display: block;
					color: ${error[400]};
				`}
			>
				<ErrorIcon />
				{props.errorMessage}
			</span>
		)}
		<select
			name="country"
			id="delivery-address-country"
			defaultValue={props.value}
			onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
				props.changeSetState &&
				props.changeSetState(`${e.target.value}`)
			}
			css={css`
				display: block;
				width: 100%;
				max-width: ${props.width}ch;
				${textSans.medium()}
				color: ${neutral['7']};
				box-sizing: border-box;
				margin-top: 4px;
				padding: 8px 0 8px 4px;
				border: ${props.inErrorState ? 4 : 2}px solid
					${props.inErrorState ? error[400] : neutral['60']};
				&:focus {
					${focusHalo};
				}
				& option {
					line-height: '40px';
					font-size: 1.0625rem;
				}
			`}
		>
			<option value="" key="init-value">
				&nbsp;
			</option>
			{props.options.map((option, index) => (
				<option value={option.value} key={`country-${index}`}>
					{option.name}
				</option>
			))}
		</select>
	</label>
);

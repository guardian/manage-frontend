import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { focusHalo, palette, textSans } from '@guardian/source/foundations';
import type * as React from 'react';
import { ErrorIcon } from '../../shared/assets/ErrorIcon';

type SetStateFunc = (value: string) => void;

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
	changeSetState?: SetStateFunc;
	inErrorState?: boolean;
	errorMessage?: string;
}

export const Select = (props: SelectProps) => (
	<label
		css={css`
			display: block;
			color: ${palette.neutral['7']};
			${textSans.medium()} ${props.additionalCSS};
			font-weight: bold;
		`}
		data-qm-masking="blocklist"
	>
		{props.label}
		{props.inErrorState && (
			<span
				css={css`
					display: block;
					color: ${palette.error[400]};
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
				color: ${palette.neutral['7']};
				box-sizing: border-box;
				margin-top: 4px;
				padding: 8px 0 8px 4px;
				border: ${props.inErrorState ? 4 : 2}px solid
					${props.inErrorState
						? palette.error[400]
						: palette.neutral['60']};
				&:focus {
					${focusHalo};
				}
				& option {
					line-height: 40px;
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

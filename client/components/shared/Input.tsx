import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	error,
	focusHalo,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import { useEffect, useRef } from 'react';
import type * as React from 'react';
import { ErrorIcon } from '../mma/shared/assets/ErrorIcon';

type SetStateFunc = (value: string) => void;

interface InputProps {
	type?: string;
	step?: string;
	min?: string;
	label: string;
	secondaryLabel?: string;
	width: number;
	value: string | number;
	optional?: boolean;
	name?: string;
	id?: string;
	changeSetState?: SetStateFunc;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	setFocus?: boolean;
	inErrorState?: boolean;
	errorMessage?: string;
	prefixValue?: string;
	additionalCss?: SerializedStyles;
}

export const Input = (props: InputProps) => {
	const inputEl = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (props.setFocus) {
			inputEl.current?.focus();
		}
	}, [props.setFocus]);

	return (
		<label
			css={css`
				display: block;
				color: ${neutral['7']};
				${textSans.medium()};
				font-weight: bold;
				${props.additionalCss}
			`}
			data-qm-masking="blocklist"
		>
			{props.label}
			{props.optional && (
				<span
					css={css`
						font-style: italic;
						font-weight: normal;
						color: ${neutral['46']};
					`}
				>
					{' '}
					optional
				</span>
			)}
			{props.secondaryLabel && (
				<span
					css={css`
						display: block;
						font-weight: normal;
						color: ${neutral['46']};
						max-width: ${props.width}ch;
					`}
				>
					{props.secondaryLabel}
				</span>
			)}
			{props.inErrorState && (
				<span
					css={css`
						display: block;
						font-weight: normal;
						color: ${error[400]};
					`}
				>
					<ErrorIcon
						additionalCss={css`
							margin-right: 4px;
						`}
					/>
					{props.errorMessage}
				</span>
			)}
			<div>
				{props.prefixValue && (
					<span
						css={css`
							${textSans.medium()};
							position: relative;
							z-index: 2;
							left: 1ch;
						`}
					>
						{props.prefixValue}
					</span>
				)}
				<input
					type={props.type || 'text'}
					name={props.name}
					id={props.id}
					step={props.step}
					min={props.min}
					value={props.value}
					ref={inputEl}
					onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
						props.changeSetState &&
						props.changeSetState(
							`${
								props.type === 'number'
									? e.target.valueAsNumber
									: e.target.value
							}`,
						)
					}
					onFocus={(e: React.FocusEvent<HTMLInputElement>): void =>
						props.onFocus && props.onFocus(e)
					}
					css={css`
						width: ${props.prefixValue
							? `calc(100% - 4px)`
							: `100%`};
						max-width: ${props.width}ch;
						height: 44px;
						${textSans.medium()}
						color: ${neutral['7']};
						margin-top: 4px;
						padding: 0 8px;
						background-color: ${neutral['100']};
						border: ${props.inErrorState ? 4 : 2}px solid
							${props.inErrorState ? error[400] : neutral['60']};
						${props.prefixValue &&
						`
            margin-left: calc(-${props.prefixValue.length}ch + 4px);
            box-sizing: border-box;
            padding-left: calc(${props.prefixValue.length}ch + 10px);
          `}
						&:focus {
							${focusHalo};
						}
					`}
				/>
			</div>
		</label>
	);
};

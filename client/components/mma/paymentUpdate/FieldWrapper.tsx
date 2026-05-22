import { css } from '@emotion/react';
import {
	error,
	focusHalo,
	FocusStyleManager,
	palette,
	textSansBold17,
} from '@guardian/source/foundations';
import { InlineError } from '@guardian/source/react-components';
import type { StripeError } from '@stripe/stripe-js';
import * as React from 'react';

FocusStyleManager.onlyShowFocusOnTabs();

export interface FieldChangeEvent extends React.ChangeEvent<HTMLInputElement> {
	error: StripeError;
}

interface FieldWrapperProps {
	label: string;
	width: string;
	children: React.ReactElement;
	cornerHint?: React.ReactElement;
	onChange?: (event: FieldChangeEvent) => void;
}

interface FieldWrapperState {
	error: {
		code?: string;
		message?: string;
		type?: string;
	};
	focus: boolean;
}

export class FieldWrapper extends React.Component<
	FieldWrapperProps,
	FieldWrapperState
> {
	constructor(props: FieldWrapperProps) {
		super(props);
		this.state = {
			error: {},
			focus: false,
		};
	}

	public render(): React.ReactNode {
		const hydratedChildren = React.Children.map(
			this.props.children,
			(child) => {
				return React.cloneElement(child, {
					onChange: this.validateField(this.props.onChange),
					onFocus: this.toggleFocus,
					onBlur: this.toggleFocus,
				} as React.Attributes);
			},
		);

		let borderCss: string;

		if (this.state.error?.message) {
			borderCss = '4px solid ' + error[400];
		} else {
			borderCss = '2px solid ' + palette.neutral[60];
		}

		return (
			<div
				css={{
					width: this.props.width,
					maxWidth: '100%',
					marginBottom: '10px',
					textAlign: 'left',
					':not(:first-of-type)': {
						marginLeft: '20px',
					},
				}}
			>
				<div
					css={
						this.props.cornerHint
							? css`
									display: flex;
									justify-content: space-between;
									align-items: end;
							  `
							: ``
					}
				>
					<div>
						<label
							css={css`
								${textSansBold17};
								color: ${palette.neutral[7]};
							`}
						>
							{this.props.label}
						</label>
						{this.state.error?.message && (
							<InlineError
								cssOverrides={css`
									margin-bottom: -5px;
									margin-top: 3px;
								`}
							>
								{this.state.error.message}
							</InlineError>
						)}
					</div>
					{this.props.cornerHint && this.props.cornerHint}
				</div>

				<div
					css={css`
						border: ${borderCss};
						display: block;
						font-weight: 400;
						margin-top: 3px;
						line-height: 20px;
						padding: 10px;
						width: 100%;
						transition: all 0.2s ease-in-out;
						${this.state.focus && focusHalo};
					`}
				>
					{hydratedChildren}
				</div>
			</div>
		);
	}

	private validateField =
		(otherOnChange?: (event: FieldChangeEvent) => void) =>
		(field: FieldChangeEvent) => {
			if (otherOnChange) {
				otherOnChange(field);
			}
			this.setState({
				error: field.error?.message ? field.error : {},
			});
		};

	private toggleFocus = () => {
		this.setState({
			focus: !this.state.focus,
		});
	};
}

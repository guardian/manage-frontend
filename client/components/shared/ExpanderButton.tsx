import { css } from '@emotion/react';
import * as React from 'react';

export const expanderButtonCss =
	(mainColour?: string, highlightColour?: string) => (isExpanded: boolean) =>
		css({
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			cursor: 'pointer',
			border: '0',
			background: 'none',
			textAlign: 'left',
			fontFamily: 'inherit',
			fontSize: '16px',
			padding: '10px 1px 10px 0',
			position: 'relative',
			transform: 'translateY(-1px)',
			'::after': {
				content: "''",
				display: 'block',
				width: '5px',
				height: '5px',
				border: '1px solid currentColor',
				borderLeft: 'transparent',
				borderTop: 'transparent',
				marginLeft: '8px',
				transform: `translateY(${isExpanded ? 0 : -2}px) rotate(${
					isExpanded ? '225deg' : '45deg'
				})`,
			},
			':hover, :focus': {
				color: highlightColour,
			},
			':hover': {
				'::after': {
					transform: `translateY(${isExpanded ? -2 : 0}px) rotate(${
						isExpanded ? '225deg' : '45deg'
					})`,
					transitionProperty: 'transform',
					transitionDuration: '250ms',
					transitionTimingFunction: 'ease-in-out',
				},
			},
			color: isExpanded ? highlightColour : mainColour,
		});

export interface ExpanderButtonProps {
	buttonLabel: string | React.ReactElement;
	children: React.ReactElement | React.ReactElement[];
}

interface ExpanderButtonState {
	isExpanded: boolean;
}

export class ExpanderButton extends React.Component<
	ExpanderButtonProps,
	ExpanderButtonState
> {
	public state = {
		isExpanded: false,
	};

	public render = () => (
		<>
			<button
				css={expanderButtonCss()(this.state.isExpanded)}
				type="button"
				aria-expanded={this.state.isExpanded}
				onClick={() =>
					this.setState((prevState) => ({
						isExpanded: !prevState.isExpanded,
					}))
				}
			>
				{this.props.buttonLabel}
			</button>
			{this.state.isExpanded && this.props.children}
		</>
	);
}

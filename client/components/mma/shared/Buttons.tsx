import { css } from '@emotion/react';
import {
	brandAlt,
	from,
	neutral,
	space,
	textSans17Object,
} from '@guardian/source/foundations';
import Color from 'color';
import type * as React from 'react';
import { Link } from 'react-router-dom';
import type {
	ProductDetail,
	SwitchBillingFrequency,
} from '../../../../shared/productResponse';
import { ArrowIcon } from './assets/ArrowIcon';
import { ErrorIcon } from './assets/ErrorIcon';
import { TickIcon } from './assets/TickIcon';

export interface ButtonProps {
	text: string;
	onClick?: () => void;
	height?: string;
	fontWeight?: 'bold';
	left?: boolean;
	right?: boolean;
	disabled?: boolean;
	colour?: string;
	textColour?: string;
	primary?: true;
	hollow?: true;
	hide?: boolean;
	forceCircle?: true;
	hoverColour?: string;
	leftTick?: true;
	alert?: boolean;
	type?: 'button' | 'submit' | 'reset';
	width?: {
		initial?: string;
		fromMobileLandscape?: string;
	};
	justifyContent?:
		| 'center'
		| 'start'
		| 'end'
		| 'flex-start'
		| 'flex-end'
		| 'left'
		| 'right';
}

export interface LinkButtonState {
	productDetail: ProductDetail;
	flowReferrer?: { title: string; link: string };
}

export interface LinkButtonProps extends ButtonProps {
	to: string;
	state?: LinkButtonState | ProductDetail | SwitchBillingFrequency;
	ariaLabelText?: string;
}

const applyIconStyleIfApplicable = (
	hover: boolean,
	left?: boolean,
	right?: boolean,
	leftTick?: true,
) => {
	if (left) {
		return hover ? styles.leftHover : styles.left;
	} else if (right) {
		return hover ? styles.rightHover : styles.right;
	} else if (leftTick) {
		return {
			padding: '4px 21px 3px 16px',
		};
	}
	return {
		padding: '1px 15px 0 15px',
	};
};

const calcBackgroundColour = (
	disabled?: boolean,
	colour?: string,
	primary?: true,
	hollow?: true,
) => {
	if (disabled) {
		return neutral[60];
	} else if (primary) {
		return brandAlt[400];
	} else if (hollow) {
		return neutral[100];
	}
	return colour;
};

const calcTextColour = (
	disabled?: boolean,
	textColour?: string,
	primary?: true,
	hollow?: true,
) => {
	if (disabled) {
		return neutral[100];
	} else if (primary || hollow) {
		return neutral[7];
	}
	return textColour;
};

const defaultColour = neutral[20];
const buttonCss = ({
	disabled,
	height,
	fontWeight,
	colour = defaultColour,
	textColour = neutral[100],
	left,
	right,
	primary,
	hollow,
	hide,
	forceCircle,
	hoverColour,
	leftTick,
	width,
	justifyContent,
}: ButtonProps) => {
	const backgroundColour = calcBackgroundColour(
		disabled,
		colour,
		primary,
		hollow,
	);
	return css({
		...textSans17Object,
		borderRadius: '1000px',
		alignItems: 'center',
		position: 'relative',
		':active': {
			outline: 'none',
		},
		minHeight: height || '36px',
		height: height || '36px', // this is required in addition to 'min-height' because IE - see https://github.com/philipwalton/flexbugs/issues/231
		fontWeight,
		display: hide ? 'none' : 'inline-flex',
		background: backgroundColour,
		color: calcTextColour(disabled, textColour, primary, hollow),
		border: hollow ? '1px solid' : 'none',
		...applyIconStyleIfApplicable(false, left, right, leftTick),
		...(forceCircle
			? {
					padding: '1px 18px 0 18px',
			  }
			: {}),
		':hover': disabled
			? undefined
			: {
					background:
						hoverColour ||
						Color(backgroundColour)
							.darken(
								backgroundColour === defaultColour ? 0.3 : 0.1,
							)
							.string(),
					...applyIconStyleIfApplicable(true, left, right, leftTick),
			  },
		cursor: disabled ? 'not-allowed' : 'pointer',
		maxWidth: 'calc(100vw - 40px)',
		...(width && {
			...(width?.initial && {
				width: width.initial,
			}),
			...(width?.fromMobileLandscape && {
				[from.mobileLandscape]: { width: width.fromMobileLandscape },
			}),
		}),
		...(justifyContent && {
			justifyContent: justifyContent,
		}),
	});
};

const styles = {
	leftHover: {
		svg: { transform: 'translate(-3px, -50%) rotate(180deg)' },
	},
	left: {
		padding: '1px 18px 0 40px',
		svg: {
			fill: 'currentColor',
			height: '34px',
			position: 'absolute',
			left: '0px',
			top: '50%',
			transform: 'translate(0, -50%) rotate(180deg)',
			transition: 'transform .3s, background .3s',
			width: '36px',
		},
	},
	rightHover: {
		svg: { transform: 'translate(3px, -50%)' },
	},
	right: {
		padding: '1px 40px 0 18px',
		svg: {
			fill: 'currentColor',
			height: '34px',
			position: 'absolute',
			right: '0',
			top: '50%',
			transform: 'translate(0, -50%)',
			transition: 'transform .3s, background .3s',
			width: '36px',
		},
	},
};

export const LinkButton = (props: LinkButtonProps) => (
	<Link
		aria-label={props.ariaLabelText}
		to={props.disabled ? '' : props.to}
		onClick={props.onClick}
		css={buttonCss(props)}
		state={props.state}
	>
		{props.alert && (
			<ErrorIcon
				fill={neutral[100]}
				additionalCss={css`
					margin-right: ${space[2]}px;
				`}
			/>
		)}
		{props.text}
		{(props.left || props.right) && <ArrowIcon />}
	</Link>
);

export const Button = (props: ButtonProps) => (
	<button
		onClick={props.onClick}
		css={buttonCss(props)}
		disabled={props.disabled}
		onMouseUp={(event: React.MouseEvent<HTMLButtonElement>) =>
			(event.target as HTMLButtonElement).blur()
		}
		type={props.type}
	>
		{props.leftTick && <TickIcon />}
		{props.text}
		{(props.left || props.right) && <ArrowIcon />}
	</button>
);

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	SvgAlertRound,
	SvgCross,
	SvgInfoRound,
	SvgTickRound,
} from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import type { ToastSeverity } from '../../stores/ToastStore';
import { useToastStore } from '../../stores/ToastStore';

interface ToastVariant {
	icon: ReactNode;
	accentColour: string;
	backgroundColour: string;
}

const toastVariants: Record<ToastSeverity, ToastVariant> = {
	success: {
		icon: <SvgTickRound />,
		accentColour: palette.success[400],
		backgroundColour: '#C2F0D5',
	},
	error: {
		icon: <SvgAlertRound />,
		accentColour: palette.error[400],
		backgroundColour: palette.news[800],
	},
	info: {
		icon: <SvgInfoRound />,
		accentColour: palette.brand[500],
		backgroundColour: palette.sport[800],
	},
};

const containerCss = css`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 48px;
	z-index: 9999;
	box-sizing: border-box;
	margin: 0 auto;
	max-width: calc(${breakpoints.wide}px + 2.5rem);
	padding: 0 ${space[3]}px;

	${from.tablet} {
		padding: 0 ${space[5]}px;
	}
`;

const toastCss = (variant: ToastVariant) => css`
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
	padding: ${space[4]}px;
	border-radius: ${space[2]}px;
	background-color: ${variant.backgroundColour};
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);

	${from.tablet} {
		width: 622px;
		max-width: 100%;
	}
`;

const iconWrapperCss = (variant: ToastVariant) => css`
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		fill: ${variant.accentColour};
		width: ${space[8]}px;
		height: ${space[8]}px;
	}
`;

const bodyCss = css`
	flex: 1;
	${textSans17};
	line-height: 1.35;
	color: ${palette.neutral[0]};

	strong {
		${textSansBold17};
	}
`;

const ToastBody = ({
	children,
	cssOverrides,
}: {
	children: string;
	cssOverrides: SerializedStyles;
}) => <div css={cssOverrides}>{children}</div>;

const closeButtonCss = css`
	border: none;
	background: transparent;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${palette.neutral[7]};

	svg {
		fill: ${palette.neutral[7]};
		width: ${space[6]}px;
		height: ${space[8]}px;
	}
`;

export const ToastContainer = () => {
	const { isOpen, current, dismissToast } = useToastStore();

	if (!isOpen || !current) {
		return null;
	}

	const variant = toastVariants[current.severity];

	return (
		<div css={containerCss} aria-live="polite">
			<div css={toastCss(variant)} role="status">
				<div css={iconWrapperCss(variant)}>{variant.icon}</div>
				{typeof current.message === 'string' ? (
					<ToastBody cssOverrides={bodyCss}>
						{current.message}
					</ToastBody>
				) : (
					current.message
				)}
				<button
					type="button"
					css={closeButtonCss}
					onClick={dismissToast}
					aria-label="Close notification"
				>
					<SvgCross />
				</button>
			</div>
		</div>
	);
};

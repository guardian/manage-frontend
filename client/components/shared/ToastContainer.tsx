import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
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
	textColour: string;
}

const toastVariants: Record<ToastSeverity, ToastVariant> = {
	success: {
		icon: <SvgTickRound />,
		accentColour: palette.success[400],
		textColour: palette.success[400],
	},
	error: {
		icon: <SvgAlertRound />,
		accentColour: palette.error[400],
		textColour: palette.error[400],
	},
	info: {
		icon: <SvgInfoRound />,
		accentColour: palette.brand[500],
		textColour: palette.neutral[7],
	},
};

const containerCss = css`
	position: fixed;
	left: 22px;
	bottom: 53px;
	z-index: 9999;
	max-width: 80%;
	width: 100%;

	${from.tablet} {
		left: 71px;
		min-width: 622px;
		width: unset;
	}
`;

const toastCss = (variant: ToastVariant) => css`
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
	padding: ${space[4]}px;
	border-radius: ${space[2]}px;
	border: 1px solid ${variant.accentColour};
	background-color: ${palette.neutral[100]};
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
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

const bodyCss = (variant: ToastVariant) => css`
	flex: 1;
	${textSansBold17};
	line-height: 1.35;
	color: ${variant.textColour};

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
					<ToastBody cssOverrides={bodyCss(variant)}>
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

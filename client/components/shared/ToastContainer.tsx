import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { SvgCross, SvgTickRound } from '@guardian/source/react-components';
import { useToastStore } from '../../stores/ToastStore';

const containerCss = css`
	position: fixed;
	left: ${space[4]}px;
	bottom: ${space[24]}px;
	z-index: 9999;
	min-width: unset;
	max-width: 80%;
	width: 100%;

	${from.tablet} {
		left: 80px;
		bottom: 140px;
		max-width: unset;
		min-width: 622px;
		width: unset;
	}
`;

const toastCss = css`
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
	padding: ${space[4]}px;
	border-radius: ${space[2]}px;
	border: 1px solid ${palette.success[400]};
	background-color: #e9f3ed;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
`;

const iconWrapperCss = css`
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		fill: ${palette.success[400]};
		width: ${space[8]}px;
		height: ${space[8]}px;
	}
`;

const bodyCss = css`
	flex: 1;
	${textSans17};
	line-height: 1.35;

	strong {
		${textSansBold17};
	}
`;

const ToastBody = ({ children }: { children: string }) => (
	<div css={bodyCss}>{children}</div>
);

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

	// Currently only success is styled, other severities can be added when needed.
	const icon = <SvgTickRound />;

	return (
		<div css={containerCss} aria-live="polite">
			<div css={toastCss} role="status">
				<div css={iconWrapperCss}>{icon}</div>
				{typeof current.message === 'string' ? (
					<ToastBody>{current.message}</ToastBody>
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

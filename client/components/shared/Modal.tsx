import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useState } from 'react';

export type HideFunction = () => void;

const containerCss = css`
	background: ${palette.neutral[100]};
	padding: 15px;
	font-size: 16px;
	max-width: 600px;
	max-height: calc(100vh - 20px);
	overflow: auto;
	margin: 10px;
	border-radius: 5px;
	position: relative;
	color: initial;
	font-weight: initial;
`;

interface ModalProps {
	instigator: React.ReactNode;
	title: string;
	children: React.ReactNode;
	additionalButton?: (hideFunction: HideFunction) => React.ReactElement;
	alternateOkText?: string;
	extraOnHideFunctionality?: () => void;
	containerCssOverrides?: SerializedStyles;
	hideCloseButton?: boolean;
}

export const Modal = (props: ModalProps) => {
	const [isDisplayed, setIsDisplayed] = useState(props.instigator == null);

	const hide = () => {
		setIsDisplayed(false);
		if (props.extraOnHideFunctionality) {
			props.extraOnHideFunctionality();
		}
	};

	return (
		<>
			<div
				css={{ display: 'inline-block' }}
				onClick={() => setIsDisplayed(true)}
			>
				{props.instigator}
			</div>
			{isDisplayed && (
				<div
					css={{
						zIndex: 9999,
						position: 'fixed',
						transition: 'opacity 400ms ease-in',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						background: 'rgba(192,192,192,0.5)',
					}}
					onClick={hide}
				>
					<div
						css={[containerCss, props.containerCssOverrides]}
						onClick={(e) => e.stopPropagation()}
					>
						{!props.hideCloseButton && (
							<span
								onClick={hide}
								css={{
									position: 'absolute',
									top: '5px',
									right: '5px',
									cursor: 'pointer',
								}}
							>
								<svg width="30" height="30">
									<path d="M21 9.8l-.8-.8-5.2 4.8-5.2-4.8-.8.8 4.8 5.2-4.8 5.2.8.8 5.2-4.8 5.2 4.8.8-.8-4.8-5.2 4.8-5.2" />
								</svg>
							</span>
						)}
						<h2 css={{ fontWeight: 900, marginTop: 0 }}>
							{props.title}
						</h2>
						{props.children}
						<div css={{ textAlign: 'right' }}>
							{props.additionalButton &&
								props.additionalButton(hide)}
							<Button onClick={hide}>
								{props.alternateOkText || 'Ok'}
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

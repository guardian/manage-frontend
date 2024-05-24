import { css } from '@emotion/react';
import { textSans } from '@guardian/source/foundations';
import { Spinner } from '../../shared/Spinner';

const overlay = css`
	z-index: 10000;
	display: block;
	border: 0 none transparent;
	overflow-x: hidden;
	overflow-y: auto;
	visibility: visible;
	margin: 0;
	padding: 0;
	-webkit-tap-highlight-color: transparent;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	${textSans.medium()};
`;

const overlayDialog = css`
	font-size: 20px;
	line-height: 28px;
	position: relative;
	display: inline-block;
	color: white;
	top: 50%;
	transform: translateY(-50%);
`;

const overlayMessage = css`
	text-align: center;
`;

const overlayMessageBackground = css`
	z-index: -1;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.6);
`;

export interface OverlayLoaderProps {
	message: string;
}

export function OverlayLoader(props: OverlayLoaderProps) {
	return (
		<div css={overlay}>
			<div css={overlayDialog}>
				<Spinner alignCenter />
				<div css={overlayMessage}>{props.message}</div>
			</div>
			<div css={overlayMessageBackground} />
		</div>
	);
}

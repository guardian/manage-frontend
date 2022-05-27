import * as React from 'react';
import {
	Props,
	SvgAlertTriangle,
	SvgInfo,
} from '@guardian/source-react-components';
import { css, SerializedStyles } from '@emotion/react';
import {
	space,
	brand as brandColors,
	text,
	error as errorColors,
	size,
	textSans,
} from '@guardian/source-foundations';

interface SummaryProps extends Props {
	/**
	 * The main message of the component
	 * e.g. the main error message, success message etc.
	 */
	message: string;
	/**
	 * Optional context information about the message
	 */
	context?: React.ReactNode;
}

interface ErrorSummaryProps extends SummaryProps {
	/**
	 * The error report link URL
	 */
	errorReportUrl?: string;
}

const wrapperStyles = (color: string): SerializedStyles => css`
	border: 4px solid ${color};
	padding: ${space[1]}px;
	display: flex;
`;

const iconStyles = (color: string): SerializedStyles => css`
	display: flex;
	flex: 0 1 auto;
	margin-top: 1px;
	svg {
		fill: ${color};
		height: ${size.xsmall}px;
		width: ${size.xsmall}px;
	}
`;

const messageStyles = (color: string, isBold = true): SerializedStyles => css`
	${textSans.medium({ fontWeight: isBold ? 'bold' : 'regular' })}
	color: ${color};
`;

const messageWrapperStyles = css`
	margin-left: ${space[1]}px;
`;

const contextStyles = css`
	${textSans.medium()}
`;

export const ErrorSummary = ({
	message,
	errorReportUrl,
	context,
	cssOverrides,
	...props
}: ErrorSummaryProps): JSX.Element => (
	<div css={[wrapperStyles(errorColors[400]), cssOverrides]} {...props}>
		<div css={iconStyles(errorColors[400])}>
			<SvgAlertTriangle />
		</div>
		<div css={messageWrapperStyles}>
			<div css={messageStyles(errorColors[400])}>{message}</div>
			{errorReportUrl && (
				<a
					css={messageStyles(errorColors[400], false)}
					href={errorReportUrl}
				>
					Report this error
				</a>
			)}
			{context && <div css={contextStyles}>{context}</div>}
		</div>
	</div>
);

type InfoSummaryProps = SummaryProps;

export const InfoSummary = ({
	message,
	context,
	cssOverrides,
	...props
}: InfoSummaryProps): JSX.Element => (
	<div css={[wrapperStyles(brandColors[500]), cssOverrides]} {...props}>
		<div css={iconStyles(brandColors[500])}>
			<SvgInfo />
		</div>
		<div css={messageWrapperStyles}>
			<div css={messageStyles(text.primary)}>{message}</div>
			{context && <div css={contextStyles}>{context}</div>}
		</div>
	</div>
);

import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source/foundations';
import type { ReactNode } from 'react';

export const Card = (props: { children: ReactNode }) => {
	return <div>{props.children}</div>;
};

Card.Header = (props: {
	children: ReactNode;
	backgroundColor?: string;
	minHeightOverride?: string;
}) => {
	const headerCss = css`
		position: relative;
		padding: ${space[3]}px;
		padding-bottom: ${space[6]}px;
		min-height: ${props.minHeightOverride ?? '64px'};
		background-color: ${props.backgroundColor ?? palette.neutral[97]};
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;

		${from.tablet} {
			min-height: auto;
			padding-bottom: ${space[8]}px;
		}
	`;

	return <header css={headerCss}>{props.children}</header>;
};

Card.Section = (props: {
	children: ReactNode;
	backgroundColor?: string;
	removeBorders?: boolean;
}) => {
	const sectionCss = css`
		padding: ${space[4]}px ${space[3]}px;
		border: ${props.removeBorders
			? 'none'
			: `1px solid ${palette.neutral[86]}`};
		border-top: none;
		:last-of-type {
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}

		${props.backgroundColor &&
		`
			background-color: ${props.backgroundColor};
		`}
	`;

	return <div css={sectionCss}>{props.children}</div>;
};

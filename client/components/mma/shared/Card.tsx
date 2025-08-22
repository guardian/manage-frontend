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
		padding: ${space[3]}px ${space[4]}px;
		min-height: ${props.minHeightOverride ?? '64px'};
		background-color: ${props.backgroundColor ?? palette.neutral[97]};
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		${from.tablet} {
			border-radius: 0;
			min-height: auto;
		}
	`;

	return <header css={headerCss}>{props.children}</header>;
};

Card.Section = (props: { children: ReactNode; backgroundColor?: string }) => {
	const sectionCss = css`
		padding: ${space[5]}px ${space[4]}px;
		border: 1px solid ${palette.neutral[86]};
		border-top: none;
		:last-of-type {
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
			${from.tablet} {
				border-radius: 0;
			}
		}

		${props.backgroundColor &&
		`
			background-color: ${props.backgroundColor};
		`}
	`;

	return <div css={sectionCss}>{props.children}</div>;
};

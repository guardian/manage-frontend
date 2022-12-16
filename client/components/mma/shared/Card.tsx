import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source-foundations';
import type { ReactNode } from 'react';

export const Card = (props: { children: ReactNode }) => {
	return <div>{props.children}</div>;
};

Card.Header = (props: {
	children: ReactNode;
	backgroundColor?: string;
	cssOverrides?: SerializedStyles | SerializedStyles[];
}) => {
	const headerCss = css`
		padding: ${space[3]}px ${space[4]}px;
		min-height: 64px;
		background-color: ${props.backgroundColor ?? palette.neutral[97]};

		${from.tablet} {
			min-height: 128px;
		}
	`;

	return (
		<header css={[headerCss, props.cssOverrides]}>{props.children}</header>
	);
};

Card.Section = (props: { children: ReactNode; backgroundColor?: string }) => {
	const sectionCss = css`
		padding: ${space[5]}px ${space[4]}px;
		border: 1px solid ${palette.neutral[86]};
		border-top: none;
		${props.backgroundColor &&
		`
			background-color: ${props.backgroundColor};
		`}
	`;

	return <div css={sectionCss}>{props.children}</div>;
};

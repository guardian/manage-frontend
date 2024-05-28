import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	textSansBold20,
	textSansBold24,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';

interface HeadingProps {
	children: ReactNode;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	level?: '1' | '2' | '3' | '4';
	sansSerif?: boolean;
	borderless?: boolean;
}

export const Heading = (props: HeadingProps) => {
	const dividerStyles = props.borderless
		? css``
		: css`
				border-top: 1px solid ${palette.neutral[86]};
		  `;

	const headingStyles = css`
		${props.sansSerif ? textSansBold20 : headlineBold24};
		margin-top: 0;
		margin-bottom: 0;
		${from.tablet} {
			${props.sansSerif ? textSansBold24 : headlineBold28};
		} ;
	`;

	const HeadingElement: keyof JSX.IntrinsicElements = `h${props.level ?? 2}`;

	return (
		<div css={dividerStyles}>
			<HeadingElement css={[headingStyles, props.cssOverrides]}>
				{props.children}
			</HeadingElement>
		</div>
	);
};

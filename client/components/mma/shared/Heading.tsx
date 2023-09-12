import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	textSans,
} from '@guardian/source-foundations';
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
		${props.sansSerif
			? textSans.large({ fontWeight: 'bold' })
			: headline.xsmall({ fontWeight: 'bold' })};

		margin-top: 0;
		margin-bottom: 0;
		${from.tablet} {
			${props.sansSerif
				? textSans.xlarge({ fontWeight: 'bold' })
				: headline.small({ fontWeight: 'bold' })};
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

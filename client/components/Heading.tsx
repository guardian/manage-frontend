import { css, SerializedStyles } from '@emotion/react';
import { from, headline, palette } from '@guardian/source-foundations';
import { ReactNode } from 'react';

interface HeadingProps {
	children: ReactNode;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	level?: '1' | '2' | '3' | '4';
}

export const Heading = (props: HeadingProps) => {
	const dividerStyles = css`
		border-top: 1px solid ${palette.neutral[86]};
	`;

	const headingStyles = css`
		${headline.xsmall({ fontWeight: 'bold' })};
		margin-top: 0;
		margin-bottom: 0;
		${from.tablet} {
			${headline.small({ fontWeight: 'bold' })};
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
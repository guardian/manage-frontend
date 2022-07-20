import { css, SerializedStyles } from '@emotion/react';
import { from, headline, palette } from '@guardian/source-foundations';
import { ReactNode } from 'react';
import { measure } from '../styles/typography';

interface HeadingProps {
	children: ReactNode;
	measure?: 'regular' | 'medium';
	cssOverrides?: SerializedStyles;
}

export const Heading = (props: HeadingProps) => {
	const containerStyles = css`
		border-top: 1px solid ${palette.neutral[86]};
	`;

	const headingStyles = css`
		${headline.xsmall({ fontWeight: 'bold' })};
		margin-top: 0;
		margin-bottom: 0;
		${props.measure && measure[props.measure]}
		${from.tablet} {
			${headline.small({ fontWeight: 'bold' })};
		} ;
	`;

	return (
		<div css={[containerStyles, props.cssOverrides]}>
			<h2 css={headingStyles}>{props.children}</h2>
		</div>
	);
};

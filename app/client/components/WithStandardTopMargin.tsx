import { css } from '@emotion/react';
import * as React from 'react';

export interface WithStandardTopMarginProps {
	children: React.ReactNode;
}
export const WithStandardTopMargin = (props: WithStandardTopMarginProps) => (
	// TODO: could this component with it's funky margin value be replaced with a design systems component/token
	<div
		css={css`
			margin-top: 1.8125rem;
		`}
	>
		{props.children}
	</div>
);

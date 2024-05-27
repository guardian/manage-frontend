import { css } from '@emotion/react';
import { palette, space, textSans17 } from '@guardian/source/foundations';
import type * as React from 'react';
import { InfoIconDark } from './assets/InfoIconDark';

interface InfoSectionProps {
	children: React.ReactNode;
}

export const InfoSection = (props: InfoSectionProps) => (
	<p
		css={css`
			${textSans17};
			background-color: ${palette.neutral[97]};
			padding: ${space[5]}px ${space[5]}px ${space[5]}px 49px;
			margin-bottom: 12px;
			position: relative;
		`}
	>
		<i
			css={css`
				width: 17px;
				height: 17px;
				position: absolute;
				top: ${space[5]}px;
				left: ${space[5]}px;
			`}
		>
			<InfoIconDark fillColor={palette.brand[500]} />
		</i>
		{props.children}
	</p>
);

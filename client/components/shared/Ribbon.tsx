import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, space, textSansBold17 } from '@guardian/source/foundations';
import type { ReactElement } from 'react';

type IconSide = 'left' | 'right';

const ribbonShapeCss = (
	backgroundColor: string,
	copyColour: string,
	iconSide?: IconSide,
	additionalCss?: SerializedStyles,
) => css`
		display: inline-flex;
		${textSansBold17};
		color: ${copyColour};
		background-color: ${backgroundColor};
		--r: 0.8em;
		padding-left: calc(var(--r) + ${space[iconSide === 'left' ? 2 : 5]}px);
		padding-right: ${space[5]}px;
		line-height: 1.8;
		clip-path: polygon(100vw 0, 0 0, var(--r) 50%, 0 100%, 100vw 100%);
		border-image: conic-gradient(#000000 0 0) fill 0 //100vw;;
		width: fit-content;
		${additionalCss}
`;

export const Ribbon = ({
	copy,
	ribbonColour,
	copyColour,
	icon,
	iconSide,
	additionalCss,
}: {
	copy: string;
	ribbonColour?: string;
	copyColour?: string;
	icon?: ReactElement;
	iconSide?: IconSide;
	additionalCss?: SerializedStyles;
}) => {
	return (
		<div
			css={ribbonShapeCss(
				ribbonColour || palette.neutral[10],
				copyColour || palette.neutral[100],
				icon && (iconSide || 'left'),
				additionalCss,
			)}
		>
			{iconSide !== 'right' && icon}
			{copy}
			{iconSide === 'right' && icon}
		</div>
	);
};

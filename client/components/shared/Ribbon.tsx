import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, space, textSansBold17 } from '@guardian/source/foundations';
import type { ReactElement } from 'react';

type IconSide = 'left' | 'right';

const ribbonTailCss = css`
	clip-path: polygon(100vw 0, 0 0, var(--r) 50%, 0 100%, 100vw 100%);
	border-image: conic-gradient(var(--ribbonColour) 0 0) fill 0; //100vw;
`;

const ribbonIconLeft = css`
	padding-left: calc(var(--r) + ${space[5]}px);
`;

const ribbonShapeCss = css`
	display: inline-flex;
	${textSansBold17};
	color: var(--copyColour);
	background-color: var(--ribbonColour);
	--r: 0.8em;
	padding-left: calc(var(--r) + ${space[2]}px);
	padding-right: ${space[5]}px;
	line-height: 1.8;
	width: fit-content;
`;

const ribbonRoundedCornersLeftCss = css`
	border-top-left-radius: ${space[1]}px;
	border-bottom-left-radius: ${space[1]}px;
`;

const ribbonRoundedCornersRightCss = css`
	border-top-right-radius: ${space[1]}px;
	border-bottom-right-radius: ${space[1]}px;
`;

export const Ribbon = ({
	copy,
	ribbonColour,
	copyColour,
	icon,
	iconSide,
	withoutTail,
	roundedCornersLeft,
	roundedCornersRight,
	additionalCss,
}: {
	copy: string;
	ribbonColour?: string;
	copyColour?: string;
	icon?: ReactElement;
	iconSide?: IconSide;
	withoutTail?: true;
	roundedCornersLeft?: true;
	roundedCornersRight?: true;
	additionalCss?: SerializedStyles;
}) => {
	return (
		<div
			css={[
				ribbonShapeCss,
				roundedCornersLeft && ribbonRoundedCornersLeftCss,
				roundedCornersRight && ribbonRoundedCornersRightCss,
				icon && iconSide === 'left' && ribbonIconLeft,
				!withoutTail && ribbonTailCss,
				additionalCss,
			]}
			style={{
				['--ribbonColour' as string]:
					ribbonColour || palette.neutral[10],
				['--copyColour' as string]: copyColour || palette.neutral[100],
			}}
		>
			{iconSide !== 'right' && icon}
			{copy}
			{iconSide === 'right' && icon}
		</div>
	);
};

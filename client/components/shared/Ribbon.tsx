import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import type { ReactElement } from 'react';

const ribbonShapeCss = (backgroundColor: string, copyColour: string) => css`
	${textSans.medium()};
	font-weight: bold;
	color: ${copyColour};
	background-color: ${backgroundColor};
	--r: 0.8em;
	padding-left: calc(var(--r) + ${space[5]}px);
	padding-right: ${space[5]}px;
	line-height: 1.8;
	clip-path: polygon(100vw 0, 0 0, var(--r) 50%, 0 100%, 100vw 100%);
	border-image: conic-gradient(#2699dc 0 0) fill 0 //100vw;;
	width: fit-content;
`;

export const Ribbon = ({
	copy,
	ribbonColour,
	copyColour,
	icon,
}: {
	copy: string;
	ribbonColour?: string;
	copyColour?: string;
	icon?: ReactElement;
}) => {
	return (
		<div
			css={ribbonShapeCss(
				ribbonColour || palette.neutral[10],
				copyColour || palette.neutral[100],
			)}
		>
			{icon}
			{copy}
		</div>
	);
};

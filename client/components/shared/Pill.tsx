import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSansBold15,
} from '@guardian/source/foundations';

interface PillProps {
	copy: string;
	colour?: string;
	copyColour?: string;
	sharpLeftSide?: boolean;
	sharpRightSide?: boolean;
	sharpLeftSideMobileOnly?: boolean;
	sharpRightSideMobileOnly?: boolean;
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	display: block;
	margin: 0;
	padding: ${space[0]}px ${space[2]}px;
	${textSansBold15}
`;

export const Pill = ({
	copy,
	colour,
	copyColour,
	additionalCss,
	sharpLeftSide,
	sharpRightSide,
	sharpLeftSideMobileOnly,
	sharpRightSideMobileOnly,
}: PillProps) => {
	const brLeftMobile =
		sharpLeftSide || sharpLeftSideMobileOnly ? 0 : space[1];
	const brRightMobile =
		sharpRightSide || sharpRightSideMobileOnly ? 0 : space[1];
	const brLeft = sharpLeftSide ? 0 : space[1];
	const brRight = sharpRightSide ? 0 : space[1];

	return (
		<span
			css={[
				containerCss,
				css`
					border-radius: ${brLeftMobile}px ${brRightMobile}px
						${brRightMobile}px ${brLeftMobile}px;
					background-color: ${colour || palette.neutral[0]};
					color: ${copyColour || palette.neutral[100]};
					${from.tablet} {
						border-radius: ${brLeft}px ${brRight}px;
					}
				`,
				additionalCss,
			]}
		>
			{copy}
		</span>
	);
};

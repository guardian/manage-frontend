import type { SerializedStyles } from '@emotion/react';
import { palette } from '@guardian/source/foundations';

interface ProfileIconProps {
	additionalCss?: SerializedStyles;
	overrideFillColor?: string;
}

export const ProfileIcon = (props: ProfileIconProps) => (
	<svg
		width="16"
		height="19"
		viewBox="0 0 16 19"
		fill="none"
		css={props.additionalCss}
	>
		<path
			d="M8.00001 7.69047C9.62222 7.69047 11.5333 5.8357 11.5333 3.57381C11.5333 1.31191 10.2222 0 8.00001 0C5.77779 0 4.48888 1.31191 4.48888 3.57381C4.48888 5.8357 6.55556 7.69047 8.00001 7.69047ZM2.66667 10.3821L1.75556 11.3095L0 18.0952L0.866666 19H15.0889L16 18.0952L14.2222 11.3095L13.3334 10.3821C11.5556 9.81665 9.93335 9.50001 8.00001 9.50001C6.04445 9.50001 4.44445 9.77143 2.66667 10.3821Z"
			fill={props.overrideFillColor || palette.brand[400]}
		/>
	</svg>
);

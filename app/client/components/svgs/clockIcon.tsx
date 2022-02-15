import { SerializedStyles } from '@emotion/core';
import React from 'react';

interface ClockIconProps {
	additionalCss?: SerializedStyles;
}

export const ClockIcon = (props: ClockIconProps) => (
	<svg
		width="13"
		height="13"
		viewBox="0 0 13 13"
		fill="none"
		css={props.additionalCss}
	>
		<path
			d="M6.5 0C2.91015 0 0 2.91017 0 6.5C0 10.0898 2.91015 13 6.5 13C10.0899 13 13 10.0898 13 6.5C13 2.91017 10.0899 0 6.5 0ZM6.5 2.40741C6.76592 2.40741 6.98148 2.62297 6.98148 2.88889V6.22166L9.44907 7.65103C9.67934 7.78401 9.76259 8.07526 9.62963 8.30556C9.49667 8.53585 9.19791 8.61156 8.96759 8.4786C8.06612 7.95764 7.15701 7.43213 6.25926 6.91379C6.11556 6.83047 6.01852 6.67805 6.01852 6.5V2.88889C6.01852 2.62297 6.23408 2.40741 6.5 2.40741Z"
			fill="#333333"
		/>
	</svg>
);

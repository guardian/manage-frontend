import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

interface TickInCircleProps {
	fill?: string;
	additionalCss?: SerializedStyles;
}

export const TickInCircle = (props: TickInCircleProps) => (
	<svg
		width="22"
		height="22"
		viewBox="0 0 22 22"
		fill="none"
		css={[
			css`
				vertical-align: top;
			`,
			props.additionalCss,
		]}
	>
		<circle cx="11" cy="11" r="11" fill={props.fill || '#22874D'} />
		<path
			d="M6.59203 10.8413L6.50369 10.757L6.4173 10.8433L5.91161 11.349L5.83674 11.4239L5.89828 11.5101L8.42673 15.0499L8.46412 15.1022H8.52844H8.76865H8.82169L8.85854 15.0641L16.0899 7.5799L16.1764 7.49042L16.0873 7.40355L15.5816 6.9105L15.4975 6.82848L15.4104 6.90737L8.7709 12.9228L6.59203 10.8413Z"
			fill="white"
			stroke="white"
			strokeWidth="0.25"
		/>
	</svg>
);

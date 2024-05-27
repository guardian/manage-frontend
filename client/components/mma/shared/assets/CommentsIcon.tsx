import { palette } from '@guardian/source/foundations';

interface CommentsIconProps {
	overrideFillColor?: string;
}

export const CommentsIcon = (props: CommentsIconProps) => (
	<svg
		width="18"
		height="17"
		viewBox="0 0 18 17"
		fill="none"
		css={{ marginTop: '4px' }}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.9999 1.49999L16.4999 0H1.49999L0 1.49999V10.5L1.475 12H3.99999V16.9999H4.97498L7.99997 12H16.4999L17.9999 10.5V1.49999Z"
			fill={props.overrideFillColor || palette.brand[400]}
		/>
	</svg>
);

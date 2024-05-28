import { neutral } from '@guardian/source/foundations';

interface ThumbsUpIconProps {
	overrideFillColor?: string;
	invertIcon?: boolean;
}

export const ThumbsUpIcon = (props: ThumbsUpIconProps) => (
	<svg width="20" height="24" viewBox="0 0 20 24" fill="none">
		<g {...(props.invertIcon && { transform: 'rotate(175 10 12)' })}>
			<path
				d="M19.2261 13.3474L16.3955 22.7067L15.3096 23.4317L0 21.1823V8.70523L5.22193 7.68963L12.9156 0H14.0028L15.959 1.95889L12.9142 7.76327H12.9859L20 8.64029"
				fill={props.overrideFillColor || neutral[100]}
			/>
		</g>
	</svg>
);

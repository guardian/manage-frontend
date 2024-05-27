import { palette } from '@guardian/source/foundations';

interface OtherIconProps {
	overrideFillColor?: string;
}

export const OtherIcon = (props: OtherIconProps) => (
	<svg width="30" height="30" viewBox="0 0 30 30" fill="none">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.99998 13.7L9.29999 13H5.7L5 13.7V17.3L5.7 18H9.29999L9.99998 17.3V13.7ZM17.4 13.7L16.7 13H13.1L12.4 13.7V17.3L13.1 18H16.7L17.4 17.3V13.7ZM24.7999 13.7L24.0999 13H20.4999L19.7999 13.7V17.3L20.4999 18H24.0999L24.7999 17.3V13.7Z"
			fill={props.overrideFillColor || palette.brand[400]}
		/>
	</svg>
);

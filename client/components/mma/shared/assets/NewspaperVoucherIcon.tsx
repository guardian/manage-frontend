import { palette } from '@guardian/source/foundations';

interface NewspaperVoucherIconProps {
	overrideFillColor?: string;
}

export const NewspaperVoucherIcon = (props: NewspaperVoucherIconProps) => (
	<svg width="16" height="18" viewBox="0 0 15 18" fill="none">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15.1579 17.1L14.2342 18H0.947368L0 17.1V0.9L0.947368 0H11.3921L15.1579 3.6V17.1Z"
			fill={props.overrideFillColor || palette.brand[400]}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.263 5.6842H1.89453V6.63157H13.263V5.6842Z"
			fill="#052962"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.263 8.52631H1.89453V9.47367H13.263V8.52631Z"
			fill="#052962"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.52611 11.3684H1.89453V12.3158H8.52611V11.3684Z"
			fill="#052962"
		/>
	</svg>
);

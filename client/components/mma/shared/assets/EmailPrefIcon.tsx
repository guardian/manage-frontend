import { palette } from '@guardian/source/foundations';

interface EmailPrefsIconProps {
	overrideFillColor?: string;
}

export const EmailPrefsIcon = (props: EmailPrefsIconProps) => (
	<svg width="19" height="13" viewBox="0 0 19 13" fill="none">
		<path
			d="M1.35714 0L0 1.35714L8.59524 7.69048H10.4048L19 1.35714L17.6429 0H1.35714Z"
			fill={props.overrideFillColor || palette.brand[400]}
		/>
		<path
			d="M0 11.3096V2.71436L8.59524 9.04769H10.4048L19 2.71436V11.3096L17.6429 12.6667H1.35714L0 11.3096Z"
			fill={props.overrideFillColor || palette.brand[400]}
		/>
	</svg>
);

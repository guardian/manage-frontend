import { brand } from '@guardian/source/foundations';

interface CreditCardIconProps {
	overrideFillColor?: string;
}
export const CreditCardIcon = (props: CreditCardIconProps) => (
	<svg fill="none" viewBox="0 0 22 14.4737" width="19" height="13">
		<path
			fill={props.overrideFillColor || brand[400]}
			d="M 22,1.80921 20.1666,0 H 1.83333 L 0,1.80921 V 3.4737 H 22 Z M 22,5.5 H 0 v 7.1644 l 1.80277,1.8093 H 20.1666 L 22,12.6644 Z M 4.63158,11 H 6.9224 V 9.8421 H 4.63158 Z m 5.77282,0 H 8.1136 V 9.8421 h 2.2908 z m 1.1912,0 h 2.2908 V 9.8421 h -2.2908 z m 5.7728,0 H 15.0776 V 9.8421 h 2.2908 z"
			clipRule="evenodd"
			fillRule="evenodd"
		/>
	</svg>
);

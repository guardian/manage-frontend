import { brand } from '@guardian/source-foundations';

interface ShieldIconProps {
	overrideFillColor?: string;
}
export const ShieldIcon = (props: ShieldIconProps) => (
	<svg
		width="21"
		height="21"
		viewBox="0 0 21 21"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill={props.overrideFillColor || brand[400]}
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6.78411 6.08778C6.78411 4.03139 8.45114 2.36437 10.5075 2.36437C12.5639 2.36437 14.2309 4.03139 14.2309 6.08778H15.7203C15.7203 3.20884 13.3865 0.875 10.5075 0.875C7.62859 0.875 5.29475 3.20884 5.29475 6.08778H6.78411ZM5.29473 6.08779L5.29473 7.94949L4.55005 8.69417V17.6303L5.29473 18.375H15.7203L16.4649 17.6303V8.69417L15.7203 7.94953V6.08779H14.2309V7.94949H6.78409V6.08779H5.29473ZM11.6245 12.0452C11.6245 12.5316 11.3137 12.9454 10.8798 13.0987V14.6516H10.1352V13.0987C9.7013 12.9454 9.39046 12.5316 9.39046 12.0452C9.39046 11.4283 9.89056 10.9282 10.5075 10.9282C11.1244 10.9282 11.6245 11.4283 11.6245 12.0452Z"
			// fill="#052962"
		/>
	</svg>

	// <svg fill="none" viewBox="0 0 22 14.4737" width="19" height="13">
	// 	<path
	// 		fill={props.overrideFillColor || brand[400]}
	// 		d="M 22,1.80921 20.1666,0 H 1.83333 L 0,1.80921 V 3.4737 H 22 Z M 22,5.5 H 0 v 7.1644 l 1.80277,1.8093 H 20.1666 L 22,12.6644 Z M 4.63158,11 H 6.9224 V 9.8421 H 4.63158 Z m 5.77282,0 H 8.1136 V 9.8421 h 2.2908 z m 1.1912,0 h 2.2908 V 9.8421 h -2.2908 z m 5.7728,0 H 15.0776 V 9.8421 h 2.2908 z"
	// 		clipRule="evenodd"
	// 		fillRule="evenodd"
	// 	/>
	// </svg>
);

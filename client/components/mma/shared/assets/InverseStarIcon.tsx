import { iconSize } from '@guardian/source-foundations';
import type { IconProps } from '@guardian/source-react-components';

export const InverseStarIcon = ({ size }: IconProps) => {
	return (
		<svg
			width={size ? iconSize[size] : undefined}
			height={undefined}
			viewBox="-3 -3 30 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M20.1693 11.2956C20.1693 16.3581 16.0651 20.4622 11.0026 20.4622C5.9401 20.4622 1.83594 16.3581 1.83594 11.2956C1.83594 6.23307 5.9401 2.12891 11.0026 2.12891C16.0651 2.12891 20.1693 6.23307 20.1693 11.2956Z"
				fill="#0077B6"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.4539 17.5181L13.9424 12.5945L17.8594 9.52595L17.6643 8.86716H12.821L11.3257 3.96094H10.6431L9.16404 8.86716H4.30441L4.10938 9.52595L8.02634 12.5945L6.54732 17.5181L7.05116 17.9341L10.9844 14.8656L14.9176 17.9341L15.4539 17.5181Z"
				fill="white"
			/>
		</svg>
	);
};

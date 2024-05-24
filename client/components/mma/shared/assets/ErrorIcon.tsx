import type { SerializedStyles } from '@emotion/react';
import { brandAlt, news } from '@guardian/source/foundations';

interface ErrorIconProps {
	fill?: string;
	additionalCss?: SerializedStyles;
	downgradeToWarning?: true;
}

export const ErrorIcon = (props: ErrorIconProps) => (
	<svg
		width="21"
		height="17"
		viewBox="0 0 21 17"
		fill="none"
		css={props.additionalCss}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.9375 0L0 16.1095L0.6375 17H20.3625L21 16.1095L11.0625 0H9.9375ZM9.87661 11.5012H11.1234L11.7162 4.96907L10.8986 4.28147H10.1015L9.28386 4.96907L9.87661 11.5012ZM10.5 12.7045C11.1689 12.7045 11.7162 13.246 11.7162 13.9078C11.7162 14.5696 11.1689 15.1111 10.5 15.1111C9.83114 15.1111 9.28386 14.5696 9.28386 13.9078C9.28386 13.246 9.83114 12.7045 10.5 12.7045Z"
			fill={
				props.fill ||
				(props.downgradeToWarning ? brandAlt['300'] : news['400'])
			}
		/>
	</svg>
);

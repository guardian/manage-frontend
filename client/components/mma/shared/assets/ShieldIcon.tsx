import { brand } from '@guardian/source/foundations';

interface ShieldIconProps {
	overrideFillColor?: string;
}
export const ShieldIcon = (props: ShieldIconProps) => (
	<svg
		width="21"
		// height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.4612 2.05194C13.1212 2.48798 14.3418 3.27797 15.7739 4.12183C17.0986 4.87827 18.4847 5.5201 19.9173 6.0404L20.3429 6.66624C19.7899 10.865 18.8139 14.2995 17.4201 16.8875C16.146 19.2575 14.5712 20.917 12.5963 21.9481H12.0051V2.05194H12.4663M13.0805 0H10.9247C10.9247 0 9.2887 1.11831 7.19152 2.34947C5.78466 3.1462 4.30499 3.805 2.7729 4.31677L1.53192 6.15069C2.67862 15.9359 5.90976 21.648 10.9247 24H13.0754C18.0902 21.648 21.3214 15.9359 22.4681 6.15069L21.2297 4.31677C19.6966 3.80527 18.2161 3.14647 16.8085 2.34947C14.7113 1.11831 13.0754 0 13.0754 0H13.0805Z"
			fill={props.overrideFillColor || brand[400]}
			clipRule="evenodd"
			fillRule="evenodd"
		/>
	</svg>
);

import { from, neutral } from '@guardian/source/foundations';

interface SignoutIconProps {
	overrideFillColor?: string;
	overrideWidthAtDesktop?: number;
}

export const SignoutIcon = (props: SignoutIconProps) => (
	<svg
		width="19"
		viewBox="0 0 20 22"
		fill="none"
		css={
			props.overrideWidthAtDesktop && {
				[from.desktop]: {
					width: `${props.overrideWidthAtDesktop}px`,
				},
			}
		}
	>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.875 16.475l-.875-.9L16.725 12H8v-2h8.725L14 6.425l.875-.875L20 10.65v.7l-5.125 5.125zM11 21v1H1.025L0 20.975v-20L1.025 0H11v1l-1 1H2v18h8l1 1z"
				fill={props.overrideFillColor || neutral[100]}
				className="icon--fill"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path
					fill={props.overrideFillColor || neutral[100]}
					d="M0 0h20v22H0z"
				/>
			</clipPath>
		</defs>
	</svg>
);

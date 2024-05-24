import { brand } from '@guardian/source/foundations';

interface AccountOverviewIconProps {
	overrideFillColor?: string;
}

export const AccountOverviewIcon = (props: AccountOverviewIconProps) => (
	<svg width="17" height="19" viewBox="0 0 17 19" fill="none">
		<path
			d="M15.1263 19L16.1 18V7.37498L8.89425 0H7.72576L0.52002 7.37498V18L1.49377 19H5.87561V12.5H10.7444V19H15.1263Z"
			fill={props.overrideFillColor || brand[400]}
		/>
	</svg>
);

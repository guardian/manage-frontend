import { css } from '@emotion/react';
import { space, brand, neutral, textSans } from '@guardian/source-foundations';
import {
	SupportTheGuardianButton,
	SupportTheGuardianButtonProps,
} from '../supportTheGuardianButton';

export interface SupportTheGuardianSectionProps
	extends SupportTheGuardianButtonProps {
	message: string;
}

export const SupportTheGuardianSection = (
	props: SupportTheGuardianSectionProps,
) => (
	<>
		<p
			css={css`
				${textSans.medium()}
				margin-top: ${space[6]}px;
			`}
		>
			{props.message}
		</p>
		<SupportTheGuardianButton
			fontWeight="bold"
			textColour={neutral[100]}
			colour={brand[400]}
			notPrimary
			{...props}
		/>
	</>
);
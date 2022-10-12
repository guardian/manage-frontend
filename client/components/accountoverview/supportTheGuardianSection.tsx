import { css } from '@emotion/react';
import { brand, neutral, space, textSans } from '@guardian/source-foundations';
import type { SupportTheGuardianButtonProps } from '../supportTheGuardianButton';
import { SupportTheGuardianButton } from '../supportTheGuardianButton';

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

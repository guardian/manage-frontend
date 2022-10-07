import { palette } from '@guardian/source-foundations';
import { Inline } from '@guardian/source-react-components';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SupportTheGuardianButton } from './supportTheGuardianButton';

export default {
	title: 'Components/SupportTheGuardianButton',
	component: SupportTheGuardianButton,
} as ComponentMeta<typeof SupportTheGuardianButton>;

export const Default: ComponentStory<typeof SupportTheGuardianButton> = () => (
	<Inline space={4}>
		<SupportTheGuardianButton supportReferer="storybook" />
		<SupportTheGuardianButton
			supportReferer="storybook"
			alternateButtonText="Subscribe"
			fontWeight="bold"
		/>
		<SupportTheGuardianButton
			supportReferer="storybook"
			fontWeight="bold"
			textColour={palette.neutral[100]}
			colour={palette.brand[400]}
			notPrimary
		/>
		<SupportTheGuardianButton
			supportReferer="storybook"
			fontWeight="bold"
			height="42px"
			textColour={palette.neutral[100]}
			colour={palette.brand[400]}
			notPrimary
		/>
		<SupportTheGuardianButton
			supportReferer="storybook"
			alternateButtonText="Make a recurring contribution"
			fontWeight="bold"
			height="42px"
			notPrimary
		/>
	</Inline>
);

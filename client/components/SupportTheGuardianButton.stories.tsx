import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { SupportTheGuardianButton } from './SupportTheGuardianButton';

export default {
	title: 'Components/SupportTheGuardianButton',
	component: SupportTheGuardianButton,
} as ComponentMeta<typeof SupportTheGuardianButton>;

export const Default: ComponentStory<typeof SupportTheGuardianButton> = () => (
	<SupportTheGuardianButton supportReferer="storybook" />
);

export const WithSmallSize: ComponentStory<
	typeof SupportTheGuardianButton
> = () => <SupportTheGuardianButton supportReferer="storybook" size="small" />;

export const WithBrandTheme: ComponentStory<
	typeof SupportTheGuardianButton
> = () => <SupportTheGuardianButton supportReferer="storybook" theme="brand" />;

export const WithBrandAltTheme: ComponentStory<
	typeof SupportTheGuardianButton
> = () => (
	<SupportTheGuardianButton supportReferer="storybook" theme="brandAlt" />
);

export const WithAlternateButtonText: ComponentStory<
	typeof SupportTheGuardianButton
> = () => (
	<SupportTheGuardianButton
		supportReferer="storybook"
		alternateButtonText="Make a recurring contribution"
		theme="brandAlt"
	/>
);

import type { Meta, StoryFn } from '@storybook/react';
import { SupportTheGuardianButton } from './SupportTheGuardianButton';

export default {
	title: 'Components/SupportTheGuardianButton',
	component: SupportTheGuardianButton,
} as Meta<typeof SupportTheGuardianButton>;

export const Default: StoryFn<typeof SupportTheGuardianButton> = () => (
	<SupportTheGuardianButton supportReferer="storybook" />
);

export const WithSmallSize: StoryFn<typeof SupportTheGuardianButton> = () => (
	<SupportTheGuardianButton supportReferer="storybook" size="small" />
);

export const WithBrandTheme: StoryFn<typeof SupportTheGuardianButton> = () => (
	<SupportTheGuardianButton supportReferer="storybook" theme="brand" />
);

export const WithBrandAltTheme: StoryFn<
	typeof SupportTheGuardianButton
> = () => (
	<SupportTheGuardianButton supportReferer="storybook" theme="brandAlt" />
);

export const WithAlternateButtonText: StoryFn<
	typeof SupportTheGuardianButton
> = () => (
	<SupportTheGuardianButton
		supportReferer="storybook"
		alternateButtonText="Make a recurring contribution"
		theme="brandAlt"
	/>
);

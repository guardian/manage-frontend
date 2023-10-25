import type { Meta, StoryFn } from '@storybook/react';
import { CallCentrePrompt } from './CallCentrePrompt';

export default {
	component: CallCentrePrompt,
	title: 'Components/CallCentrePrompt',
} as Meta<typeof CallCentrePrompt>;

export const Default: StoryFn<typeof CallCentrePrompt> = () => {
	return <CallCentrePrompt />;
};

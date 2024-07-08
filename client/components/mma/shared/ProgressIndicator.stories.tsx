import type { Meta, StoryFn } from '@storybook/react';
import { ProgressIndicator } from './ProgressIndicator';
import { ProgressStepper } from './ProgressStepper';

export default {
	title: 'Components/ProgressIndicator',
	component: ProgressStepper,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof ProgressStepper>;

export const OldVersion: StoryFn<typeof ProgressIndicator> = () => {
	return (
		<ProgressIndicator
			steps={[
				{ title: 'Reason' },
				{ title: 'Review', isCurrentStep: true },
				{ title: 'Confirmation' },
			]}
		/>
	);
};

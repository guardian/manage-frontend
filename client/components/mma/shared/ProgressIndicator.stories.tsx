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

export const Default: StoryFn<typeof ProgressStepper> = () => {
	return (
		<>
			<ProgressStepper
				steps={[{ title: 'Reason' }, { title: 'Review' }]}
			/>
			<ProgressStepper
				steps={[
					{ title: 'Reason' },
					{ title: 'Review', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
			/>
			<ProgressStepper
				steps={[
					{ title: 'Reason', isCurrentStep: true },
					{ title: 'Review' },
					{ title: 'Confirmation' },
				]}
			/>
			<ProgressStepper
				steps={[
					{ title: 'Reason' },
					{ title: 'Review' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
			/>
		</>
	);
};

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

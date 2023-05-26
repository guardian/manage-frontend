import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProgressIndicator } from './ProgressIndicator';
import { ProgressStepper } from './ProgressStepper';

export default {
	title: 'Components/ProgressIndicator',
	component: ProgressStepper,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ProgressStepper>;

export const Default: ComponentStory<typeof ProgressStepper> = () => {
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

export const OldVersion: ComponentStory<typeof ProgressIndicator> = () => {
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

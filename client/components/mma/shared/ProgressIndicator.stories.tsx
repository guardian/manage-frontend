import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProgressIndicator } from './ProgressIndicator';
import { ProgressIndicatorV2 } from './ProgressIndicatorV2';

export default {
	title: 'Components/ProgressIndicator',
	component: ProgressIndicatorV2,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ProgressIndicatorV2>;

export const Default: ComponentStory<typeof ProgressIndicatorV2> = () => {
	return (
		<>
			<ProgressIndicatorV2
				steps={[{ title: 'Reason' }, { title: 'Review' }]}
			/>
			<ProgressIndicatorV2
				steps={[
					{ title: 'Reason' },
					{ title: 'Review', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
			/>
			<ProgressIndicatorV2
				steps={[
					{ title: 'Reason', isCurrentStep: true },
					{ title: 'Review' },
					{ title: 'Confirmation' },
				]}
			/>
			<ProgressIndicatorV2
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

import type { Meta, StoryObj } from '@storybook/react';
import { ProgressStepper } from './ProgressStepper';

export default {
	title: 'Components/ProgressStepper',
	component: ProgressStepper,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof ProgressStepper>;

export const WithTitleWithCurrentStep: StoryObj<typeof ProgressStepper> = {
	render: () => {
		return (
			<ProgressStepper
				steps={[
					{ title: 'Reason' },
					{ title: 'Review', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
			/>
		);
	},
};

export const WithoutTitleWithCurrentStep: StoryObj<typeof ProgressStepper> = {
	render: () => {
		return <ProgressStepper steps={[{}, { isCurrentStep: true }, {}]} />;
	},
};

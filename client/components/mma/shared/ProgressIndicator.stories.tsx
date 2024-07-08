import type { Meta, StoryObj } from '@storybook/react';
import { ProgressIndicator } from './ProgressIndicator';

export default {
	title: 'Components/ProgressIndicator',
	component: ProgressIndicator,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof ProgressIndicator>;

export const OldVersion: StoryObj<typeof ProgressIndicator> = {
	render: () => {
		return (
			<ProgressIndicator
				steps={[
					{ title: 'Reason' },
					{ title: 'Review', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
			/>
		);
	},
};

import type { Meta } from '@storybook/react';
import { HelpCentrePhoneNumbers } from './HelpCentrePhoneNumbers';

export default {
	title: 'Components/Help Centre/Help Centre Phone Numbers',
	component: HelpCentrePhoneNumbers,
	args: {
		compactLayout: false,
	},
	parameters: {
		chromatic: {
			viewports: [320, 1300],
		},
	},
} as Meta<typeof HelpCentrePhoneNumbers>;

export const Default = {};

export const CompactLayout = {
	args: {
		compactLayout: true,
	},
};

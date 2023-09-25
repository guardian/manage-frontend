import type { Meta, StoryFn } from '@storybook/react';
import type { CheckboxProps } from './Checkbox';
import { Checkbox } from './Checkbox';

export default {
	title: 'Components/Checkbox',
	component: Checkbox,
	args: {
		checked: false,
		required: undefined,
		label: '',
		checkboxFill: undefined,
		maxWidth: '',
	},
	argTypes: {
		required: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		checkboxFill: {
			control: { type: 'color' },
		},
	},
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args: CheckboxProps) => (
	<Checkbox {...args} />
);

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
	checked: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
	label: 'Guardian Weekly newsletter',
};

export const WithMaxWidth = Template.bind({});
WithMaxWidth.args = {
	label: 'Guardian Weekly newsletter',
	maxWidth: '8ch',
};

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateInput, DateInputProps } from './dateInput';

export default {
	title: 'Components/Date Input',
	component: DateInput,
	args: {
		date: new Date('2022-01-25'),
		labelText: 'From',
		disabled: false,
	},
	argTypes: {
		date: {
			control: {
				type: 'date',
			},
		},
	},
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = (args: DateInputProps) => {
	args.date = new Date(args.date);
	return <DateInput {...args} />;
};

export const Default = Template.bind({});

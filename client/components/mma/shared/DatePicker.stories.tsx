import type { Meta, StoryFn } from '@storybook/react';
import type { DatePickerProps } from './DatePicker';
import { DatePicker } from './DatePicker';

export default {
	title: 'Components/DatePicker',
	component: DatePicker,
	parameters: {
		chromatic: {
			viewports: [320, 740, 1300],
		},
	},
	args: {
		firstAvailableDate: new Date('2022-01-10'),
		issueDaysOfWeek: [1, 2, 3, 4, 5],
		issueKeyword: 'Issue',
		existingDates: [],
	},
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args: DatePickerProps) => {
	return <DatePicker {...args} />;
};

export const Default = Template.bind({});

export const WithExistingDates = Template.bind({});
WithExistingDates.args = {
	existingDates: [
		{ start: new Date('2022-01-24'), end: new Date('2022-01-26') },
		{ start: new Date('2022-02-14'), end: new Date('2022-02-18') },
	],
};

export const WithAmendment = Template.bind({});
WithAmendment.args = {
	amendableDateRange: {
		start: new Date('2022-02-21'),
		end: new Date('2022-02-23'),
	},
};

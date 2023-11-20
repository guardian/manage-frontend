import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { CallCentreAccordion } from './CallCentreAccordion';

export default {
	title: 'Components/CallCentreAccordion',
	component: CallCentreAccordion,
} as Meta<typeof CallCentreAccordion>;

export const Closed: StoryObj = {};

export const Open: StoryObj = {
	args: { showEmailAddress: true },
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getAllByText('Show')[0];
		await userEvent.click(button);
	},
};

export const OpenHideEmail: StoryObj = {
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getAllByText('Show')[0];
		await userEvent.click(button);
	},
};

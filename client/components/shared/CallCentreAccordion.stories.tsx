import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { CallCentreAccordion } from './CallCentreAccordion';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default {
	title: 'Components/CallCentreAccordion',
	component: CallCentreAccordion,
} as Meta<typeof CallCentreAccordion>;

export const Closed: StoryObj = {};

export const Open: StoryObj = {
	args: { showEmailAddress: true },
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		// There is a useEffect within AccordionRow that sets 'isBrowser' that isn't being run in storybook
		await sleep(1);
		const canvas = within(canvasElement);
		const button = canvas.getAllByText('Show')[0];
		await userEvent.click(button);
	},
};

export const OpenHideEmail: StoryObj = {
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await sleep(1);
		const canvas = within(canvasElement);
		const button = canvas.getAllByText('Show')[0];
		await userEvent.click(button);
	},
};

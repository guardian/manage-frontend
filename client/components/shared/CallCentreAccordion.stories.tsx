import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
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
		// There is a useEffect within AccordionRow that sets 'isBrowser' and renders a NoJS version first
		// Due to a bug the useEffect isn't being run in Storybook/Chromatic before we try to find the button
		// We use sleep(1) to ensure the useEffect runs, if  this works without the sleep, please remove it
		await sleep(1);
		const canvas = within(canvasElement);
		const button = canvas.getAllByText('Show')[0];
		await userEvent.click(button);

		canvas.getByText('+44 (0) 330 333 6767');
	},
};

export const OpenHideEmail: StoryObj = {
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await sleep(1);
		const canvas = within(canvasElement);
		const button = canvas.getAllByText('Show')[0];
		await userEvent.click(button);

		canvas.getByText('+44 (0) 330 333 6767');
	},
};

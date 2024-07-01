import { userEvent, within } from '@storybook/test';
import { CallCentrePrompt } from './CallCentrePrompt';

export default {
	component: CallCentrePrompt,
	title: 'Components/CallCentrePrompt',
};

export const Default = {};

export const Expanded = {
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const buttonLink = canvas.getByText('call our customer support team');
		await userEvent.click(buttonLink);
	},
};

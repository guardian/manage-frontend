import type { Decorator, Meta, StoryObj } from '@storybook/react';
import type { ToastSeverity } from '../../stores/ToastStore';
import { useToastStore } from '../../stores/ToastStore';
import { ToastContainer } from './ToastContainer';

const resetToastStore = () => {
	const timeoutId = useToastStore.getState().timeoutId;
	if (timeoutId) {
		window.clearTimeout(timeoutId);
	}
	useToastStore.setState({
		current: null,
		isOpen: false,
		timeoutId: null,
	});
};

const showStaticToast = (message: string, severity: ToastSeverity) => {
	resetToastStore();
	useToastStore.setState({
		isOpen: true,
		current: { message, severity },
		timeoutId: null,
	});
};

const ResetToastStoreDecorator: Decorator = (Story) => {
	resetToastStore();
	return <Story />;
};

export default {
	title: 'Components/ToastContainer',
	component: ToastContainer,
	decorators: [ResetToastStoreDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof ToastContainer>;

export const Success: StoryObj<typeof ToastContainer> = {
	render: () => {
		showStaticToast(
			'Invitation successfully sent to pending@example.com',
			'success',
		);
		return <ToastContainer />;
	},
};

export const Error: StoryObj<typeof ToastContainer> = {
	render: () => {
		showStaticToast('Something went wrong. Please try again.', 'error');
		return <ToastContainer />;
	},
};

export const Info: StoryObj<typeof ToastContainer> = {
	render: () => {
		showStaticToast('Your changes have been saved.', 'info');
		return <ToastContainer />;
	},
};

import type { ReactNode } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ToastSeverity = 'success' | 'error' | 'info';

export interface Toast {
	message: ReactNode | string;
	severity: ToastSeverity;
}

interface ToastState {
	current: Toast | null;
	isOpen: boolean;
	timeoutId: number | null;
}

interface ToastActions {
	showToast: (args: {
		message: ReactNode | string;
		severity?: ToastSeverity;
	}) => void;
	dismissToast: () => void;
}

type ToastStore = ToastState & ToastActions;

const initialState: ToastState = {
	current: null,
	isOpen: false,
	timeoutId: null,
};

const AUTO_DISMISS_MS = 5000;

export const useToastStore = create<ToastStore>()(
	devtools(
		(set, get) => ({
			...initialState,
			showToast: ({ message, severity = 'success' }) => {
				const prevTimeoutId = get().timeoutId;
				if (prevTimeoutId) {
					window.clearTimeout(prevTimeoutId);
				}

				const timeoutId = window.setTimeout(() => {
					get().dismissToast();
				}, AUTO_DISMISS_MS);

				set(
					{
						current: { message, severity },
						isOpen: true,
						timeoutId,
					},
					false,
					'showToast',
				);
			},
			dismissToast: () => {
				const prevTimeoutId = get().timeoutId;
				if (prevTimeoutId) {
					window.clearTimeout(prevTimeoutId);
				}
				set(
					{
						...initialState,
					},
					false,
					'dismissToast',
				);
			},
		}),
		{ name: 'ToastStore' },
	),
);

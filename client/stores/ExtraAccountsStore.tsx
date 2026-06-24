import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ExtraAccountStatus = 'empty' | 'pending' | 'active';

interface ExtraAccountEmpty {
	status: 'empty';
}

interface ExtraAccountPending {
	status: 'pending';
	email: string;
	invitationCode: string;
}

interface ExtraAccountActive {
	status: 'active';
	email: string;
	name: string;
	invitationCode: string;
}

export type ExtraAccount =
	| ExtraAccountEmpty
	| ExtraAccountPending
	| ExtraAccountActive;

export enum ExtraAccountsLoadingState {
	NotStarted = 'NotStarted',
	Loading = 'Loading',
	Loaded = 'Loaded',
	Error = 'Error',
}

interface ExtraAccountsState {
	accounts: ExtraAccount[] | null;
	loadingState: ExtraAccountsLoadingState;
	error: string | null;
}

interface ExtraAccountsActions {
	setAccounts: (accounts: ExtraAccount[]) => void;
	setLoadingState: (state: ExtraAccountsLoadingState) => void;
	setError: (error: string | null) => void;
	clearStore: () => void;
}

type ExtraAccountsStore = ExtraAccountsState & ExtraAccountsActions;

const initialState: ExtraAccountsState = {
	accounts: null,
	loadingState: ExtraAccountsLoadingState.NotStarted,
	error: null,
};

export const useExtraAccountsStore = create<ExtraAccountsStore>()(
	devtools(
		(set) => ({
			...initialState,
			setAccounts: (accounts) =>
				set(
					{
						accounts,
						loadingState: ExtraAccountsLoadingState.Loaded,
						error: null,
					},
					false,
					'setAccounts',
				),
			setLoadingState: (state) =>
				set({ loadingState: state }, false, 'setLoadingState'),
			setError: (error) =>
				set(
					{
						error,
						loadingState: ExtraAccountsLoadingState.Error,
					},
					false,
					'setError',
				),
			clearStore: () => set(initialState, false, 'clearStore'),
		}),
		{ name: 'ExtraAccountsStore' },
	),
);

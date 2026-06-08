import * as Sentry from '@sentry/browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ExtraAccount } from '../../stores/ExtraAccountsStore';
import {
	ExtraAccountsLoadingState,
	useExtraAccountsStore,
} from '../../stores/ExtraAccountsStore';
import { trackEvent } from '../analytics';
import { hasDigitalPlus } from '../extraAccounts';
import { useAccountDataLoader } from './useAccountDataLoader';

const HARDCODED_ACCOUNTS: ExtraAccount[] = [
	{ status: 'empty' },
	{ status: 'pending', email: 'sam.taylor@gmail.com' },
	{ status: 'active', email: 'sam.taylor@gmail.com' },
];

// TODO: replace with a real endpoint call once the API exists.
export const fetchExtraAccounts = (): Promise<ExtraAccount[]> =>
	Promise.resolve(HARDCODED_ACCOUNTS);

// TODO: replace with a real endpoint call once the API exists.
export const sendInvitationRequest = (_email: string): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(resolve, 2000);
	});

// TODO: replace with a real endpoint call once the API exists.
export const cancelInvitationRequest = (_email: string): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(resolve, 2000);
	});

// TODO: replace with a real endpoint call once the API exists.
export const removeAccessRequest = (_email: string): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(resolve, 2000);
	});

interface UseExtraAccountsReturn {
	accounts: ExtraAccount[] | null;
	isLoading: boolean;
	hasError: boolean;
	shouldRedirect: boolean;
	sendInvitation: (email: string) => Promise<boolean>;
	cancelInvitation: (email: string) => Promise<boolean>;
	removeAccess: (email: string) => Promise<boolean>;
	isSubmitting: boolean;
	submitError: string | null;
}

export const useExtraAccounts = (): UseExtraAccountsReturn => {
	const { accounts, loadingState, setAccounts, setLoadingState, setError } =
		useExtraAccountsStore();

	const {
		loadAccountData,
		isLoading: isAccountLoading,
		hasError: hasAccountError,
		mdapiResponse,
	} = useAccountDataLoader();

	const [shouldRedirect, setShouldRedirect] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const hasStartedLoading = useRef(false);

	const storeHasData = loadingState === ExtraAccountsLoadingState.Loaded;

	useEffect(() => {
		if (
			storeHasData ||
			shouldRedirect ||
			hasStartedLoading.current ||
			loadingState === ExtraAccountsLoadingState.Error
		) {
			return;
		}

		if (hasAccountError) {
			setError('Failed to load account data');
			return;
		}

		if (!mdapiResponse && !isAccountLoading) {
			void loadAccountData();
			return;
		}

		if (isAccountLoading || !mdapiResponse) {
			return;
		}

		hasStartedLoading.current = true;

		if (!hasDigitalPlus(mdapiResponse)) {
			setShouldRedirect(true);
			return;
		}

		const loadExtraAccounts = async () => {
			setLoadingState(ExtraAccountsLoadingState.Loading);
			try {
				const data = await fetchExtraAccounts();
				setAccounts(data);
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Unknown error';
				trackEvent({
					eventCategory: 'extraAccountsLoader',
					eventAction: 'error',
					eventLabel: message,
				});
				Sentry.captureException(error);
				setError(message);
			}
		};

		void loadExtraAccounts();
	}, [
		storeHasData,
		shouldRedirect,
		loadingState,
		isAccountLoading,
		hasAccountError,
		mdapiResponse,
		loadAccountData,
		setAccounts,
		setLoadingState,
		setError,
	]);

	const sendInvitation = useCallback(
		async (email: string): Promise<boolean> => {
			if (isSubmitting) {
				return false;
			}

			setIsSubmitting(true);
			setSubmitError(null);

			try {
				await sendInvitationRequest(email);
				const data = await fetchExtraAccounts();
				setAccounts(data);
				return true;
			} catch (error) {
				Sentry.captureException(
					error instanceof Error
						? error
						: new Error('Failed to send invitation'),
				);
				setSubmitError(
					error instanceof Error
						? error.message
						: 'Something went wrong. Please try again.',
				);
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[setAccounts, isSubmitting],
	);

	const cancelInvitation = useCallback(
		async (email: string): Promise<boolean> => {
			if (isSubmitting) {
				return false;
			}

			setIsSubmitting(true);
			setSubmitError(null);

			try {
				await cancelInvitationRequest(email);
				const data = await fetchExtraAccounts();
				setAccounts(data);
				return true;
			} catch (error) {
				Sentry.captureException(
					error instanceof Error
						? error
						: new Error('Failed to cancel invitation'),
				);
				setSubmitError(
					error instanceof Error
						? error.message
						: 'Something went wrong. Please try again.',
				);
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[setAccounts, isSubmitting],
	);

	const removeAccess = useCallback(
		async (email: string): Promise<boolean> => {
			if (isSubmitting) {
				return false;
			}

			setIsSubmitting(true);
			setSubmitError(null);

			try {
				await removeAccessRequest(email);
				const data = await fetchExtraAccounts();
				setAccounts(data);
				return true;
			} catch (error) {
				Sentry.captureException(
					error instanceof Error
						? error
						: new Error('Failed to remove access'),
				);
				setSubmitError(
					error instanceof Error
						? error.message
						: 'Something went wrong. Please try again.',
				);
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[setAccounts, isSubmitting],
	);

	return {
		accounts,
		isLoading:
			!storeHasData &&
			!shouldRedirect &&
			loadingState !== ExtraAccountsLoadingState.Error,
		hasError: loadingState === ExtraAccountsLoadingState.Error,
		shouldRedirect,
		sendInvitation,
		cancelInvitation,
		removeAccess,
		isSubmitting,
		submitError,
	};
};

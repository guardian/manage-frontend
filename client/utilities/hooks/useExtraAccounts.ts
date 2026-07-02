import * as Sentry from '@sentry/browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import type { ExtraAccount } from '../../stores/ExtraAccountsStore';
import {
	ExtraAccountsLoadingState,
	useExtraAccountsStore,
} from '../../stores/ExtraAccountsStore';
import { useToastStore } from '../../stores/ToastStore';
import { trackEvent } from '../analytics';
import { getDigitalPlusProduct } from '../extraAccounts';
import { fetchWithDefaultParameters } from '../fetch';
import { useAccountDataLoader } from './useAccountDataLoader';

const MAX_ACCOUNTS = 3;
const EXTRA_ACCOUNTS_BASE = '/api/extra-accounts';

const requestHeaders = (isTestUser: boolean) => ({
	'Content-Type': 'application/json',
	[MDA_TEST_USER_HEADER]: `${isTestUser}`,
});

interface InvitationResponseItem {
	subscriptionName: string;
	invitationCode: string;
	primaryIdentityId: string;
	secondaryUserEmail: string;
	secondaryIdentityId: string;
	invitedDate: string;
	expiryDate: number;
}

interface SecondaryUserResponseItem {
	subscriptionName: string;
	secondaryIdentityId: string;
	primaryIdentityId: string;
	acceptedDate: string;
	email: string;
	displayName: string;
	firstName?: string;
	lastName?: string;
}

interface MmaPrimaryResponse {
	invitations: InvitationResponseItem[];
	secondaryUsers: SecondaryUserResponseItem[];
}

const fetchMmaPrimary = async (
	subscriptionName: string,
	isTestUser: boolean,
): Promise<MmaPrimaryResponse> => {
	const response = await fetchWithDefaultParameters(
		`${EXTRA_ACCOUNTS_BASE}/${subscriptionName}/mma-primary`,
		{ headers: requestHeaders(isTestUser) },
	);
	if (!response.ok) {
		throw new Error(`Failed to load extra accounts (${response.status})`);
	}
	const body = (await response.json()) as Partial<MmaPrimaryResponse>;
	return {
		invitations: body.invitations ?? [],
		secondaryUsers: body.secondaryUsers ?? [],
	};
};

export const fetchExtraAccounts = async (
	subscriptionName: string,
	isTestUser: boolean,
): Promise<ExtraAccount[]> => {
	const { secondaryUsers, invitations } = await fetchMmaPrimary(
		subscriptionName,
		isTestUser,
	);

	const activeAccounts: ExtraAccount[] = secondaryUsers.map(
		(user): ExtraAccount => ({
			status: 'active',
			name: user.displayName,
			email: user.email,
			// The mma-primary endpoint does not return an invitationCode for
			// active secondary users, so remove-access cannot currently target
			// them until the backend exposes a way to do so.
			invitationCode: '',
		}),
	);

	const pendingAccounts: ExtraAccount[] = invitations.map(
		(invitation): ExtraAccount => ({
			status: 'pending',
			email: invitation.secondaryUserEmail,
			invitationCode: invitation.invitationCode,
		}),
	);

	const usedAccounts = [...activeAccounts, ...pendingAccounts];
	const emptySlots: ExtraAccount[] = Array.from(
		{ length: Math.max(0, MAX_ACCOUNTS - usedAccounts.length) },
		() => ({ status: 'empty' as const }),
	);

	return [...usedAccounts, ...emptySlots];
};

export const sendInvitationRequest = async (
	subscriptionName: string,
	email: string,
	isTestUser: boolean,
): Promise<void> => {
	const response = await fetchWithDefaultParameters(
		`${EXTRA_ACCOUNTS_BASE}/invitation`,
		{
			method: 'POST',
			headers: requestHeaders(isTestUser),
			body: JSON.stringify({
				subscriptionName,
				secondaryUserEmail: email,
			}),
		},
	);
	if (!response.ok) {
		const message = await response.text().catch(() => '');
		throw new Error(
			message || `Failed to send invitation (${response.status})`,
		);
	}
};

export const deleteInvitationRequest = async (
	invitationCode: string,
	isTestUser: boolean,
): Promise<void> => {
	const response = await fetchWithDefaultParameters(
		`${EXTRA_ACCOUNTS_BASE}/invitation/${invitationCode}`,
		{
			method: 'DELETE',
			headers: requestHeaders(isTestUser),
		},
	);
	if (!response.ok) {
		const message = await response.text().catch(() => '');
		throw new Error(
			message || `Failed to delete invitation (${response.status})`,
		);
	}
};

interface UseExtraAccountsReturn {
	accounts: ExtraAccount[] | null;
	isLoading: boolean;
	hasError: boolean;
	shouldRedirect: boolean;
	sendInvitation: (email: string) => Promise<boolean>;
	cancelInvitation: (invitationCode: string) => Promise<boolean>;
	removeAccess: (invitationCode: string) => Promise<boolean>;
	isSubmitting: boolean;
}

export const useExtraAccounts = (): UseExtraAccountsReturn => {
	const { accounts, loadingState, setAccounts, setLoadingState, setError } =
		useExtraAccountsStore();
	const { showToast } = useToastStore();

	const {
		loadAccountData,
		isLoading: isAccountLoading,
		hasError: hasAccountError,
		mdapiResponse,
	} = useAccountDataLoader();

	const [shouldRedirect, setShouldRedirect] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const hasStartedLoading = useRef(false);

	const digitalPlusProduct = getDigitalPlusProduct(mdapiResponse);
	const subscriptionName =
		digitalPlusProduct?.subscription.subscriptionId ?? null;
	const isTestUser = digitalPlusProduct?.isTestUser ?? false;

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

		if (!subscriptionName) {
			setShouldRedirect(true);
			return;
		}

		const loadExtraAccounts = async () => {
			setLoadingState(ExtraAccountsLoadingState.Loading);
			try {
				const data = await fetchExtraAccounts(
					subscriptionName,
					isTestUser,
				);
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
		subscriptionName,
		isTestUser,
		loadAccountData,
		setAccounts,
		setLoadingState,
		setError,
	]);

	const refreshAccounts = useCallback(async () => {
		if (!subscriptionName) {
			return;
		}
		const data = await fetchExtraAccounts(subscriptionName, isTestUser);
		setAccounts(data);
	}, [subscriptionName, isTestUser, setAccounts]);

	const handleActionError = useCallback(
		(error: unknown, fallbackMessage: string) => {
			Sentry.captureException(
				error instanceof Error ? error : new Error(fallbackMessage),
			);
			showToast({
				message:
					error instanceof Error && error.message
						? error.message
						: 'Something went wrong. Please try again.',
				severity: 'error',
			});
		},
		[showToast],
	);

	const sendInvitation = useCallback(
		async (email: string): Promise<boolean> => {
			if (isSubmitting || !subscriptionName) {
				return false;
			}

			setIsSubmitting(true);

			try {
				await sendInvitationRequest(
					subscriptionName,
					email,
					isTestUser,
				);
				await refreshAccounts();
				return true;
			} catch (error) {
				handleActionError(error, 'Failed to send invitation');
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[
			subscriptionName,
			isTestUser,
			isSubmitting,
			refreshAccounts,
			handleActionError,
		],
	);

	const cancelInvitation = useCallback(
		async (invitationCode: string): Promise<boolean> => {
			if (isSubmitting) {
				return false;
			}

			setIsSubmitting(true);

			try {
				await deleteInvitationRequest(invitationCode, isTestUser);
				await refreshAccounts();
				return true;
			} catch (error) {
				handleActionError(error, 'Failed to cancel invitation');
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[isTestUser, isSubmitting, refreshAccounts, handleActionError],
	);

	const removeAccess = useCallback(
		async (invitationCode: string): Promise<boolean> => {
			if (isSubmitting) {
				return false;
			}

			setIsSubmitting(true);

			try {
				await deleteInvitationRequest(invitationCode, isTestUser);
				await refreshAccounts();
				return true;
			} catch (error) {
				handleActionError(error, 'Failed to remove access');
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[isTestUser, isSubmitting, refreshAccounts, handleActionError],
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
	};
};

import * as Sentry from '@sentry/browser';
import { useCallback, useRef } from 'react';
import type { MPAPIResponse } from '../../../shared/mpapiResponse';
import type {
	CancelledProductDetail,
	MembersDataApiResponse,
	MultipleAccountsApiResponse,
	SingleProductDetail,
} from '../../../shared/productResponse';
import { JsonResponseHandler } from '../../components/mma/shared/asyncComponents/DefaultApiResponseHandler';
import type { UserSubscriptionsResponse } from '../../stores/AccountStore';
import {
	AccountLoadingState,
	useAccountStore,
} from '../../stores/AccountStore';
import { trackEvent } from '../analytics';
import { fetchWithDefaultParameters } from '../fetch';
import {
	allRecurringProductsDetailFetcher,
	allSingleProductsDetailFetcher,
	secondaryAccountFetcher,
} from '../productUtils';

async function fetchAllAccountData() {
	const [
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributionsResponse,
		userSubscriptionsResponse,
		maapiResponse,
	] = await Promise.all([
		allRecurringProductsDetailFetcher()
			.then(
				(r) =>
					JsonResponseHandler(r) as Promise<MembersDataApiResponse>,
			)
			.catch((): null => null),
		fetchWithDefaultParameters('/api/cancelled/')
			.then(
				(r) =>
					JsonResponseHandler(r) as Promise<CancelledProductDetail[]>,
			)
			.catch((): null => null),
		fetchWithDefaultParameters('/mpapi/user/mobile-subscriptions')
			.then((r) => JsonResponseHandler(r) as Promise<MPAPIResponse>)
			.catch((): null => null),
		allSingleProductsDetailFetcher()
			.then(
				(r) => JsonResponseHandler(r) as Promise<SingleProductDetail[]>,
			)
			.catch((): null => null),
		fetchWithDefaultParameters('/api/user-subscriptions/me')
			.then(
				(r) =>
					JsonResponseHandler(
						r,
					) as Promise<UserSubscriptionsResponse>,
				)
				.catch((): null => null),
		secondaryAccountFetcher()
			.then((r) => JsonResponseHandler(r) as Promise<MultipleAccountsApiResponse>)
			.catch((): null => null),
			]);

	return {
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributionsResponse,
		userSubscriptionsResponse,
		maapiResponse,
	};
}

export const useAccountDataLoader = () => {
	const {
		loadingState,
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributionsResponse,
		userSubscriptionsResponse,
		maapiResponse,
		setAllResponses,
		setLoadingState,
		setError,
	} = useAccountStore();

	const isLoadingRef = useRef(false);

	const loadAccountData = useCallback(async () => {
		if (isLoadingRef.current) {
			return;
		}
		isLoadingRef.current = true;
		setLoadingState(AccountLoadingState.Loading);

		try {
			const responses = await fetchAllAccountData();

			if (!responses.mdapiResponse) {
				throw new Error('Failed to load account data');
			}

			setAllResponses(responses);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Unknown error';
			trackEvent({
				eventCategory: 'accountDataLoader',
				eventAction: 'error',
				eventLabel: message,
			});
			Sentry.captureException(error);
			setError(message);
		} finally {
			isLoadingRef.current = false;
		}
	}, [setAllResponses, setLoadingState, setError]);

	return {
		loadAccountData,
		isLoading: loadingState === AccountLoadingState.Loading,
		hasError: loadingState === AccountLoadingState.Error,
		mdapiResponse,
		cancelledProductsResponse,
		mpapiResponse,
		singleContributionsResponse,
		userSubscriptionsResponse,
		maapiResponse,
	};
};

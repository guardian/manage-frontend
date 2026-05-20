import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MPAPIResponse } from '../../shared/mpapiResponse';
import type {
	CancelledProductDetail,
	MembersDataApiResponse,
	MembersDataApiUser,
	SingleProductDetail,
} from '../../shared/productResponse';
import { isProduct } from '../../shared/productResponse';

export enum AccountLoadingState {
	NotStarted = 'NotStarted',
	Loading = 'Loading',
	Loaded = 'Loaded',
	Error = 'Error',
}

// TODO: Replace with real shape once the lambda for Digital plus upgrade eligibility lands
export interface AccountOverviewLambdaLoaderResponse {
	eligible: boolean;
}

interface AccountState {
	mdapiResponse: MembersDataApiResponse | null;
	cancelledProductsResponse: CancelledProductDetail[] | null;
	mpapiResponse: MPAPIResponse | null;
	singleContributionsResponse: SingleProductDetail[] | null;
	accountOverviewLambdaLoaderResponse: AccountOverviewLambdaLoaderResponse | null;
	loadingState: AccountLoadingState;
	error: string | null;
}

interface AccountActions {
	setMdapiResponse: (response: MembersDataApiResponse) => void;
	setCancelledProductsResponse: (response: CancelledProductDetail[]) => void;
	setMpapiResponse: (response: MPAPIResponse) => void;
	setSingleContributionsResponse: (response: SingleProductDetail[]) => void;
	setDigitalPlusUpgradeResponse: (
		response: AccountOverviewLambdaLoaderResponse,
	) => void;
	setAllResponses: (responses: {
		mdapiResponse: MembersDataApiResponse | null;
		cancelledProductsResponse: CancelledProductDetail[] | null;
		mpapiResponse: MPAPIResponse | null;
		singleContributionsResponse: SingleProductDetail[] | null;
		accountOverviewLambdaLoaderResponse: AccountOverviewLambdaLoaderResponse | null;
	}) => void;
	setLoadingState: (state: AccountLoadingState) => void;
	setError: (error: string | null) => void;
	clearAccount: () => void;
}

interface AccountSelectors {
	getUser: () => MembersDataApiUser | undefined;
	getIsTestUser: () => boolean;
}

type AccountStore = AccountState & AccountActions & AccountSelectors;

const initialState: AccountState = {
	mdapiResponse: null,
	cancelledProductsResponse: null,
	mpapiResponse: null,
	singleContributionsResponse: null,
	accountOverviewLambdaLoaderResponse: null,
	loadingState: AccountLoadingState.NotStarted,
	error: null,
};

export const useAccountStore = create<AccountStore>()(
	devtools(
		(set, get) => ({
			...initialState,
			setMdapiResponse: (response) =>
				set({ mdapiResponse: response }, false, 'setMdapiResponse'),
			setCancelledProductsResponse: (response) =>
				set(
					{ cancelledProductsResponse: response },
					false,
					'setCancelledProductsResponse',
				),
			setMpapiResponse: (response) =>
				set({ mpapiResponse: response }, false, 'setMpapiResponse'),
			setSingleContributionsResponse: (response) =>
				set(
					{ singleContributionsResponse: response },
					false,
					'setSingleContributionsResponse',
				),
			setDigitalPlusUpgradeResponse: (response) =>
				set(
					{ accountOverviewLambdaLoaderResponse: response },
					false,
					'setDigitalPlusUpgradeResponse',
				),
			setAllResponses: (responses) =>
				set(
					{
						mdapiResponse: responses.mdapiResponse,
						cancelledProductsResponse:
							responses.cancelledProductsResponse,
						mpapiResponse: responses.mpapiResponse,
						singleContributionsResponse:
							responses.singleContributionsResponse,
						accountOverviewLambdaLoaderResponse:
							responses.accountOverviewLambdaLoaderResponse,
						loadingState: AccountLoadingState.Loaded,
						error: null,
					},
					false,
					'setAllResponses',
				),
			setLoadingState: (state) =>
				set({ loadingState: state }, false, 'setLoadingState'),
			setError: (error) =>
				set(
					{
						error,
						loadingState: AccountLoadingState.Error,
					},
					false,
					'setError',
				),
			clearAccount: () => set(initialState, false, 'clearAccount'),

			// Selectors
			getUser: () => get().mdapiResponse?.user,
			getIsTestUser: () => {
				const mdapiResponse = get().mdapiResponse;
				if (!mdapiResponse) {
					return false;
				}
				const firstProduct = mdapiResponse.products.find(isProduct);
				return firstProduct?.isTestUser ?? false;
			},
		}),
		{ name: 'AccountStore' },
	),
);

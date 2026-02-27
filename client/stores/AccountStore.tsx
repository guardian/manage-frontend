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

interface AccountState {
	mdapiResponse: MembersDataApiResponse | null;
	cancelledProductsResponse: CancelledProductDetail[] | null;
	mpapiResponse: MPAPIResponse | null;
	singleContributionsResponse: SingleProductDetail[] | null;
	loadingState: AccountLoadingState;
	error: string | null;
}

interface AccountActions {
	setMdapiResponse: (response: MembersDataApiResponse) => void;
	setCancelledProductsResponse: (response: CancelledProductDetail[]) => void;
	setMpapiResponse: (response: MPAPIResponse) => void;
	setSingleContributionsResponse: (response: SingleProductDetail[]) => void;
	setAllResponses: (responses: {
		mdapiResponse?: MembersDataApiResponse;
		cancelledProductsResponse?: CancelledProductDetail[];
		mpapiResponse?: MPAPIResponse;
		singleContributionsResponse?: SingleProductDetail[];
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
			setAllResponses: (responses) =>
				set(
					{
						mdapiResponse: responses.mdapiResponse ?? null,
						cancelledProductsResponse:
							responses.cancelledProductsResponse ?? null,
						mpapiResponse: responses.mpapiResponse ?? null,
						singleContributionsResponse:
							responses.singleContributionsResponse ?? null,
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

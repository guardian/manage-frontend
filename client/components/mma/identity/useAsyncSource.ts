import { useReducer } from 'react';

enum ActionType {
	ERROR = 'ERROR',
	FETCH = 'FETCH',
	SUCCESS = 'SUCCESS',
}

interface Action {
	type: ActionType;
	payload?: any;
}

enum FetchStatus {
	ERROR = 'ERROR',
	FETCHING = 'FETCHING',
	INITIAL = 'INITIAL',
	SUCCESS = 'SUCCESS',
}

interface ApiFetchState {
	data: any;
	error: string | null;
	status: FetchStatus;
}

const ActionFetch = (): Action => ({ type: ActionType.FETCH });
const ActionSuccess = (payload: any): Action => ({
	type: ActionType.SUCCESS,
	payload,
});
const ActionError = (error: string): Action => ({
	type: ActionType.ERROR,
	payload: error,
});

const initialState: ApiFetchState = {
	data: null,
	error: null,
	status: FetchStatus.INITIAL,
};

const reducer = (state: ApiFetchState, action: Action): ApiFetchState => {
	const { FETCH, ERROR, SUCCESS } = ActionType;
	const { payload } = action;
	switch (action.type) {
		case FETCH:
			return {
				data: null,
				error: null,
				status: FetchStatus.FETCHING,
			};
		case ERROR:
			return {
				data: null,
				error: action.payload,
				status: FetchStatus.ERROR,
			};
		case SUCCESS:
			return {
				data: payload,
				error: null,
				status: FetchStatus.SUCCESS,
			};
		default:
			return state;
	}
};

export const useAsyncSource = (
	getter: (...args: any[]) => Promise<any>,
	errorHandler?: (e: any) => void,
): [ApiFetchState, (...args: any[]) => Promise<ApiFetchState>] => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const doFetch = async (...args: any[]) => {
		dispatch(ActionFetch());
		try {
			const response = await getter(...args);
			dispatch(ActionSuccess(response));
		} catch (e) {
			dispatch(ActionError(e as string));
			if (errorHandler) {
				errorHandler(e);
			}
		}
		return state;
	};
	return [state, doFetch];
};

export const isSuccessful = (state: ApiFetchState) =>
	state.status === FetchStatus.SUCCESS;
export const isLoading = (state: ApiFetchState) =>
	state.status === FetchStatus.FETCHING;
export const isErrored = (state: ApiFetchState) =>
	state.status === FetchStatus.ERROR;
export const getData = (state: ApiFetchState) => state.data;

/* eslint-disable @typescript-eslint/naming-convention -- disabling this rule due to uncertainty around coupling between enum values and API responses in Identity code */
import * as Sentry from '@sentry/browser';
import { useReducer } from 'react';
import { trackEvent } from '../../../utilities/analytics';
import type { ConsentOption } from './models';
import { ConsentOptionType } from './models';

enum ActionType {
	ERROR = 'ERROR',
	OPTIONS = 'OPTIONS',
	SUBSCRIBE = 'SUBSCRIBE',
	UNSUBSCRIBE = 'UNSUBSCRIBE',
	UNSUBSCRIBE_ALL = 'UNSUBSCRIBE_ALL',
}

interface Action {
	type: ActionType;
	payload?: any;
}

interface State {
	error: boolean;
	options: ConsentOption[];
}

const initialState: State = {
	error: false,
	options: [],
};

const reducer = (state: State, action: Action): State => {
	const { ERROR, OPTIONS, SUBSCRIBE, UNSUBSCRIBE, UNSUBSCRIBE_ALL } =
		ActionType;
	const { payload } = action;
	switch (action.type) {
		case ERROR:
			Sentry.captureException(payload);
			trackEvent({
				eventCategory: 'emailPrefError',
				eventAction: 'error',
				eventLabel: payload.toString(),
			});
			return {
				...state,
				error: true,
			};
		case OPTIONS:
			return {
				...state,
				options: payload,
			};
		case UNSUBSCRIBE_ALL: {
			const options = state.options.map((option: ConsentOption) => ({
				...option,
				subscribed: option.type === ConsentOptionType.OPT_OUT,
			}));
			return {
				...state,
				options,
			};
		}
		case SUBSCRIBE: {
			const options = state.options.map((option: ConsentOption) => ({
				...option,
				subscribed: option.subscribed ? true : payload === option.id,
			}));
			return {
				...state,
				options,
			};
		}
		case UNSUBSCRIBE: {
			const options = state.options.map((option: ConsentOption) => ({
				...option,
				subscribed: payload === option.id ? false : option.subscribed,
			}));
			return {
				...state,
				options,
			};
		}
	}
};

export const Actions = {
	error: (payload: Error) => ({ type: ActionType.ERROR, payload }),
	options: (payload: ConsentOption[]) => ({
		type: ActionType.OPTIONS,
		payload,
	}),
	subscribe: (payload: string) => ({
		type: ActionType.SUBSCRIBE,
		payload,
	}),
	unsubscribe: (payload: string) => ({
		type: ActionType.UNSUBSCRIBE,
		payload,
	}),
	unsubscribeAll: () => ({ type: ActionType.UNSUBSCRIBE_ALL }),
};

export const useConsentOptions = () => useReducer(reducer, initialState);

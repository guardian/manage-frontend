import { useReducer } from "react";
import { ConsentOption } from "./identity";

enum ActionType {
  ERROR = "ERROR",
  OPTIONS = "OPTIONS",
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
  UNSUBSCRIBE_ALL = "UNSUBSCRIBE_ALL"
}

interface Action {
  type: ActionType;
  payload?: any;
}

interface State {
  error: string;
  options: ConsentOption[];
}

const initialState = {
  error: null,
  options: []
};

const reducer = (state: State, action: Action) => {
  const {
    ERROR,
    OPTIONS,
    SUBSCRIBE,
    UNSUBSCRIBE,
    UNSUBSCRIBE_ALL
  } = ActionType;
  const { payload } = action;
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: payload
      };
    case OPTIONS:
      return {
        ...state,
        options: [...state.options, ...payload]
      };
    case UNSUBSCRIBE_ALL: {
      const options = state.options.map((option: any) => ({
        ...option,
        subscribed: !!option.isOptOut
      }));
      return {
        ...state,
        options
      };
    }
    case SUBSCRIBE: {
      const options = state.options.map((option: any) => ({
        ...option,
        subscribed: option.subscribed ? true : payload === option.id
      }));
      return {
        ...state,
        options
      };
    }
    case UNSUBSCRIBE: {
      const options = state.options.map((option: any) => ({
        ...option,
        subscribed: payload === option.id ? false : option.subscribed
      }));
      return {
        ...state,
        options
      };
    }
  }
};

export const Actions = {
  error: (payload: string) => ({ type: ActionType.ERROR, payload }),
  options: (payload: ConsentOption[]) => ({
    type: ActionType.OPTIONS,
    payload
  }),
  subscribe: (payload: string) => ({
    type: ActionType.SUBSCRIBE,
    payload
  }),
  unsubscribe: (payload: string) => ({
    type: ActionType.UNSUBSCRIBE,
    payload
  }),
  unsubscribeAll: () => ({ type: ActionType.UNSUBSCRIBE_ALL })
};

export const useConsentOptions = () => useReducer(reducer, initialState);

import { Reducer } from "redux";
import { RedMartOrderActionTypes, RedMartOrderState } from "./types";

export const initialRedMartOrderState: RedMartOrderState = {
  fetching: false,
  orders: [],
  error: undefined,
};

export const redmartOrderReducer: Reducer<RedMartOrderState> = (state = initialRedMartOrderState, action: any) => {
  switch (action.type) {
    case RedMartOrderActionTypes.FETCH: {
      return { ...state, fetching: true };
    }
    case RedMartOrderActionTypes.SUCCESS: {
      return { ...state, orders: action.payload, fetching: false };
    }
    case RedMartOrderActionTypes.FAILURE: {
      return { ...state, error: action.payload, fetching: false };
    }
    default: {
      return state;
    }
  }
};

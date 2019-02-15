import { Reducer } from "redux";
import { RedMartOrderActionTypes, RedMartOrderState } from "./types";

export const initialRedMartOrderState: RedMartOrderState = {
  fetching: false,
  orders: [],
  error: undefined,
  noOrders: false
};

export const redmartOrderReducer: Reducer<RedMartOrderState> = (state = initialRedMartOrderState, action: any) => {
  switch (action.type) {
    case RedMartOrderActionTypes.FETCH: {
      return { ...state, fetching: true };
    }
    case RedMartOrderActionTypes.SUCCESS: {
      const haveNoOrders = (typeof action.payload === 'object') && (action.payload instanceof Array) && action.payload.length === 0;
      return { ...state, orders: action.payload, fetching: false, noOrders: haveNoOrders };
    }
    case RedMartOrderActionTypes.FAILURE: {
      return { ...state, error: action.payload, fetching: false };
    }
    default: {
      return state;
    }
  }
};

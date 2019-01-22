import { Reducer } from "redux";
import { OrderActionTypes, OrdersDetailsState, OrdersListState } from "./types";

export const initialOrderListState: OrdersListState = {
  loading: false,
  data: undefined,
  errors: undefined,
};

export const initialOrdersDetailsState: OrdersDetailsState = {
};

export const ordersListReducer: Reducer<OrdersListState> = (state = initialOrderListState, action: any) => {
  switch (action.type) {
    case OrderActionTypes.ORDERS_LIST_REQUEST: {
      return { ...state, loading: true, data: undefined, errors: undefined };
    }
    case OrderActionTypes.ORDERS_LIST_SUCCESS: {
      return { ...state, loading: false, data: action.payload, errors: undefined };
    }
    case OrderActionTypes.ORDERS_LIST_FAILURE: {
      return { ...state, loading: false, data: undefined, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const ordersDetailsReducer: Reducer<OrdersDetailsState> = (state = initialOrdersDetailsState, action: any) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_DETAILS_REQUEST: {
      return { ...state, [action.payload]: { loading: true } };
    }
    case OrderActionTypes.ORDER_DETAILS_SUCCESS: {
      return { ...state, [action.payload.tradeOrderId]: { loading: false, data: action.payload.data } };
    }
    case OrderActionTypes.ORDER_DETAILS_FAILURE: {
      return { ...state, [action.payload.tradeOrderId]: { loading: false, errors: action.payload.message } };
    }
    default: {
      return state;
    }
  }
};

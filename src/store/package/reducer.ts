import { Reducer } from "redux";
import { RedMartPackageActionTypes, RedMartPackageState } from "./types";

export const initialRedMartPackageState: RedMartPackageState = {
  fetching: false,
  packages: [],
  error: undefined,
};

export const packageReducer: Reducer<RedMartPackageState> = (state = initialRedMartPackageState, action: any) => {
  switch (action.type) {
    case RedMartPackageActionTypes.FETCH: {
      return { ...state, fetching: true };
    }
    case RedMartPackageActionTypes.SUCCESS: {
      return { ...state, packages: action.payload, fetching: false };
    }
    case RedMartPackageActionTypes.FAILURE: {
      return { ...state, error: action.payload, fetching: false };
    }
    default: {
      return state;
    }
  }
};

import { Reducer } from "redux";
import { ArticleActionTypes, ArticlesState, CategoriesState } from "./types";


export const initialArticlesState: ArticlesState = {
};

export const initialCategoriesState: CategoriesState = {
};

export const articleReducer: Reducer<ArticlesState> = (state = initialArticlesState, action: any) => {
  switch (action.type) {
    case ArticleActionTypes.ARTILE_DETAILS_REQUEST: {
      return { ...state, [action.payload]: { loading: true } };
    }
    case ArticleActionTypes.ARTILE_DETAILS_SUCCESS: {
      return { ...state, [action.payload.id]: { loading: false, errors: undefined, ...action.payload.data } };
    }
    case ArticleActionTypes.ARTILE_DETAILS_FAILURE: {
      return { ...state, [action.payload.id]: { loading: false, errors: action.payload.message } };
    }
    default: {
      return state;
    }
  }
};

export const cateogryReducer: Reducer<CategoriesState> = (state = initialCategoriesState, action: any) => {
  switch (action.type) {
    case ArticleActionTypes.CATEGORY_REQUEST: {
      return { ...state, [action.payload]: { loading: true } };
    }
    case ArticleActionTypes.CATEGORY_SUCCESS: {
      return { ...state, [action.payload.id]: { loading: false, errors: undefined, ...action.payload.data } };
    }
    case ArticleActionTypes.CATEGORY_FAILURE: {
      return { ...state, [action.payload.id]: { loading: false, errors: action.payload.message } };
    }
    default: {
      return state;
    }
  }
};
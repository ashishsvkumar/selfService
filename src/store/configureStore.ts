import { applyMiddleware, compose, createStore } from "redux";
import monitorReducer from "../enhancers/monitorReducer";
import { initialState, rootReducer } from "./";
import thunkMiddleware from 'redux-thunk'

export default function configureStore() {
  const middlewares: any[] = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducer];
  // @ts-ignore
  const devtoolCompose: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers: any = devtoolCompose(...enhancers);

  const store = createStore(rootReducer, initialState, composedEnhancers);
  return store;
}

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./index";
const configureStore = () => {
  return createStore(
    rootReducer,
    // applyMiddleware(thunk),
    compose(
      applyMiddleware(thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
        ? (a) => a
        : window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};
export default configureStore;

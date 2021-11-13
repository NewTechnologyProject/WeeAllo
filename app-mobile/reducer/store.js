
// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { userReducer } from "./user.reducer";
// import { rootReducer } from "./index";
// import thunk from "redux-thunk";
// const configureStore = () => {
//   return createStore(rootReducer);
// };

import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./user.reducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { rootReducer } from "./index";
import thunk from "redux-thunk";
const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;

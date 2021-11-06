import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { contactReducer } from "./contact.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  contact: contactReducer
});

import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { contactReducer } from "./contact.reducer";
import { messageReducer } from "./message.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  contact: contactReducer,
  message: messageReducer
});

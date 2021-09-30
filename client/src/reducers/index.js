import { combineReducers } from "redux";
import { customerReducer } from "./customer.reducer";
import { roomChatReducer } from "./roomchat.reducer";
import { contactReducer } from "./contact.reducer";

export const rootReducer = combineReducers({
  customer: customerReducer,
  roomchat: roomChatReducer,
  contact: contactReducer,
});

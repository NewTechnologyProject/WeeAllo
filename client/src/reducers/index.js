import { combineReducers } from "redux";
import { customerReducer } from "./customer.reducer";
import { roomChatReducer } from "./roomchat.reducer";

export const rootReducer = combineReducers({
  customer: customerReducer,
  roomchat: roomChatReducer,
});

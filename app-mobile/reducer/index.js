import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { roomChatReducer } from "./roomchat.reducer";
import { contactReducer } from "./contact.reducer";

import { messageReducer } from "./message.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  contact: contactReducer,
  roomchat: roomChatReducer,
  message: messageReducer
});

import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { roomChatReducer } from "./roomchat.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  roomchat: roomChatReducer,
});
